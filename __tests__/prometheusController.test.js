const {
  prometheusController,
  restartedPods,
  checkRestart,
} = require('../server/controllers/prometheusController');
const { config } = require('../server/controllers/configController');
const { queryPrometheus } = require('../server/services/prometheusService');
const deletePod = require('../server/controllers/kubeController');

jest.mock('../server/services/prometheusService', () => ({
  queryPrometheus: jest.fn(),
  runDemo: false,
}));

jest.mock('../server/controllers/kubeController', () => jest.fn());

describe('Prometheus Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
    restartedPods.length = 0; // Clear restartedPods array after each test
  });

  describe('fetchGraphData', () => {
    it('should query CPU data when cpuGraphMinutes is provided', async () => {
      const req = { query: { cpuGraphMinutes: '15' } };
      const res = { locals: {} };
      const next = jest.fn();
      const mockCpuData = {
        status: 'success',
        data: { result: [{ value: [null, 70] }] },
      };

      queryPrometheus.mockResolvedValueOnce(mockCpuData);

      await prometheusController.fetchGraphData(req, res, next);

      expect(queryPrometheus).toHaveBeenCalledWith(
        expect.stringContaining('[15m]'),
        config.cpu.threshold
      );
      expect(res.locals.data).toEqual({ cpuData: mockCpuData });
      expect(next).toHaveBeenCalled();
    });

    it('should query Memory data when memoryGraphMinutes is provided', async () => {
      const req = { query: { memoryGraphMinutes: '20' } };
      const res = { locals: {} };
      const next = jest.fn();
      const mockMemData = {
        status: 'success',
        data: { result: [{ value: [null, 60] }] },
      };

      queryPrometheus.mockResolvedValueOnce(mockMemData);

      await prometheusController.fetchGraphData(req, res, next);

      expect(queryPrometheus).toHaveBeenCalledWith(
        expect.stringContaining('[20m]'),
        config.memory.threshold
      );
      expect(res.locals.data).toEqual({ memData: mockMemData });
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error if queryPrometheus fails', async () => {
      const req = { query: { cpuGraphMinutes: '15' } };
      const res = { locals: {} };
      const next = jest.fn();
      const error = new Error('Prometheus query failed');

      queryPrometheus.mockRejectedValueOnce(error);

      await prometheusController.fetchGraphData(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('checkRestart', () => {
    const mockPodData = {
      status: 'success',
      data: {
        result: [
          {
            metric: { pod: 'test-pod', namespace: 'default' },
            value: [null, '85'], // Value above threshold for triggering restart
          },
        ],
      },
    };

    it('should add pod to restartedPods and call deletePod when threshold is exceeded', async () => {
      queryPrometheus.mockResolvedValueOnce(mockPodData);
      config.cpu.threshold = 80;

      await checkRestart(config.cpu);

      expect(restartedPods.length).toBe(1);
      expect(restartedPods[0]).toMatchObject({
        podName: 'test-pod',
        namespace: 'default',
        label: config.cpu.label,
        value: '85',
        threshold: 80,
      });
      expect(deletePod).toHaveBeenCalledWith('test-pod', 'default');
    });

    it('should not add pod to restartedPods if threshold is not exceeded', async () => {
      const lowPodData = {
        ...mockPodData,
        data: {
          result: [
            {
              metric: { pod: 'low-pod', namespace: 'default' },
              value: [null, '75'], // Below threshold value
            },
          ],
        },
      };
      queryPrometheus.mockResolvedValueOnce(lowPodData);
      config.cpu.threshold = 80;

      await checkRestart(config.cpu);

      expect(restartedPods.length).toBe(0);
      expect(deletePod).not.toHaveBeenCalled();
    });
  });
});
