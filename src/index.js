'use strict'
import childNodes2Obj from './childNodes2Obj'

export default function dom2json (dom) {
  let root = childNodes2Obj(dom.childNodes)
  // There should only be one node
  let rootNodeName = Object.keys(root).filter(nodeName => nodeName !== '$attrs')
  if (rootNodeName.length === 1) {
    let dom2jsonStructure = {
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
