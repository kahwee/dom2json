import * as NodeType from './NodeType'

/**
 * Gets an object map of the attributes
 * @param  {[type]} node HTMLNode
 * @return {[type]}      [description]
 */
export default function getAttributes (node) {
  if (node.nodeType !== NodeType.ELEMENT_NODE) {
    throw new Error('Requires ELEMENT_NODE')
  }
  let attrsHash = {}
  const attrs = node.attributes
  for (let i = 0; i < attrs.length; i++) {
    attrsHash[attrs[i].name] = attrs[i].value
  }
  return attrsHash
}
