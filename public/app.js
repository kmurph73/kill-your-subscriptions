(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bindAll = require('lodash/bindAll');

var _bindAll2 = _interopRequireDefault(_bindAll);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    (0, _bindAll2.default)(_this, ['onInput', 'findMatches', 'switchTab', 'renderItem']);

    _this.state = {
      apps: window.apps,
      activeTab: '1'
    };
    return _this;
  }

  _createClass(App, [{
    key: 'onInput',
    value: function onInput(e) {
      var val = e.currentTarget.value;

      var matches = this.findMatches(val);

      this.setState({
        apps: matches
      });
    }
  }, {
    key: 'searchMatches',
    value: function searchMatches(query) {
      var matches = [];

      window.apps.some(function (a) {
        if (query.test(a.terse)) {
          matches.push(a);
        }

        return matches.length >= 20;
      });

      return matches;
    }
  }, {
    key: 'findFromQuery',
    value: function findFromQuery(query) {
      query = new RegExp(query.replace(/\s|\(|\)/, ''), "i");

      return this.searchMatches(query);
    }
  }, {
    key: 'findFromStart',
    value: function findFromStart(query) {
      query = new RegExp('^' + query.replace(/\s|\(|\)/, ''), "i");

      return this.searchMatches(query);
    }
  }, {
    key: 'findMatches',
    value: function findMatches(query) {
      var matches = [];

      if (query.length > 2) {
        matches = this.findFromStart(query);
      }

      if (!matches.length) {
        matches = this.findFromQuery(query);
      }

      return matches;
    }
  }, {
    key: 'clickAddSubscription',
    value: function clickAddSubscription(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickApp',
    value: function clickApp(app) {
      if (!app.selected) {
        app.selected = true;

        this.setState(this.state);
      }
    }
  }, {
    key: 'switchTab',
    value: function switchTab(tab) {
      this.setState({ activeTab: tab });
    }
  }, {
    key: 'renderSelected',
    value: function renderSelected() {
      return _react2.default.createElement(
        'div',
        { className: 'center-between' },
        _react2.default.createElement(
          'div',
          { className: 'center money-div mr-2' },
          _react2.default.createElement(
            'div',
            null,
            '$'
          ),
          _react2.default.createElement(
            'div',
            { className: 'center money-box' },
            _react2.default.createElement('input', { placeholder: '0.00' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'per-what' },
            '/mo'
          )
        ),
        _react2.default.createElement('img', { className: 'mx-2', style: { width: 20 }, src: '/check.svg' })
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(app) {
      var _this2 = this;

      var classes = (0, _classnames2.default)({ selected: app.selected });

      return _react2.default.createElement(
        'div',
        { className: "center-between app-item " + classes, onClick: function onClick() {
            return _this2.clickApp(app);
          }, key: app.terse },
        _react2.default.createElement(
          'div',
          null,
          app.name
        ),
        app.selected ? this.renderSelected() : null
      );
    }
  }, {
    key: 'renderTabContent',
    value: function renderTabContent() {
      if (this.state.activeTab === '1') {
        var _React$createElement;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'center mt-2' },
            _react2.default.createElement('input', { onInput: this.onInput, style: { width: '90%', height: 40 }, className: 'form-control mb-2', placeholder: 'Search subscriptions' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'center mt-1' },
            _react2.default.createElement(
              _reactstrap.Button,
              { onClick: this.clickAddSubscription, outline: true, color: 'primary' },
              'Add Subscription'
            ),
            ' '
          ),
          _react2.default.createElement(
            'div',
            { className: 'center mt-1' },
            _react2.default.createElement(
              'div',
              (_React$createElement = { className: 'list-group' }, _defineProperty(_React$createElement, 'className', 'mt-1'), _defineProperty(_React$createElement, 'style', { width: 400 }), _React$createElement),
              this.state.apps.map(this.renderItem)
            )
          )
        );
      } else {
        _react2.default.createElement(
          'p',
          null,
          'your subs'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { id: 'content' },
        _react2.default.createElement(
          'h5',
          { style: { textAlign: 'center' } },
          'Let\'s kill your subscriptions.'
        ),
        _react2.default.createElement(
          _reactstrap.Nav,
          { tabs: true },
          _react2.default.createElement(
            _reactstrap.NavItem,
            null,
            _react2.default.createElement(
              _reactstrap.NavLink,
              {
                className: (0, _classnames2.default)({ active: this.state.activeTab === '1' }),
                onClick: function onClick() {
                  _this3.switchTab('1');
                }
              },
              'Subscriptions'
            )
          ),
          _react2.default.createElement(
            _reactstrap.NavItem,
            null,
            _react2.default.createElement(
              _reactstrap.NavLink,
              {
                className: (0, _classnames2.default)({ active: this.state.activeTab === '2' }),
                onClick: function onClick() {
                  _this3.switchTab('2');
                }
              },
              'Your Subscriptions'
            )
          )
        ),
        this.renderTabContent()
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/subscription_modal.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bindAll = require('lodash/bindAll');

var _bindAll2 = _interopRequireDefault(_bindAll);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubscriptionModal = function (_React$Component) {
  _inherits(SubscriptionModal, _React$Component);

  function SubscriptionModal(props) {
    _classCallCheck(this, SubscriptionModal);

    var _this = _possibleConstructorReturn(this, (SubscriptionModal.__proto__ || Object.getPrototypeOf(SubscriptionModal)).call(this, props));

    _this.state = {
      modal: false
    };

    (0, _bindAll2.default)(_this, ['toggle', 'onSubmit']);

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(SubscriptionModal, [{
    key: 'toggle',
    value: function toggle(e) {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        modal: !this.state.modal
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactstrap.Button,
          { color: 'danger', onClick: this.toggle },
          this.props.buttonLabel
        ),
        _react2.default.createElement(
          _reactstrap.Modal,
          { isOpen: this.state.modal, toggle: this.toggle, className: this.props.className },
          _react2.default.createElement(
            _reactstrap.ModalHeader,
            { toggle: this.toggle },
            'Add a subscription'
          ),
          _react2.default.createElement(
            _reactstrap.ModalBody,
            null,
            _react2.default.createElement(
              Form,
              { onSubmit: this.onSubmit },
              _react2.default.createElement(Input, { placeholder: 'subscription name' }),
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'secondary', onClick: this.toggle },
                'Cancel'
              ),
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'primary', onClick: this.toggle },
                'Add'
              ),
              ' '
            )
          )
        )
      );
    }
  }]);

  return SubscriptionModal;
}(_react2.default.Component);

exports.default = SubscriptionModal;
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var time = Date.now();

document.addEventListener('DOMContentLoaded', function () {
  fetch('/subscription_apps.json').then(function (r) {
    return r.json();
  }).then(function (json) {
    window.apps = json.apps.map(function (app) {
      return {
        name: app,
        terse: app.toLowerCase().replace(/\s/, '')
      };
    });

    _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));
  });
});
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map