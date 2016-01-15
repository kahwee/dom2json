# dom2json

This converts DOM documents to JSON. It was intended to be used for XML and now made to be generic to accomodate HTML documents as well.

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
