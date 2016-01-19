'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = childNodes2Obj;

var _getAttributes = require('./getAttributes');

var _getAttributes2 = _interopRequireDefault(_getAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Recursive function to change childNodes into object
 * @param  {[type]} childNodes [description]
 * @return {[type]}            [description]
 */
function childNodes2Obj(childNodes) {
  var ret = {};
  Array.apply(null, childNodes).forEach(function (node) {
    if (node.nodeType === 3) {
      ret.$value = node.nodeValue;
    } else {
      ret[node.nodeName] = ret[node.nodeName] || [];
      var temp = childNodes2Obj(node.childNodes);
      temp.$attrs = (0, _getAttributes2.default)(node);
      ret[node.nodeName].push(temp);
    }
  });
  return ret;
}