'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
let _ = require('lodash-addons');
module.exports = Generator.extend({
  prompting() {
    // var prompts = [];
    // this.log(this.options.theme);
    // return this.prompt(prompts)
    //   .then(function (props) {
    //     // To access props later use this.props.someAnswer;
    //     this.props = props;
    //   }.bind(this));
  },
  writing() {
    // console.log(this.options.theme);
    this.fs.copyTpl(this.templatePath(this.options.theme + '/index.html'), this.destinationPath('public/index.html'), {
      _: _,
      name: this.options.name,
      baseurl: this.options.url
    });
    this.fs.copy(this.templatePath(this.options.theme + '/assets'), this.destinationPath('public/assets'));
  },
  install() {
    this.bowerInstall(['scrollreveal','magnific-popup','font-awesome'], { 'save': true });
    this.installDependencies();
  }
});
