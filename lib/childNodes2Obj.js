import getAttributes from './getAttributes';

/**
 * Recursive function to change childNodes into object
 * @param  {[type]} childNodes [description]
 * @return {[type]}            [description]
 */
export default function childNodes2Obj(childNodes) {
  let ret = {};
  Array.apply(null, childNodes).forEach(node => {
    if (node.nodeType === 3) {
      ret.$value = node.nodeValue;
    } else {
      ret[node.nodeName] = ret[node.nodeName] || [];
      let temp = childNodes2Obj(node.childNodes);
      temp.$attrs = getAttributes(node);
      ret[node.nodeName].push(temp);
    }
  });
  return ret;
}