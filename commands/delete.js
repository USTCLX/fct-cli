const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const config = require('../config');

module.exports = async function () {
    const choices = Object.keys(config.templates);
    if (choices.length === 0) {
        console.log(chalk.green('Templates list is empty.'));
        process.exit();
    }
    const { name } = await inquirer.prompt([
        {
            name: 'name',
            type: 'list',
            message: 'Which template will you delete?',
            choices,
        },
    ]);
    delete config.templates[name];

    fs.writeFile(
        resolve(__dirname, '../config', 'index.json'),
        JSON.stringify(config, null, 2),
        'utf-8',
        err => {
            if (err) {
                console.log(chalk.red(err));
                process.exit();
            } else {
                console.log(chalk.green(`Delete ${name} success!`));
            }
        }
    );
};
