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

};

// Execute C++ code
const executeCpp = (code, res) => {

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