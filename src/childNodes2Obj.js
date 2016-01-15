import getAttributes from './getAttributes'

/**
 * Recursive function to change childNodes into object
 * @param  {[type]} childNodes [description]
 * @return {[type]}            [description]
 */
export default function childNodes2Obj (childNodes) {
  let ret = {}
  Array.apply(null, childNodes).forEach(node => {
    ret[node.nodeName] = ret[node.nodeName] || []
    if (node.nodeType === 3) {

    } else {
      let temp = childNodes2Obj(node.childNodes)
      temp.$attrs = getAttributes(node)
      if (node.textContent) {
        temp.$textContent = node.textContent
      }
      ret[node.nodeName].push(temp)
    }
  })
  return ret
}
