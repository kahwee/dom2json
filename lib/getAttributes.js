'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = getAttributes

var _NodeType = require('./NodeType')

var NodeType = _interopRequireWildcard(_NodeType)

function _interopRequireWildcard (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}
    if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Gets an object map of the attributes
 * @param  {[type]} node HTMLNode
 * @return {[type]}      [description]
 */
function getAttributes (node) {
  if (node.nodeType !== NodeType.ELEMENT_NODE) {
    throw new Error('Requires ELEMENT_NODE, this is NodeType ' + node.nodeType)
  }
  var attrsHash = {}
  var attrs = node.attributes
  for (var i = 0; i < attrs.length; i++) {
    attrsHash[attrs[i].name] = attrs[i].value
  }
  return attrsHash
}
