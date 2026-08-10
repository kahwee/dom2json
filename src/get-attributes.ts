import { ELEMENT_NODE } from './node-type.js'
import type { Attributes } from './types.js'

export function getAttributes(node: Node): Attributes {
  if (node.nodeType !== ELEMENT_NODE) {
    throw new TypeError(`Requires ELEMENT_NODE, this is NodeType ${node.nodeType}`)
  }

  const element = node as Element
  const attributes: Attributes = {}

  for (const attribute of Array.from(element.attributes)) {
    attributes[attribute.name] = attribute.value
  }

  return attributes
}
