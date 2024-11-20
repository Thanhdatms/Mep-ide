const { exec } = require('child_process');
const fs = require('fs');

// Execute Python code
const executePython = (code, res) => {
    exec(`python -c "${code}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(400).json({ error: stderr });
        }
        res.json({ output: stdout });
    });
};

// Execute JavaScript code
const executeJavascript = (code, res) => {
    const tempFile = 'temp.js';
    fs.writeFileSync(tempFile, code);
    exec(`node ${tempFile}`, (error, stdout, stderr) => {
        fs.unlinkSync(tempFile);
        if (error) {
            return res.status(400).json({ error: stderr });
        }
        res.json({ output: stdout });
    });
};

// Execute C++ code
const executeCpp = (code, res) => {
    const tempFile = 'temp.cpp';
    const outputFile = 'temp'; 
    fs.writeFileSync(tempFile, code);
    exec(`g++ ${tempFile} -o ${outputFile} && ./${outputFile}`, (error, stdout, stderr) => {
        fs.unlinkSync(tempFile); 
        fs.unlinkSync(outputFile); 
        if (error) {
            return res.status(400).json({ error: stderr });
        }
        res.json({ output: stdout });
    });
};

// Controller function to handle execution based on language
const executeCode = (req, res) => {
    const { language, code } = req.body;

    if (language === 'python') {
        executePython(code, res);
    } else if (language === 'javascript') {
        executeJavascript(code, res);
    } else if (language === 'cpp') {
        executeCpp(code, res);
    } else {
        res.status(400).json({ error: 'Unsupported language' });
    }
};

module.exports = {
    executeCode
};