import getProcessingNodeAttributes from '../src/getProcessingNodeAttributes'
describe('getProcessingNodeAttributes', function () {
  it('should parse `one="1" two="two" three="3.3"` into the correct array', function () {
    const result = getProcessingNodeAttributes(`one="1" two="two" three="3.3"`)
    expect(result[0][0]).to.equal('one')
    expect(result[0][1]).to.equal('1')
    expect(result[1][0]).to.equal('two')
    expect(result[1][1]).to.equal('two')
    expect(result[2][0]).to.equal('three')
    expect(result[2][1]).to.equal('3.3')
  })
})
