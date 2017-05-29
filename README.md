# dom2json

[![Greenkeeper badge](https://badges.greenkeeper.io/kahwee/dom2json.svg)](https://greenkeeper.io/)

This converts DOM documents into a special blend of JSON. It was intended to be used for XML and now made to be generic to accomodate HTML documents as well. Please take a look at usage examples to see if it suits your needs.

[![Build Status](https://travis-ci.org/kahwee/dom2json.svg?branch=master)](https://travis-ci.org/kahwee/dom2json)
[![Coverage Status](https://coveralls.io/repos/github/kahwee/dom2json/badge.svg?branch=master)](https://coveralls.io/github/kahwee/dom2json?branch=master)
[![npm version](https://badge.fury.io/js/dom2json.svg)](https://badge.fury.io/js/dom2json)
[![bitHound Overall Score](https://www.bithound.io/github/kahwee/dom2json/badges/score.svg)](https://www.bithound.io/github/kahwee/dom2json)

## Support

* Browser (tested on Firefox)
* `xmldom`

## What is sacrificed?

In order for easy access to element node children, elements are grouped together.

For example, the following XML:

```xml
<Drinks>
  <Coffee>Latte</Coffee>
  <Tea>Chai</Tea>
  <Coffee>Mocha</Coffee>
  <Coffee>Espresso</Coffee>
  <Coffee>Flat White</Coffee>
  <Tea>Mint</Tea>
</Drinks>
```

Gets converted to:

```
{
  "document": {
    "Drinks": {
      "Coffee": [
        { $value: "Latte" },
        { $value: "Mocha" },
        { $value: "Espresso" },
        { $value: "Flat White" }
      ],
      "Tea": [
        { $value: "Chai" },
        { $value: "Mint" }
      ]
    }
  }
}
```

So there are some information loss here. Please use with caution!

## Usage example

```js
// Optional:
// const DOMParser = require('xmldom').DOMParser

const dp = new DOMParser()
let xml = dp.parseFromString(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <Hello one="1" two="2" three="3"><Hi class="a"><h1>Hello World</h1></Hi><Hi class="a">Hello again</Hi></Hello>`, 'text/xml')
result = dom2json(xml)
```

Results:

```json
{
  "document":{
    "Hello":{
      "Hi":[
        {
          "h1":[
            {
              "$attrs": {
              },
              "$value": "Hello World"
            }
          ],
          "$attrs":{
            "class": "a"
          },
          "$value": "Hello World"
        },
        {
          "$attrs":{
            "class": "a"
          },
          "$value": "Hello again"
        }
      ],
      "$attrs":{
        "one":"1",
        "two":"2",
        "three":"3"
      }
    }
  }
}
```
