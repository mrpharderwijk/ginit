#!/usr/bin/env node
'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');

var github = require('./lib/github');
var repo = require('./lib/repo');
var files = require('./lib/files');

clear();
console.log(chalk.yellow(figlet.textSync('Ginit', { horizontalLayout: 'full' })));

if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}

var getGithubToken = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var token, accessToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Fetch token from config store
            token = github.getStoredGithubToken();

            if (!token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', token);

          case 3:
            _context.next = 5;
            return github.setGithubCredentials();

          case 5:
            _context.next = 7;
            return github.hasAccessToken();

          case 7:
            accessToken = _context.sent;

            if (!accessToken) {
              _context.next = 14;
              break;
            }

            console.log(chalk.yellow('An existing access token has been found!'));
            // ask user to regenerate a new token
            _context.next = 12;
            return github.regenerateNewToken(accessToken.id);

          case 12:
            token = _context.sent;
            return _context.abrupt('return', token);

          case 14:
            _context.next = 16;
            return github.registerNewToken();

          case 16:
            token = _context.sent;
            return _context.abrupt('return', token);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getGithubToken() {
    return _ref.apply(this, arguments);
  };
}();

var run = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var token, url, done, error;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getGithubToken();

          case 3:
            token = _context2.sent;

            github.githubAuth(token);

            // Create remote repository
            _context2.next = 7;
            return repo.createRemoteRepo();

          case 7:
            url = _context2.sent;
            _context2.next = 10;
            return repo.createGitignore();

          case 10:
            _context2.next = 12;
            return repo.setupRepo(url);

          case 12:
            done = _context2.sent;

            if (done) {
              console.log(chalk.green('All done!'));
            }
            _context2.next = 28;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](0);

            if (!_context2.t0) {
              _context2.next = 28;
              break;
            }

            _context2.t1 = _context2.t0.code;
            _context2.next = _context2.t1 === 401 ? 22 : _context2.t1 === 422 ? 25 : 27;
            break;

          case 22:
            error = _context2.t0.message;

            console.log(error);
            return _context2.abrupt('break', 28);

          case 25:
            console.log(chalk.red('There already exists a remote repository with the same name'));
            return _context2.abrupt('break', 28);

          case 27:
            console.log(_context2.t0);

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 16]]);
  }));

  return function run() {
    return _ref2.apply(this, arguments);
  };
}();

run();