import dom2json from '../src'

describe('dom2json', function() {
  let dp
  before(function() {
    dp = new DOMParser()
  })

  describe('General XML', function() {
    let result
    before(function() {
      let xml = dp.parseFromString(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <Hello one="1" two="2" three="3"><Hi class="a"><h1>Hello World</h1></Hi><Hi class="a">Hello again</Hi></Hello>`, 'text/xml')
      result = dom2json(xml)
      console.log(JSON.stringify(result))
    })
    it('should have the correct elements', function() {
      expect(result.document.Hello).to.exist
      expect(result.document.Hello.Hi).to.exist
    })
  })
})
