export type Attributes = Record<string, string>

export type Dom2JsonNode = {
  $attrs?: Attributes
  $value?: string
  [key: string]: Attributes | Dom2JsonNode[] | string | undefined
}

export type Dom2JsonDocument = {
  $attrs?: Attributes
  document: Record<string, Dom2JsonNode>
}

export type Dom2JsonError = {
  error: string
}

export type Dom2JsonResult = Dom2JsonDocument | Dom2JsonError
