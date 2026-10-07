# dom2json

Convert a DOM `Document` into a compact JSON representation. Repeated sibling elements are grouped into arrays for convenient access.

> This representation is intentionally lossy: sibling ordering is not preserved across different element names.

## Install

```sh
npm install dom2json
```

Use any standards-compatible DOM implementation. Browsers provide `DOMParser` globally. In Node.js, `@xmldom/xmldom` is one option:

```sh
npm install @xmldom/xmldom
```

## Usage

```ts
import { DOMParser } from '@xmldom/xmldom'
import dom2json from 'dom2json'

const document = new DOMParser().parseFromString(
  `<?xml version="1.0" encoding="UTF-8"?>
  <Drinks>
    <Coffee>Latte</Coffee>
    <Tea>Chai</Tea>
    <Coffee>Mocha</Coffee>
  </Drinks>`,
  'text/xml',
)

const result = dom2json(document)
```

Result:

```json
{
  "$attrs": {
    "version": "1.0",
    "encoding": "UTF-8"
  },
  "document": {
    "Drinks": {
      "$attrs": {},
      "Coffee": [
        { "$attrs": {}, "$value": "Latte" },
        { "$attrs": {}, "$value": "Mocha" }
      ],
      "Tea": [{ "$attrs": {}, "$value": "Chai" }]
    }
  }
}
```

## Output conventions

- Element attributes are stored in `$attrs`.
- A sole text child or CDATA section is stored in `$value`.
- Repeated element names are grouped into arrays.
- Comments are ignored.
- XML declaration / processing-instruction attributes on the document are exposed as top-level `$attrs`.

## API

```ts
import dom2json, {
  childNodesToObject,
  getAttributes,
  getProcessingNodeAttributes,
} from 'dom2json'
```

The package is ESM-only and ships TypeScript declarations and source maps.
`dom2json` is also a named export. Input without exactly one root element
returns an object with an `error` string instead of `document`.

## Requirements

- Node.js 22.18+ for development and tests.
- The library itself has no runtime dependencies and can run in modern browsers.

## Development

```sh
npm ci
npm run check
```

`check` runs typecheck, Biome lint/format checks, a build, and Node tests. CI
uses Node 22 and 24; the library has no separate network or browser test harness.

## License

MIT

## CI maintenance

[GitHub Actions maintenance](.github/ACTIONS.md) covers workflows, parallel checks, action versions, and weekly updates.
