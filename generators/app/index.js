/* jslint node: true */
'use strict';
let Generator = require('yeoman-generator');
let chalk = require('chalk');
let yosay = require('yosay');
module.exports = Generator.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the mind-blowing ' + chalk.red('vanilla js scaffold') + ' generator!'));
    let prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'url',
      message: "Your project's url",
      default: "http://localhost"
    },{
      type: 'confirm',
      name: 'setup',
      message: 'Would you like proceed with the setup?',
      default: true
    }];
    return this.prompt(prompts)
      .then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  },
  writing() {
    let config = function () {
      // Copy the configuration files
      this.fs.copyTpl(this.templatePath('config/_package.json'), this.destinationPath('package.json'), {
        name: this.props.name
      });
      this.fs.copyTpl(this.templatePath('config/_bower.json'), this.destinationPath('bower.json'), {
        name: this.props.name
      });
      this.fs.copy(this.templatePath('config/bowerrc'), this.destinationPath('.bowerrc'));
      this.fs.copyTpl(this.templatePath('config/_webpack.config.js'), this.destinationPath('webpack.config.js'), {});
      this.fs.copyTpl(this.templatePath('public/index.html'), this.destinationPath('public/index.html'), {
         name: this.props.name,
         baseurl: this.props.url,
      });
      this.fs.copy(this.templatePath('public/assets'), this.destinationPath('public/assets'));
    };

    let app = function () {
      // Copy application files
      this.fs.copyTpl(this.templatePath('public/index.html'), this.destinationPath('public/index.html'), {
         name: this.props.name,
         baseurl: this.props.url,
      });
      this.fs.copy(this.templatePath('public/assets'), this.destinationPath('public/assets'));
    };

    
    config.call(this);
    app.call(this);
  },
  install: function () {
    this.installDependencies();
  }
});
