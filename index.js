const {createPromptModule} = require('inquirer');

const prompt = createPromptModule()

    prompt([
        {
            type: 'input',
            name: 'username',
            message: 'What is your name?',
        },
    ])
    .then(answers => {
        console.log(`Hello, ${answers.username}!`);
    })
    .catch(error => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something went wrong");
        }
    });