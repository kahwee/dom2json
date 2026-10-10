# dom2json

Convert a DOM `Document` into a compact JSON representation. Repeated sibling elements are grouped into arrays for convenient access.

> This representation is intentionally lossy: sibling ordering is not preserved across different element names.

## Version status

This README describes the unreleased 1.0.0 source on `master`.
The published npm version is 0.2.3.

## Install the published version

```sh
npm install dom2json@0.2.3
```

Version 0.2.3 uses CommonJS. Its converter is available as
`const dom2json = require('dom2json').default`; it does not include the
TypeScript declarations or named helper exports documented below.

## Try the current source

Use Node.js 22.18 or newer:

```sh
git clone https://github.com/kahwee/dom2json.git
cd dom2json
npm ci
npm run check
```

This builds the current source into `dist` and runs the repository checks.
The development dependencies include `@xmldom/xmldom`, used in the Node.js
example below. Browsers provide `DOMParser` globally.

## Usage (current source)

Run this JavaScript from a file in the repository root after building:

```js
import { DOMParser } from '@xmldom/xmldom'
import dom2json from './dist/index.js'

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

## API (current source)

```js
import dom2json, {
  childNodesToObject,
  getAttributes,
  getProcessingNodeAttributes,
} from './dist/index.js'
```

The current source builds as ESM with TypeScript declarations and source maps.
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
