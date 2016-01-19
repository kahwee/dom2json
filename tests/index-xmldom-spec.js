import dom2json from '../src'
const DOMParser2 = require('xmldom').DOMParser

describe('dom2json', function () {
  let dp
  before(function () {
    dp = new DOMParser2()
  })

  describe('General XML', function () {
    let result
    before(function () {
      let xml = dp.parseFromString(`<?xml version="1.0"     encoding="UTF-8" standalone="no"?>
        <Hello one="1" two="2" three="3"><Hi class="a"><h1>Hello World</h1></Hi><Hi class="a">Hello again</Hi></Hello>`, 'text/xml')
      result = dom2json(xml)
    })
    it('should have the correct elements', function () {
      expect(result.document.Hello).to.exist
      expect(result.document.Hello.Hi).to.exist
    })

    it('should not result in unnecessary $value', function () {
      expect(result.document.Hello.$value).to.be.undefined
      expect(result.document.Hello.Hi[0].$value).to.be.undefined
    })

    it('should have the correct $value', function () {
      expect(result.document.Hello.Hi[0].h1[0].$value).to.equal('Hello World')
      expect(result.document.Hello.Hi[1].$value).to.equal('Hello again')
    })
  })

  describe('XML with line breaks', function () {
    let result
    before(function () {
      let xml = dp.parseFromString(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <Hello one="1" two="2" three="3">
          <Hi class="a">
            <h1>Hello World</h1>
          </Hi>
        </Hello>`, 'text/xml')
      result = dom2json(xml)
    })
    it('should have the correct elements', function () {
      expect(result.document.Hello).to.exist
      expect(result.document.Hello.Hi).to.exist
    })

    it('should not result in unnecessary $value', function () {
      expect(result.document.Hello.$value).to.be.undefined
      expect(result.document.Hello.Hi[0].$value).to.be.undefined
    })

    it('should have the correct $value', function () {
      expect(result.document.Hello.Hi[0].h1[0].$value).to.equal('Hello World')
    })
  })
})
