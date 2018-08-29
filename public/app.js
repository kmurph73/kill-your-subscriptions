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
require.register("components/apps_view.jsx", function(exports, require, module) {
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

var _app = require('models/app.js');

var _app2 = _interopRequireDefault(_app);

var _subscription_modal = require('./subscription_modal.jsx');

var _subscription_modal2 = _interopRequireDefault(_subscription_modal);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppsView = function (_React$Component) {
  _inherits(AppsView, _React$Component);

  function AppsView(props) {
    _classCallCheck(this, AppsView);

    var _this = _possibleConstructorReturn(this, (AppsView.__proto__ || Object.getPrototypeOf(AppsView)).call(this, props));

    (0, _bindAll2.default)(_this, ['onInput', 'findMatches', 'switchTab', 'renderItem', 'renderSelected', 'clickCheck', 'render', 'clickAddSubscription', 'onHideModal']);

    _this.state = {
      apps: _app2.default.getAll(),
      activeTab: '1'
    };
    return _this;
  }

  _createClass(AppsView, [{
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
    key: 'save',
    value: function save() {
      localStorage.setItem('addresses', JSON.stringify(json || this.getAll()));
    }
  }, {
    key: 'clickAddSubscription',
    value: function clickAddSubscription(e) {
      e.preventDefault();

      this.setState({
        editingApp: {}
      });
    }
  }, {
    key: 'clickApp',
    value: function clickApp(app) {
      if (!app.selected) {
        app.selected = true;

        _app2.default.saveToLocalStorage();
        this.setState(this.state);
      }
    }
  }, {
    key: 'switchTab',
    value: function switchTab(tab) {
      this.setState({ activeTab: tab });
    }
  }, {
    key: 'clickCheck',
    value: function clickCheck(e, app) {
      e.stopPropagation();
      e.preventDefault();

      app.selected = false;

      this.setState(this.state);
    }
  }, {
    key: 'inputBlurred',
    value: function inputBlurred(e, app) {}
  }, {
    key: 'renderSelected',
    value: function renderSelected(app) {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'center-between', key: app.uuid },
        _react2.default.createElement(
          'div',
          { className: 'center money-div mr-2' },
          _react2.default.createElement(
            'div',
            null,
            '$'
          ),
          _react2.default.createElement('input', { type: 'number', className: 'money-box', placeholder: '0.00', onBlur: function onBlur(e) {
              return _this2.inputBlurred(e, app);
            } }),
          _react2.default.createElement(
            'div',
            { className: 'per-what' },
            '/',
            app.type == 'monthly' ? 'mo' : 'year'
          )
        ),
        _react2.default.createElement('img', { onClick: function onClick(e) {
            return _this2.clickCheck(e, app);
          }, className: 'check mx-2', style: { width: 20 }, src: '/cancel-inactive.svg' }),
        _react2.default.createElement('img', { onClick: function onClick(e) {
            return _this2.clickCheck(e, app);
          }, className: 'check mx-2', style: { width: 20 }, src: '/check.svg' })
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(app) {
      var _this3 = this;

      var classes = (0, _classnames2.default)({ selected: app.selected });

      return _react2.default.createElement(
        'div',
        { className: "center-between app-item " + classes, onClick: function onClick() {
            return _this3.clickApp(app);
          }, key: app.uuid },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            app.name
          ),
          app.selected && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'a',
              { className: 'site', href: app.site, target: '_blank' },
              app.site
            )
          )
        ),
        app.selected ? this.renderSelected(app) : null
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
        var _React$createElement2;

        var apps = this.state.apps.filter(function (a) {
          return a.selected;
        });
        return _react2.default.createElement(
          'div',
          null,
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
              (_React$createElement2 = { className: 'list-group' }, _defineProperty(_React$createElement2, 'className', 'mt-1'), _defineProperty(_React$createElement2, 'style', { width: 400 }), _React$createElement2),
              apps.map(this.renderItem)
            )
          )
        );
      }
    }
  }, {
    key: 'onHideModal',
    value: function onHideModal() {
      this.setState({
        editingApp: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var your_apps = this.state.apps.filter(function (a) {
        return a.selected;
      });

      return _react2.default.createElement(
        'div',
        { className: 'container', id: 'content' },
        _react2.default.createElement(_subscription_modal2.default, { editingApp: this.state.editingApp, onHideModal: this.onHideModal }),
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
                  _this4.switchTab('1');
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
                  _this4.switchTab('2');
                }
              },
              'Your Subscriptions (',
              your_apps.length,
              ')'
            )
          )
        ),
        this.renderTabContent()
      );
    }
  }]);

  return AppsView;
}(_react2.default.Component);

