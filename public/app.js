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

var _reject = require('lodash/reject');

var _reject2 = _interopRequireDefault(_reject);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../util.js');

var _reactToggle = require('react-toggle');

var _reactToggle2 = _interopRequireDefault(_reactToggle);

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

    (0, _bindAll2.default)(_this, ['renderItem', 'renderSelected', 'clickCheck', 'render', 'handleAmountModeChange', 'clickEdit', 'clickAddSubscription', 'onSubmitModal']);

    _this.modalRef = _react2.default.createRef();

    _this.state = {
      apps: _app2.default.allToJSON(),
      amountMode: 'starting'
    };
    return _this;
  }

  _createClass(AppsView, [{
    key: 'save',
    value: function save() {
      localStorage.setItem('addresses', JSON.stringify(json || this.getAll()));
    }
  }, {
    key: 'clickAddSubscription',
    value: function clickAddSubscription(e) {
      e.preventDefault();

      this.modalRef.current.openWith(_app2.default.blankApp());
    }
  }, {
    key: 'clickApp',
    value: function clickApp(app) {
      if (!app.selected) {
        app.selected = true;

        _app2.default.saveToLocalStorage();
        this.resetAppsState();
      }
    }
  }, {
    key: 'resetAppsState',
    value: function resetAppsState() {
      this.setState({
        apps: _app2.default.allToJSON()
      });
    }
  }, {
    key: 'clickCheck',
    value: function clickCheck(e, app) {
      e.stopPropagation();
      e.preventDefault();

      app.selected = false;

      this.resetAppsState();
    }
  }, {
    key: 'amountInputted',
    value: function amountInputted(e, app) {
      var attr = this.state.amountMode + '_amount_cents';
      var val = e.currentTarget.value;
      var amount = (0, _util.dollarStringToCents)(val);

      if (amount < 0) amount = 0;

      app[this.state.amountMode + '_amount_cents_value'] = val;
      app[attr] = amount;

      this.resetAppsState();
    }
  }, {
    key: 'amountBlurred',
    value: function amountBlurred(e, app) {
      var val = e.currentTarget.value;

      if (val) {
        val = (0, _util.centsToDollaString)((0, _util.dollarStringToCents)(val)).replace('$', '');
      }

      app[this.state.amountMode + '_amount_cents_value'] = val;
      this.resetAppsState();
    }
  }, {
    key: 'renderSelected',
    value: function renderSelected(app) {
      var _this2 = this;

      var amount = app[this.state.amountMode + '_amount_cents_value'] || '';

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
          _react2.default.createElement('input', { value: amount, type: 'number', className: 'money-box', placeholder: '0.00', onChange: function onChange(e) {
              return _this2.amountInputted(e, app);
            }, onBlur: function onBlur(e) {
              return _this2.amountBlurred(e, app);
            } }),
          _react2.default.createElement(
            'div',
            { className: 'per-what' },
            '/',
            app.frequency == 'monthly' ? 'mo' : 'yr'
          )
        ),
        _react2.default.createElement('img', { onClick: function onClick(e) {
            return _this2.clickCheck(e, app);
          }, className: 'check mx-2', style: { width: 20 }, src: '/check.svg' })
      );
    }
  }, {
    key: 'handleAmountModeChange',
    value: function handleAmountModeChange(e) {
      this.setState({
        amountMode: this.state.amountMode === 'starting' ? 'current' : 'starting'
      });
    }
  }, {
    key: 'clickTrash',
    value: function clickTrash(e, app) {
      e.stopPropagation();

      if (app.current_amount_cents || app.starting_amount_cents) {
        if (!confirm("Are you sure?")) {
          return;
        }
      }

      _app2.default.remove(app);
      this.resetAppsState();
    }
  }, {
    key: 'clickEdit',
    value: function clickEdit(e, app) {
      e.stopPropagation();

      this.modalRef.current.openWith(_app2.default.clonedApp(app), app.uuid);
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
              { tabIndex: '-1', className: 'site', href: app.site, target: '_blank' },
              app.site
            )
          )
        ),
        app.selected ? this.renderSelected(app) : _react2.default.createElement(
          'div',
          { className: 'center-center' },
          _react2.default.createElement('img', { onClick: function onClick(e) {
              return _this3.clickEdit(e, app);
            }, className: 'check mx-2', style: { width: 20 }, src: '/pencil.svg' }),
          _react2.default.createElement('img', { onClick: function onClick(e) {
              return _this3.clickTrash(e, app);
            }, className: 'check mx-2', style: { width: 20 }, src: '/trash-empty.svg' })
        )
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _React$createElement;

      var mode = this.state.amountMode;
      var txt = mode === 'starting' ? 'Starting amounts' : 'Current amounts';

      var apps = _app2.default.getAll();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'center-between mt-1' },
          _react2.default.createElement(
            _reactstrap.Button,
            { className: 'ml-3', size: 'sm', onClick: this.clickAddSubscription, outline: true, color: 'primary' },
            'Add Subscription'
          ),
          ' ',
          _react2.default.createElement(
            'div',
            { className: 'center' },
            _react2.default.createElement(_reactToggle2.default, {
              id: 'amount-mode',
              defaultChecked: this.state.amountMode == 'starting',
              icons: false,
              onChange: this.handleAmountModeChange }),
            _react2.default.createElement(
              'span',
              { className: 'ml-1', id: 'amount-mode' },
              txt
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'center mt-1' },
          _react2.default.createElement(
            'div',
            (_React$createElement = { className: 'list-group' }, _defineProperty(_React$createElement, 'className', 'mt-1'), _defineProperty(_React$createElement, 'style', { width: 400 }), _React$createElement),
            apps.map(this.renderItem)
          )
        )
      );
    }
  }, {
    key: 'onSubmitModal',
    value: function onSubmitModal(data, uuid) {
      if (uuid) {
        var app = _app2.default.find(uuid);
        Object.assign(app, data);
      } else {
        _app2.default.addApp(data);
      }

      this.modalRef.current.toggle();
      this.resetAppsState();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container', id: 'content' },
        _react2.default.createElement(_subscription_modal2.default, { ref: this.modalRef, onSubmitModal: this.onSubmitModal }),
        _react2.default.createElement(
          'h5',
          { className: 'lets-kill' },
          'Let\'s kill your subscriptions.'
        ),
        _react2.default.createElement(
          'div',
          { className: 'starting-amount my-2' },
          'Starting amount: ',
          (0, _util.centsToDollaString)(_app2.default.sumStartingAmountsCents()),
          ' / mo'
        ),
        _react2.default.createElement(
          'div',
          { className: 'current-amount my-2' },
          'Current amount: ',
          (0, _util.centsToDollaString)(_app2.default.sumCurrentAmountsCents()),
          ' / mo'
        ),
        this.renderContent()
      );
    }
  }]);

  return AppsView;
}(_react2.default.Component);

