/**
 * Takes in: one="1" two="two" three="3.3"
 * Output: [["one", "1", "two", "two", "three", "3.3"]]
 *
 * @param  {[type]} processingInstructionNodeValue [description]
 * @return {[type]}                                [description]
 */
export default function (processingInstructionNodeValue) {
  return processingInstructionNodeValue.split(/\s+/)
    .map(keyValue => /(\w+)="([\w\d-\.]+)"/.exec(keyValue))
    .filter(arrays => arrays)
    .map(regexValues => regexValues.splice(-2))
}
