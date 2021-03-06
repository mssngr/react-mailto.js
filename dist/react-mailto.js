'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encode = encodeURIComponent;

function prepareLink(cfg) {
    var _cfg$subject = cfg.subject,
        subject = _cfg$subject === undefined ? '' : _cfg$subject,
        _cfg$to = cfg.to,
        to = _cfg$to === undefined ? '' : _cfg$to,
        _cfg$body = cfg.body,
        body = _cfg$body === undefined ? '' : _cfg$body,
        _cfg$cc = cfg.cc,
        cc = _cfg$cc === undefined ? '' : _cfg$cc,
        _cfg$bcc = cfg.bcc,
        bcc = _cfg$bcc === undefined ? '' : _cfg$bcc;

    var link = [];
    if (cc) {
        link.push('cc=' + cc);
    }
    if (bcc) {
        link.push('bcc=' + bcc);
    }
    if (subject) {
        link.push('subject=' + encode(subject));
    }
    if (body) {
        link.push('body=' + encode(body));
    }
    return to + '?' + link.join('&') + '&_c=' + new Date().getTime();
}

function handleSecureClick(href) {
    var onClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {};

    return function (e) {
        e.preventDefault();
        onClick.call(null, e);
        document.location.href = href;
    };
}

var Mailto = function (_Component) {
    (0, _inherits3.default)(Mailto, _Component);

    function Mailto() {
        (0, _classCallCheck3.default)(this, Mailto);
        return (0, _possibleConstructorReturn3.default)(this, (Mailto.__proto__ || (0, _getPrototypeOf2.default)(Mailto)).apply(this, arguments));
    }

    (0, _createClass3.default)(Mailto, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                to = _props.to,
                cc = _props.cc,
                bcc = _props.bcc,
                subject = _props.subject,
                body = _props.body,
                secure = _props.secure,
                children = _props.children,
                props = (0, _objectWithoutProperties3.default)(_props, ['to', 'cc', 'bcc', 'subject', 'body', 'secure', 'children']);

            var link = prepareLink({ to: to, cc: cc, bcc: bcc, subject: subject, body: body });
            props.href = 'mailto:' + link;
            if (secure === true) {
                props.onClick = handleSecureClick(props.href, props.onClick);
                props.href = 'javascript:void(0)';
            }
            return _react2.default.createElement(
                'a',
                props,
                children
            );
        }
    }]);
    return Mailto;
}(_react.Component);

Mailto.propTypes = {
    /** String or Array of email recepients */
    to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
    /** String or Array of emails to send a carbon copy to */
    cc: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
    /** String or Array of emails to send a bling carbon copy to */
    bcc: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
    /** Email subject */
    subject: _propTypes2.default.string,
    /** Email body */
    body: _propTypes2.default.string,
    /** Additional onClick handler */
    onClick: _propTypes2.default.func
};
Mailto.displayName = 'Mailto';
Mailto.defaultProps = {
    event: 'click'
};
exports.default = Mailto;
