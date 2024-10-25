const { spawn } = require('child_process');
const waitOn = require('wait-on');
const http = require('http');

const options = {
  resources: ['http://localhost:3333'],
  timeout: 60000,
};

function isServerReady(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`Server not ready: ${res.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

const server = spawn('node', ['./server/router.js'], {
  stdio: 'inherit',
  shell: true,
});

waitOn(options)
  .then(() => {
    return isServerReady('http://localhost:3333');
  })
  .then(() => {
    const electron = spawn('electron', ['.'], {
      stdio: 'inherit',
      shell: true,
    });

    electron.on('exit', (code) => {
      server.kill();
    });
  })
  .catch((err) => {
    console.error('Error waiting for server:', err);
    server.kill();
  });
