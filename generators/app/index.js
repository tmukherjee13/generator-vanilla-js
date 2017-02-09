'use strict';
let Generator = require('yeoman-generator');
let chalk = require('chalk');
let yosay = require('yosay');
let beautify = require('gulp-beautify');
let _ = require('lodash-addons');
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
      message: 'Your project\'s url',
      default: 'http://localhost'
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'Sass',
        value: 'includeSass',
        checked: false
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'setup',
      message: 'Would you like proceed with the setup?',
      default: true
    }];
    return this.prompt(prompts)
      .then(function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
        let hasFeature = feat => this.props.features && this.props.features.indexOf(feat) !== -1;
        this.includeSass = hasFeature('includeSass');
        this.includeBootstrap = hasFeature('includeBootstrap');
        this.includeModernizr = hasFeature('includeModernizr');
      }.bind(this));
  },
  writing() {
    // this.registerTransformStream(beautify({
    //   indentSize: 2
    // }));
    // Copy the configuration files
    let config = function () {
      this.fs.copy(this.templatePath('config/bowerrc'), this.destinationPath('.bowerrc'));
      this.fs.copyTpl(this.templatePath('config/_package.json'), this.destinationPath('package.json'), {
        _: _,
        name: this.props.name
      });
      this.fs.copyTpl(this.templatePath('config/_bower.json'), this.destinationPath('bower.json'), {
        _: _,
        name: this.props.name,
        includeBootstrap: this.includeBootstrap
      });
      this.fs.copyTpl(this.templatePath('config/_webpack.config.js'), this.destinationPath('webpack.config.js'), {
        _: _
      });
    };
    // Copy application files
    let app = function () {
      this.fs.copyTpl(this.templatePath('public/index.html'), this.destinationPath('public/index.html'), {
        _: _,
        name: this.props.name,
        baseurl: this.props.url
      });
      this.fs.copy(this.templatePath('public/assets'), this.destinationPath('public/assets'));
    };
    console.log(this.props);
    // make calls to setup the project
    config.call(this);
    app.call(this);
  },
  install: function () {
    this.installDependencies();
  }
});