exports.default = AppsView;
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

    (0, _bindAll2.default)(_this, ['onSubmit']);
    return _this;
  }

  _createClass(SubscriptionModal, [{
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactstrap.Modal,
        { isOpen: !!this.props.editingApp, className: this.props.className },
        _react2.default.createElement(
          _reactstrap.ModalHeader,
          null,
          'Add a subscription'
        ),
        _react2.default.createElement(
          _reactstrap.ModalBody,
          null,
          _react2.default.createElement(
            _reactstrap.Form,
            { onSubmit: this.onSubmit },
            _react2.default.createElement(
              _reactstrap.FormGroup,
              null,
              _react2.default.createElement(_reactstrap.Input, { placeholder: 'subscription name' })
            ),
            _react2.default.createElement(
              _reactstrap.FormGroup,
              { className: 'd-flex' },
              _react2.default.createElement(_reactstrap.Input, { className: 'mr-2', name: 'select', type: 'number', placeholder: '0.00', style: { width: 90 } }),
              _react2.default.createElement(
                _reactstrap.Input,
                { type: 'select', name: 'frequency', className: 'ml-2' },
                _react2.default.createElement(
                  'option',
                  null,
                  'monthly'
                ),
                _react2.default.createElement(
                  'option',
                  null,
                  'yearly'
                )
              )
            ),
            _react2.default.createElement(
              _reactstrap.FormGroup,
              null,
              _react2.default.createElement(
                _reactstrap.Label,
                null,
                'Website'
              ),
              _react2.default.createElement(_reactstrap.Input, { placeholder: 'https://blah.com' })
            ),
            _react2.default.createElement(
              _reactstrap.FormGroup,
              { className: 'ml-4' },
              _react2.default.createElement(
                _reactstrap.Label,
                { check: true },
                _react2.default.createElement(_reactstrap.Input, { type: 'checkbox' }),
                ' ',
                'I have cancelled this membership.'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'center-between mt-3' },
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'secondary', onClick: this.props.onHideModal },
                'Cancel'
              ),
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'primary' },
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

var _app = require('models/app.js');

var _app2 = _interopRequireDefault(_app);

var _apps_view = require('components/apps_view.jsx');

var _apps_view2 = _interopRequireDefault(_apps_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var time = Date.now();

document.addEventListener('DOMContentLoaded', function () {
  fetch('/subscription_apps.json').then(function (r) {
    return r.json();
  }).then(function (json) {
    window.apps = json.apps;

    _reactDom2.default.render(_react2.default.createElement(_apps_view2.default, null), document.querySelector('#app'));
  });
});
});

require.register("models/app.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var json_attrs = ['uuid', 'name', 'selected', 'amount', 'frequency', 'site'];

var App = function () {
  function App(attrs) {
    _classCallCheck(this, App);

    for (var prop in attrs) {
      this[prop] = attrs[prop];
    }

    if (!this.uuid) {
      this.uuid = (0, _util.genUUID)(attrs.name);
    }
  }

  _createClass(App, [{
    key: 'tersify',
    value: function tersify(name) {
      return name.toLowerCase().replace(/\s/, '');
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;
      this.terse = this.tersify(name);

      App.saveToLocalStorage();
    }
  }, {
    key: 'setSelected',
    value: function setSelected(val) {
      this.selected = val;

      App.saveToLocalStorage();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = json_attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var a = _step.value;

          json[a] = this[a];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return json;
    }
  }], [{
    key: 'getAll',
    value: function getAll() {
      if (this.apps) {
        return this.apps;
      }

      var apps = JSON.parse(localStorage.getItem('apps')) || window.apps;
      this.apps = apps.map(function (a) {
        return new App(a);
      });

      return this.apps;
    }
  }, {
    key: 'saveToLocalStorage',
    value: function saveToLocalStorage(json) {
      localStorage.setItem('apps', JSON.stringify(this.getAll()));
    }
  }]);

  return App;
}();

exports.default = App;
});

require.register("util.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genUUID = undefined;

var _v = require('uuid/v5');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genUUID = exports.genUUID = function genUUID(email) {
  return (0, _v2.default)(email, _v2.default.URL);
};
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map