'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var octokit = require('@octokit/rest')();
var Configstore = require('configstore');
var pkg = require('../../package.json');
var _ = require('lodash');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var chalk = require('chalk');

var inquirer = require('./inquirer');

var conf = new Configstore(pkg.name);

module.exports = {

  getInstance: function getInstance() {
    return octokit;
  },

  setGithubCredentials: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var credentials;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return inquirer.askGithubCredentials();

            case 2:
              credentials = _context.sent;

              octokit.authenticate(_.extend({
                type: 'basic'
              }, credentials));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function setGithubCredentials() {
      return _ref.apply(this, arguments);
    }

    return setGithubCredentials;
  }(),

  registerNewToken: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var status, response, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              status = new Spinner('Authenticating you, please wait...');

              status.start();

              _context2.prev = 2;
              _context2.next = 5;
              return octokit.authorization.create({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginits, the command-line tool for initalizing Git repos',
                headers: { "X-GitHub-OTP": "<your 2FA token>" }
              });

            case 5:
              response = _context2.sent;
              token = response.data.token;

              if (!token) {
                _context2.next = 12;
                break;
              }

              conf.set('github.token', token);
              return _context2.abrupt('return', token);

            case 12:
              throw new Error("Missing Token", "Github token was not found in the response");

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2['catch'](2);
              throw _context2.t0;

            case 18:
              _context2.prev = 18;

              status.stop();
              return _context2.finish(18);

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 15, 18, 21]]);
    }));

    function registerNewToken() {
      return _ref2.apply(this, arguments);
    }

    return registerNewToken;
  }(),

  githubAuth: function githubAuth(token) {
    octokit.authenticate({
      type: 'oauth',
      token: token
    });
  },

  getStoredGithubToken: function getStoredGithubToken() {
    return conf.get('github.token');
  },

  hasAccessToken: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var status, response, accessToken;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              status = new Spinner('Authenticating you, please wait...');

              status.start();

              _context3.prev = 2;
              _context3.next = 5;
              return octokit.authorization.getAll();

            case 5:
              response = _context3.sent;
              accessToken = _.find(response.data, function (row) {
                if (row.note) {
                  return row.note.indexOf('ginit') !== -1;
                }
              });
              return _context3.abrupt('return', accessToken);

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3['catch'](2);
              throw _context3.t0;

            case 14:
              _context3.prev = 14;

              status.stop();
              return _context3.finish(14);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[2, 10, 14, 17]]);
    }));

    function hasAccessToken() {
      return _ref3.apply(this, arguments);
    }

    return hasAccessToken;
  }(),

  regenerateNewToken: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      var tokenUrl, input;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              tokenUrl = 'https://github.com/settings/tokens/' + id;

              console.log('Please visit ' + chalk.underline.blue.bold(tokenUrl) + ' and click the ' + chalk.red.bold('Regenerate Token Button.\n'));
              _context4.next = 4;
              return inquirer.askRegeneratedToken();

            case 4:
              input = _context4.sent;

              if (!input) {
                _context4.next = 8;
                break;
              }

              conf.set('github.token', input.token);
              return _context4.abrupt('return', input.token);

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    function regenerateNewToken(_x) {
      return _ref4.apply(this, arguments);
    }

    return regenerateNewToken;
  }()

};