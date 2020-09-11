const fs = require('fs');
const { exec } = require('child_process');

const HOSTS = ['https://blog.ez-connect.net'];

function execAsync(cmd, verbose = true) {
  return new Promise((resolve, reject) => {
    const p = exec(cmd, (err, stdout, _stderr) => {
      if (err) {
        reject(err);
      }

      resolve(stdout);
    });

    if (verbose) {
      p.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
    }
  });
}

async function deploy() {
  try {
    fs.writeFileSync('.env', 'GENERATE_SOURCEMAP=false');
    await execAsync('yarn build');
    fs.unlinkSync('.env');
    fs.renameSync('./build/index.html', './build/200.html');
    for (const host of HOSTS) {
      await execAsync(`yarn surge ./build --domain ${host}`);
    }
  } catch (err) {
    console.error(err);
  }
}

deploy();
