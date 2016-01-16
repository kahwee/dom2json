import getAttributes from '../src/getAttributes'

describe('getAttributes', function () {
  let div
  before(function (done) {
    div = document.createElement('div')
    div.id = 'getAttributes'
    div.className = 'name-of-class'
    div.innerHTML = '<h1>Unused</h1>'
    div.innerHTMLs = `
<form>
  <h1>Heading 1a</h1>
  <h1>Heading 1b</h1>
  <h3>Heading 3</h3>
  <h4>Heading 2</h4>
  <h2>Heading 2</h2>
  <h1>Heading 1c</h1>
  <h1>Heading 1d</h1>
</form>
    `
    done()
  })

  describe('<div id="getAttributes" class="name-of-class"></div>', function () {
    let attrs

    before(function () {
      attrs = getAttributes(div)
    })

    it('should generates correct key-value map', function () {
      expect(attrs.id).to.equal(div.id)
      expect(attrs.class).to.equal(div.className)
    })

    it('should have correct length', function () {
      expect(Object.keys(attrs)).to.be.length(2)
    })
  })

  describe('<span></span>', function () {
    let attrs
    let div = document.createElement('div')
    div.id = 'span-test-case'
    div.innerHTML = '<span></span>'
    document.body.appendChild(div)

    before(function () {
      attrs = getAttributes(div.querySelector('span'))
    })

    it('should generates correct key-value map', function () {
      expect(attrs).to.be.empty
    })

    it('should have correct length', function () {
      expect(Object.keys(attrs)).to.be.length(0)
    })
  })
})
