# dom2json

This converts DOM documents to JSON. It was intended to be used for XML and now made to be generic to accomodate HTML documents as well.

[![Build Status](https://travis-ci.org/kahwee/dom2json.svg?branch=master)](https://travis-ci.org/kahwee/dom2json)
[![Coverage Status](https://coveralls.io/repos/github/kahwee/dom2json/badge.svg?branch=master)](https://coveralls.io/github/kahwee/dom2json?branch=master)
[![npm version](https://badge.fury.io/js/dom2json.svg)](https://badge.fury.io/js/dom2json)
[![bitHound Overall Score](https://www.bithound.io/github/kahwee/dom2json/badges/score.svg)](https://www.bithound.io/github/kahwee/dom2json)

# Example

```js
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
              "$textContent": "Hello World"
            }
          ],
          "$attrs":{
            "class": "a"
          },
          "$textContent": "Hello World"
        },
        {
          "$attrs":{
            "class": "a"
          },
          "$textContent": "Hello again"
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
