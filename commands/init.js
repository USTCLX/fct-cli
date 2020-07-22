const { execSync } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { resolve, join } = require('path');
const config = require('../config');
const DEFAULT = 'default';

module.exports = async function () {
    const choices = Object.keys(config.templates);
    choices.unshift(DEFAULT);

    const { templateName, projectName } = await inquirer.prompt([
        {
            name: 'templateName',
            type: 'list',
            message: 'Which template will you use to create a project?',
            choices,
        },
        { name: 'projectName', type: 'input', message: 'Input project name' },
    ]);

    const url =
        templateName === DEFAULT ? config[templateName].url : config['templates'][templateName].url;

    console.log(chalk.green(`Start generating from ${templateName}...`));

    try {
        // clone
        execSync(`git clone ${url} ${projectName}`, { stdio: 'inherit' });

        // rm package-lock.json & .git/
        execSync(`npx rimraf ${join(projectName, 'package-lock.json')}`);
        execSync(`npx rimraf ${join(projectName, '.git')}`);

        // unlinkSync(resolve(process.cwd(), projectName, 'package-lock.json'));
        // rmdirSync(resolve(process.cwd(), projectName, '.git'), { recursive: true });

        // npm i
        execSync(`cd ${projectName} && npm i`, { stdio: 'inherit' });
    } catch (err) {
        console.log(chalk.red(err));
        process.exit();
    }

    console.log(chalk.green(`√ Generation completed!`));
};
