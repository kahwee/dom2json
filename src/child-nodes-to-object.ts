import { getAttributes } from './get-attributes.js'
import { getProcessingNodeAttributes } from './get-processing-node-attributes.js'
import {
  CDATA_SECTION_NODE,
  COMMENT_NODE,
  ELEMENT_NODE,
  PROCESSING_INSTRUCTION_NODE,
  TEXT_NODE,
} from './node-type.js'
import type { Attributes, Dom2JsonNode } from './types.js'

export function childNodesToObject(childNodes: NodeListOf<ChildNode> | NodeList): Dom2JsonNode {
  const result: Dom2JsonNode = {}

  for (const node of Array.from(childNodes)) {
    switch (node.nodeType) {
      case TEXT_NODE: {
        if (node.parentNode?.childNodes.length === 1 && node.nodeValue !== null) {
          result.$value = node.nodeValue
        }
        break
      }

      case PROCESSING_INSTRUCTION_NODE: {
        if (node.nodeValue !== null) {
          const attributes: Attributes = {}
          for (const [key, value] of getProcessingNodeAttributes(node.nodeValue)) {
            attributes[key] = value
          }
          result.$attrs = attributes
        }
        break
      }

      case CDATA_SECTION_NODE: {
        if (node.nodeValue !== null) {
          result.$value = node.nodeValue
        }
        break
      }

      case COMMENT_NODE:
        break

      case ELEMENT_NODE: {
        const nodeName = node.nodeName
        const children = result[nodeName]
        const entries = Array.isArray(children) ? children : []
        const child = childNodesToObject(node.childNodes)
        child.$attrs = getAttributes(node)
        entries.push(child)
        result[nodeName] = entries
        break
      }

      default:
        break
    }
  }

  return result
}
