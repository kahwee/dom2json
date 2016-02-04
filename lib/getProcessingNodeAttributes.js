'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = function (processingInstructionNodeValue) {
  return processingInstructionNodeValue.split(/\s+/).map(function (keyValue) {
    return (/(\w+)="([\w\d-\.]+)"/.exec(keyValue)
    )
  }).filter(function (arrays) {
    return arrays
  }).map(function (regexValues) {
    return regexValues.splice(-2)
  })
}
