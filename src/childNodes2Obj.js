import getAttributes from './getAttributes'
import getProcessingNodeAttributes from './getProcessingNodeAttributes'
import * as NodeType from './NodeType'
/**
 * Recursive function to change childNodes into object
 * @param  {[type]} childNodes [description]
 * @return {[type]}            [description]
 */
export default function childNodes2Obj (childNodes) {
  let ret = {}
  Array.apply(null, childNodes).forEach(node => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      if (node.parentNode.childNodes.length === 1) {
        ret.$value = node.nodeValue
      }
    } else if (node.nodeType === NodeType.PROCESSING_INSTRUCTION_NODE) {
      if (typeof node.nodeValue !== 'undefined') {
        ret.$attrs = {}
        getProcessingNodeAttributes(node.nodeValue).forEach(regexValues => {
          const [key, value] = regexValues
          ret.$attrs[key] = value
        })
      }
    } else if (node.nodeType === NodeType.CDATA_SECTION_NODE) {
      if (typeof node.nodeValue !== 'undefined') {
        ret.$value = node.nodeValue
      }
    } else {
      ret[node.nodeName] = ret[node.nodeName] || []
      let temp = childNodes2Obj(node.childNodes)
      temp.$attrs = getAttributes(node)
      ret[node.nodeName].push(temp)
    }
  })
  return ret
}
