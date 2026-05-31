/*
 * Tokenize tokenStringValue
 * '1 + 2 * 3 + 4 + 5 * 6'
 * =>
 * ['1', '+', '2', '*', '3', '+', '4', '+', '5', '*', '6']
 */
export const tokenizeSource = (stringValue) => {
  return Array.from(stringValue.replace(/ /g, '')).reduce((acc, curr) => {
    const lastNode = acc[acc.length - 1];
    const nodesExcludeLast = acc.slice(0, acc.length - 1);
    if (lastNode && lastNode.match(/\d$/) && curr.match(/\d/)) {
      return [...nodesExcludeLast, `${lastNode}${curr}`]
    }
    return [...acc, curr];
  }, []);
}

if (import.meta.main) {
  const source = '1 + 2 * 3 + 4 + 5 * 6';
  const tokens = tokenizeSource(source);
  console.log('tokens:', tokens);
  console.log('source:', source);
}
