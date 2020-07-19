const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const { resolve } = require('path');
const config = require('../config');

module.exports = async function () {
    const { name, url } = await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'input your new template name',
        },
        {
            name: 'url',
            type: 'input',
            message: 'input github respos for template',
        },
    ]);

    if (!config.templates[name]) {
        config.templates[name] = {};
        config.templates[name]['url'] = url.replace(/[\u0000-\u0019]/g, '');
    } else {
        console.log(chalk.red('Templat has already existed!'));
        process.exit();
    }

    fs.writeFile(
        resolve(__dirname, '../config', 'index.json'),
        JSON.stringify(config, null, 2),
        'utf-8',
        err => {
            if (err) {
                console.log(chalk.red(err));
            } else {
                console.log(chalk.green('New template added!'));
                console.log(chalk.grey('The last tempalte list is:'));
                Object.keys(config.templates).forEach((name, index) => {
                    const info = `${index + 1}:${name} - ${config.templates[name].url}`;
                    console.log(chalk.grey(info));
                });
            }
        }
    );
};
