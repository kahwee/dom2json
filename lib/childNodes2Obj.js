'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = childNodes2Obj;

var _getAttributes = require('./getAttributes');

var _getAttributes2 = _interopRequireDefault(_getAttributes);

var _getProcessingNodeAttributes = require('./getProcessingNodeAttributes');

var _getProcessingNodeAttributes2 = _interopRequireDefault(_getProcessingNodeAttributes);

var _NodeType = require('./NodeType');

var NodeType = _interopRequireWildcard(_NodeType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Recursive function to change childNodes into object
 * @param  {[type]} childNodes [description]
 * @return {[type]}            [description]
 */
function childNodes2Obj(childNodes) {
  var ret = {};
  Array.apply(null, childNodes).forEach(function (node) {
    if (node.nodeType === NodeType.TEXT_NODE) {
      if (node.parentNode.childNodes.length === 1) {
        ret.$value = node.nodeValue;
      }
    } else if (node.nodeType === NodeType.PROCESSING_INSTRUCTION_NODE) {
      if (typeof node.nodeValue !== 'undefined') {
        ret.$attrs = {};
        (0, _getProcessingNodeAttributes2.default)(node.nodeValue).forEach(function (regexValues) {
          var _regexValues = _slicedToArray(regexValues, 2),
              key = _regexValues[0],
              value = _regexValues[1];

          ret.$attrs[key] = value;
        });
      }
    } else if (node.nodeType === NodeType.CDATA_SECTION_NODE) {
      if (typeof node.nodeValue !== 'undefined') {
        ret.$value = node.nodeValue;
      }
    } else {
      ret[node.nodeName] = ret[node.nodeName] || [];
      var temp = childNodes2Obj(node.childNodes);
      temp.$attrs = (0, _getAttributes2.default)(node);
      ret[node.nodeName].push(temp);
    }
  });
  return ret;
}