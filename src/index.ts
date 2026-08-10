export { childNodesToObject } from './child-nodes-to-object.js'
export { getAttributes } from './get-attributes.js'
export { getProcessingNodeAttributes } from './get-processing-node-attributes.js'
export type {
  Attributes,
  Dom2JsonDocument,
  Dom2JsonError,
  Dom2JsonNode,
  Dom2JsonResult,
} from './types.js'

import { childNodesToObject } from './child-nodes-to-object.js'
import type { Dom2JsonResult } from './types.js'

export function dom2json(dom: Document): Dom2JsonResult {
  const root = childNodesToObject(dom.childNodes)
  const rootNodeNames = Object.keys(root).filter((key) => !key.startsWith('$'))

  if (rootNodeNames.length !== 1) {
    return { error: 'There are more than one root node' }
  }

  const rootNodeName = rootNodeNames[0]
  if (rootNodeName === undefined) {
    return { error: 'There are more than one root node' }
  }
  const rootNode = root[rootNodeName]

  if (!Array.isArray(rootNode) || rootNode.length === 0) {
    return { error: 'There are more than one root node' }
  }

  const firstRootNode = rootNode[0]
  if (firstRootNode === undefined) {
    return { error: 'There are more than one root node' }
  }

  return {
    ...(root.$attrs ? { $attrs: root.$attrs as Record<string, string> } : {}),
    document: {
      [rootNodeName]: firstRootNode,
    },
  }
}

export default dom2json
