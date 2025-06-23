const { exec } = require('child_process');

function startScan() {
  const url = document.getElementById('urlInput').value;
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  const terminal = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });

  terminal.loadURL('data:text/html;charset=utf-8,<pre id="output">Running Scan...</pre>');

  exec(`python3 universal_sql_injection.py ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    terminal.loadURL(`data:text/html;charset=utf-8,<pre>${stdout}</pre>`);
    setTimeout(() => terminal.close(), 5000);

    alert('Successfully Completed, check Result.txt.');
  });
}
