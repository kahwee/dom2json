import assert from 'node:assert/strict'
import test from 'node:test'
import { DOMParser } from '@xmldom/xmldom'
import dom2json, {
  type Dom2JsonDocument,
  getAttributes,
  getProcessingNodeAttributes,
} from '../dist/index.js'

function parse(xml: string): Document {
  return new DOMParser().parseFromString(xml, 'text/xml') as unknown as Document
}

function expectDocument(xml: string): Dom2JsonDocument {
  const result = dom2json(parse(xml))
  assert.ok(!('error' in result), 'expected conversion to succeed')
  return result
}

test('converts repeated XML elements and attributes', () => {
  const result = expectDocument(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <Hello one="1" two="2" three="3"><Hi class="a"><h1>Hello World</h1></Hi><Hi class="a">Hello again</Hi></Hello>`)

  const hello = result.document.Hello
  assert.ok(Array.isArray(hello.Hi))
  assert.equal(hello.Hi[0].h1?.[0].$value, 'Hello World')
  assert.equal(hello.Hi[1].$value, 'Hello again')
  assert.deepEqual(hello.$attrs, { one: '1', two: '2', three: '3' })
})

test('ignores formatting whitespace and comments', () => {
  const result = expectDocument(`<Hello>
    <!-- comment -->
    <Hi><h1>Hello World</h1></Hi>
  </Hello>`)

  const hello = result.document.Hello
  assert.equal(hello.$value, undefined)
  assert.equal(hello.Hi?.[0].$value, undefined)
  assert.equal(hello.Hi?.[0].h1?.[0].$value, 'Hello World')
})

test('preserves CDATA as $value', () => {
  const result = expectDocument('<Hello><![CDATA[<not-markup>]]></Hello>')
  assert.equal(result.document.Hello.$value, '<not-markup>')
})

test('captures XML declaration attributes', () => {
  const result = expectDocument('<?xml version="1.0" encoding="UTF-8"?><Hello />')
  assert.deepEqual(result.$attrs, { version: '1.0', encoding: 'UTF-8' })
})

test('parses processing-instruction attributes with punctuation and spaces', () => {
  assert.deepEqual(getProcessingNodeAttributes('one="1" data-id="a.b" label="hello world"'), [
    ['one', '1'],
    ['data-id', 'a.b'],
    ['label', 'hello world'],
  ])
})

test('extracts element attributes', () => {
  const element = parse('<div id="x" class="y" />').documentElement as unknown as Node
  assert.deepEqual(getAttributes(element), { id: 'x', class: 'y' })
})

test('rejects non-element nodes in getAttributes', () => {
  const document = parse('<div />')
  assert.throws(() => getAttributes(document as unknown as Node), /Requires ELEMENT_NODE/)
})
