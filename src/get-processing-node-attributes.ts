export function getProcessingNodeAttributes(value: string): Array<[string, string]> {
  const attributes: Array<[string, string]> = []
  const attributePattern = /([A-Za-z_][\w:.-]*)\s*=\s*(["'])(.*?)\2/g

  for (const match of value.matchAll(attributePattern)) {
    const key = match[1]
    const attributeValue = match[3]
    if (key !== undefined && attributeValue !== undefined) {
      attributes.push([key, attributeValue])
    }
  }

  return attributes
}
