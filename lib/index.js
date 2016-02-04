'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = dom2json

var _childNodes2Obj = require('./childNodes2Obj')

var _childNodes2Obj2 = _interopRequireDefault(_childNodes2Obj)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dom2json (dom) {
  var root = (0, _childNodes2Obj2.default)(dom.childNodes)
  // There should only be one node
  var rootNodeName = Object.keys(root).filter(function (nodeName) {
    return nodeName !== '$attrs'
  })
  if (rootNodeName.length === 1) {
    var dom2jsonStructure = {
      $attrs: root.$attrs,
      document: {}
    }
    dom2jsonStructure.document[rootNodeName[0]] = root[rootNodeName[0]][0]
    return dom2jsonStructure
  } else {
    return {
      error: 'There are more than one root node'
    }
  }
}
