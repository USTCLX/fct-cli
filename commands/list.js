const chalk = require('chalk');
const config = require('../config');

module.exports = function () {
    console.log(chalk.green('The last tempalte list is:'));
    Object.keys(config.templates).forEach((name, index) => {
        const info = `${index + 1}:${name} - ${config.templates[name].url}`;
        console.log(chalk.grey(info));
    });
};
