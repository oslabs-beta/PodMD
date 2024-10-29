const { deletePod } = require('../server/controllers/kubeController');
const k8s = require('@kubernetes/client-node');

jest.mock('@kubernetes/client-node', () => {
  const CoreV1ApiMock = {
    deleteNamespacedPod: jest.fn(),
  };

  return {
    KubeConfig: jest.fn().mockImplementation(() => ({
      loadFromDefault: jest.fn(),
      makeApiClient: jest.fn().mockReturnValue(CoreV1ApiMock),
    })),
    CoreV1Api: jest.fn(() => CoreV1ApiMock),
  };
});

describe('deletePod', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('should call deleteNamespacedPod with correct arguments and log success on deletion', async () => {
    const k8sApi = new k8s.CoreV1Api();
    k8sApi.deleteNamespacedPod.mockResolvedValueOnce({});

    await deletePod('test-pod', 'default');

    expect(k8sApi.deleteNamespacedPod).toHaveBeenCalledWith(
      'test-pod',
      'default'
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('should log an error message when deletion fails', async () => {
    const error = new Error('Failed to delete pod');
    const k8sApi = new k8s.CoreV1Api();
    k8sApi.deleteNamespacedPod.mockRejectedValueOnce(error);

    await deletePod('test-pod', 'default');

    expect(k8sApi.deleteNamespacedPod).toHaveBeenCalledWith(
      'test-pod',
      'default'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error deleting pod')
    );
  });
});
