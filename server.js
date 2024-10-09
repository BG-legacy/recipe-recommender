const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function runPythonScript(data) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['ai/generateRecipe.py']);
    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject('Error generating recipe');
      } else {
        resolve(JSON.parse(output));
      }
    });
  });
}

app.post('/generate-recipe', async (req, res) => {
  try {
    const result = await runPythonScript(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
