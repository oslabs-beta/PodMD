const {
  config,
  configController,
} = require('../server/controllers/configController');
const { queryPrometheus } = require('../server/services/prometheusService');


jest.mock('../server/services/prometheusService', () => ({
  queryPrometheus: jest.fn(),
}));

describe('configController.saveConfig', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        memory: 75,
        memTimeFrame: 20,
        cpu: 85,
        cpuTimeFrame: 15,
      },
    };
    res = { locals: {} };
    next = jest.fn();
    queryPrometheus.mockClear();
  });

  test('should update config and call queryPrometheus with new queries', async () => {
    await configController.saveConfig(req, res, next);

    expect(config.cpu.threshold).toBe(85);
    expect(config.cpu.minutes).toBe(15);
    expect(config.memory.threshold).toBe(75);
    expect(config.memory.minutes).toBe(20);

    expect(queryPrometheus).toHaveBeenCalledWith(
      expect.stringContaining('[15m]')
    );
    expect(queryPrometheus).toHaveBeenCalledWith(
      expect.stringContaining('[20m]')
    );

    expect(res.locals.savedConfig).toEqual({
      cpu: { threshold: 85, minutes: 15 },
      memory: { threshold: 75, minutes: 20 },
    });

    expect(next).toHaveBeenCalled();
  });

  test('should call next with an error if an exception is thrown', async () => {
    const error = new Error('Test error');
    queryPrometheus.mockImplementationOnce(() => {
      throw error;
    });

    await configController.saveConfig(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