exports.default = AppsView;
});

;require.register("components/cancel_button.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CancelButton = function (_React$Component) {
  _inherits(CancelButton, _React$Component);

  function CancelButton(props) {
    _classCallCheck(this, CancelButton);

    var _this = _possibleConstructorReturn(this, (CancelButton.__proto__ || Object.getPrototypeOf(CancelButton)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      tooltipOpen: false
    };
    return _this;
  }

  _createClass(CancelButton, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return CancelButton;
}(_react2.default.Component);

exports.default = CancelButton;
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

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _formSerialize = require('form-serialize');

var _formSerialize2 = _interopRequireDefault(_formSerialize);

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
      modal: false,
      app: _app2.default.blankApp()
    };

    (0, _bindAll2.default)(_this, ['onSubmit', 'toggle', 'openWith', 'onInput']);
    return _this;
  }

  _createClass(SubscriptionModal, [{
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();

      this.props.onSubmitModal(this.state.app, this.state.uuid);
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
  }, {
    key: 'openWith',
    value: function openWith(app, uuid) {
      this.setState({
        modal: true,
        uuid: uuid,
        app: app
      });

      this.toggle();
    }
  }, {
    key: 'onInput',
    value: function onInput(e) {
      var val = e.currentTarget.value;
      var name = e.currentTarget.getAttribute('name');

      this.state.app[name] = val;
      this.setState(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactstrap.Modal,
        { toggle: this.toggle, isOpen: this.state.modal, className: this.props.className },
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
              { className: 'd-flex' },
              _react2.default.createElement(_reactstrap.Input, { name: 'name', placeholder: 'subscription name', value: this.state.app.name, onChange: this.onInput }),
              _react2.default.createElement(
                _reactstrap.Input,
                { type: 'select', name: 'frequency', className: 'ml-2', value: this.state.app.frequency, onChange: this.onInput, style: { width: 100 } },
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
              _react2.default.createElement(_reactstrap.Input, { placeholder: 'https://blah.com', name: 'website', value: this.state.app.website, onChange: this.onInput })
            ),
            _react2.default.createElement(
              'div',
              { className: 'center-between mt-3' },
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'secondary', onClick: this.toggle },
                'Cancel'
              ),
              _react2.default.createElement(
                _reactstrap.Button,
                { color: 'primary' },
                this.state.uuid ? 'Update' : 'Add'
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

var _sumBy = require('lodash/sumBy');

var _sumBy2 = _interopRequireDefault(_sumBy);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var json_attrs = ['uuid', 'name', 'selected', 'starting_amount_cents', 'current_amount_cents', 'frequency', 'site'];

var App = function () {
  function App(attrs) {
    _classCallCheck(this, App);

    for (var prop in attrs) {
      this[prop] = attrs[prop];
    }

    this.starting_amount_cents_value = attrs.starting_amount_cents ? (0, _util.centsToDollaString)(attrs.starting_amount_cents).replace('$', '') : '';
    this.current_amount_cents_value = attrs.current_amount_cents ? (0, _util.centsToDollaString)(attrs.current_amount_cents).replace('$', '') : '';

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
    key: 'monthlyCurrentAmount',
    value: function monthlyCurrentAmount() {
      return this.frequency === 'monthly' ? this.current_amount_cents : Math.round(this.current_amount_cents / 12);
    }
  }, {
    key: 'monthlyStartingAmount',
    value: function monthlyStartingAmount() {
      return this.frequency === 'monthly' ? this.starting_amount_cents : Math.round(this.starting_amount_cents / 12);
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
    key: 'getSelected',
    value: function getSelected() {
      return App.getAll().filter(function (a) {
        return a.selected;
      });
    }
  }, {
    key: 'blankApp',
    value: function blankApp() {
      return {
        name: '',
        amount: '',
        website: '',
        frequency: 'monthly'
      };
    }
  }, {
    key: 'clonedApp',
    value: function clonedApp(app) {
      app = Object.assign(App.blankApp(), app.toJSON());
      delete app.uuid;

      return app;
    }
  }, {
    key: 'find',
    value: function find(uuid) {
      return App.getAll().find(function (a) {
        return a.uuid === uuid;
      });
    }
  }, {
    key: 'remove',
    value: function remove(app) {
      this.apps = this.getAll().filter(function (a) {
        return a.uuid != app.uuid;
      });
      App.saveToLocalStorage();
    }
  }, {
    key: 'addApp',
    value: function addApp(data) {
      var app = new App(data);
      App.getAll().push(app);
      App.saveToLocalStorage();
    }
  }, {
    key: 'allToJSON',
    value: function allToJSON() {
      return (0, _map2.default)(this.getAll(), function (a) {
        return a.toJSON();
      });
    }
  }, {
    key: 'sumStartingAmountsCents',
    value: function sumStartingAmountsCents() {
      return (0, _sumBy2.default)(this.getSelected(), function (app) {
        return app.monthlyStartingAmount() || 0;
      });
    }
  }, {
    key: 'sumCurrentAmountsCents',
    value: function sumCurrentAmountsCents() {
      return (0, _sumBy2.default)(this.getSelected(), function (app) {
        return app.monthlyCurrentAmount() || 0;
      });
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
exports.formToJSON = exports.centsToDollaString = exports.dollarStringToCents = exports.genUUID = undefined;

var _v = require('uuid/v5');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genUUID = exports.genUUID = function genUUID(email) {
  return (0, _v2.default)(email, _v2.default.URL);
};

// eg 9.99 => 999, or $7.77 => 777
// HT: https://codereview.stackexchange.com/a/3530
var dollarStringToCents = exports.dollarStringToCents = function dollarStringToCents(money_string) {
  return Math.round(100 * parseFloat(money_string.replace(/[$,]/g, '')));
};

// http://stackoverflow.com/a/33286686/548170
var centsToDollaString = exports.centsToDollaString = function centsToDollaString(x, dollar_sign) {
  if (dollar_sign == null) {
    dollar_sign = true;
  }
  var cents = x + '';
  while (cents.length < 4) {
    cents = '0' + cents;
  }
  var dollars = cents.substr(0, cents.length - 2);
  var decimal = cents.substr(cents.length - 2, 2);
  while (dollars.length % 3 !== 0) {
    dollars = '0' + dollars;
  }
  var str = dollars.replace(/(\d{3})(?=\d)/g, '$1,').replace(/^0*(?=.)/, '');
  return (dollar_sign ? '$' : '') + str + '.' + decimal;
};

var formToJSON = exports.formToJSON = function formToJSON(form) {
  var json = {};
  var fields = form.querySelectorAll('input, textarea, select');

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];

    json[field.getAttribute('name')] = field.value;
  }

  return json;
};
});

;require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map