#!/usr/bin/env node

const { program } = require('commander');
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const { add, list, deleteTemp, init } = require('../commands');
const package = require('../package.json');

// logo
clear();
console.log(chalk.yellow(figlet.textSync('fct-cli', { horizontalLayout: 'full' })));

// program
program.version(package.version, '-v, --version');

program.usage('<Commands>');

program.command('add').description('Add a new template').alias('a').action(add);

program.command('list').description('List all templates').alias('l').action(list);

program.command('delete').description('Delete one template').alias('d').action(deleteTemp);

program.command('init').description('Init a project by a template').alias('i').action(init);

program.parse(process.argv);
