'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
let _ = require('lodash-addons');
module.exports = Generator.extend({
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: true
    });
    this.props = opts;
    // And you can then access it later; e.g.
    this.log(this.options.appname);
  },
  prompting() {
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Welcome to the impressive ' + chalk.red('generator-vanilla-js') + ' generator!'
    // ));
    // var prompts = [];
    // return this.prompt(prompts)
    //   .then(function (props) {
    //     // To access props later use this.props.someAnswer;
    //     this.props = props;
    //   }.bind(this));
  },
  writing() {
    console.log(this.props.theme);
    // this.fs.copyTpl(this.templatePath(this.theme + 'public/index.html'), this.destinationPath('public/index.html'), {
    //   _: _,
    //   name: this.name,
    //   baseurl: this.url
    // });
    // this.fs.copy(this.templatePath(this.theme + 'public/assets'), this.destinationPath('public/assets'));
  },
  install() {
    // this.installDependencies();
  }
});
