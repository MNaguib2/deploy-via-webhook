const express = require('express');
const { exec, spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.json());
  
app.post('/webhook', (req, res) => {
  // console.log("Received webhook:", req.body); // Log the entire body
  // Check for the specific event type
  if (req.body.ref === 'refs/heads/main') {
    console.log('Changes detected, pulling from Git and rebuilding the app...');

    // Pull latest changes from the repository
   exec('git pull origin main', { cwd: process.cwd()+'/app/health-line' }, (error, stdout, stderr) => {  // Added shell option
      if (error) {
        console.error(`Error executing git pull: ${error.message}`);
        return res.status(500).send('Error pulling from Git');
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      const command = 'sudo docker compose up'; // Change this to your command
      const child = spawn(command, ['--build', '-d'], {
        cwd: './app/health-line/.deploy/.docker/prod', // Set the current working directory
        shell: true,
        stdio: ['pipe', 'inherit', 'inherit'] // Use 'pipe' for stdin
    });
    child.stdin.end(); // End the stdin stream
    child.on('close', (code) => {
      console.log(`Process exited with code ${code}`);
  });
      // Rebuild the Docker containers
      // exec('sudo docker compose up --build -d', { cwd: './app/health-line/.deploy/.docker/prod' }, (error, stdout, stderr) => {  // Also added shell option here
      //   if (error) {
      //     console.error(`Error executing docker compose: ${error.message}`);
      //     return res.status(500).send('Error rebuilding the app');
      //   }
      //   console.log(`Docker stdout: ${stdout}`);
      //   console.error(`Docker stderr: ${stderr}`);
      //   res.status(200).send('Build triggered successfully');
      // });
    });
  } else {
    res.status(200).send('No action taken');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
