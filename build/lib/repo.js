'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _ = require('lodash');
var fs = require('fs');
var git = require('simple-git')();
var CLI = require('clui');
var Spinner = CLI.Spinner;

var inquirer = require('./inquirer');
var gh = require('./github');

module.exports = {

  createRemoteRepo: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var github, answers, data, status, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              github = gh.getInstance();
              _context.next = 3;
              return inquirer.askRepoDetails();

            case 3:
              answers = _context.sent;
              data = {
                name: answers.name,
                description: answers.description,
                private: answers.visibility === 'private'
              };
              status = new Spinner('Creating remote repository...');

              status.start();

              _context.prev = 7;
              _context.next = 10;
              return github.repos.create(data);

            case 10:
              response = _context.sent;
              return _context.abrupt('return', response.data.ssh_url);

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](7);
              throw _context.t0;

            case 17:
              _context.prev = 17;

              status.stop();
              return _context.finish(17);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[7, 14, 17, 20]]);
    }));

    function createRemoteRepo() {
      return _ref.apply(this, arguments);
    }

    return createRemoteRepo;
  }(),

  createGitignore: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var filelist, answers;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');

              if (!filelist.length) {
                _context2.next = 8;
                break;
              }

              _context2.next = 4;
              return inquirer.askIgnoreFiles(filelist);

            case 4:
              answers = _context2.sent;

              if (answers.ignore.length) {
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
              } else {
                touch('.gitignore');
              }
              _context2.next = 9;
              break;

            case 8:
              touch('.gitignore');

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function createGitignore() {
      return _ref2.apply(this, arguments);
    }

    return createGitignore;
  }(),

  setupRepo: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
      var status;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              status = new Spinner('Initializing local repository and pushing to remote...');

              status.start();

              _context3.prev = 2;
              _context3.next = 5;
              return git.init().add('.gitignore').add('./*').commit('Initial commit').addRemote('origin', url).push('origin', 'master');

            case 5:
              return _context3.abrupt('return', true);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](2);
              throw _context3.t0;

            case 11:
              _context3.prev = 11;

              status.stop();
              return _context3.finish(11);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[2, 8, 11, 14]]);
    }));

    function setupRepo(_x) {
      return _ref3.apply(this, arguments);
    }

    return setupRepo;
  }()

};