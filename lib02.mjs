/*
 * Tokenize tokenStringValue
 * '(1 + 2 * 3 + (4 + (5 + 6)) * 6)'
 * =>
 * ['(', '1', '+', '2', '*', '3', '+', '(', '4', '+', '(', '5', '+', '6', ')', ')', '*', '6', ')']
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
  const source = '(1 + 2 * 3 + (4 + (5 + 6)) * 6)';
  const tokens = tokenizeSource(source);
  console.log('source:', source);
  console.log('tokens:', tokens);
}

// 找配對個括號 left, right index, FIFO
export const findParentheses = (tokens) => {
  const leftParenthesesIdxList = [];
  const rightParenthesesIdxList = [];

  for(let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx];
    switch (token) {
      case '(': {
        leftParenthesesIdxList.push(idx);
        break;
      }
      case ')': {
        rightParenthesesIdxList.push(idx);
        break;
      }
    }

    if (leftParenthesesIdxList.length !== 0 && (leftParenthesesIdxList.length == rightParenthesesIdxList.length)) {
      return [leftParenthesesIdxList.shift(), rightParenthesesIdxList.pop()];
    }
  }

  // if (leftParenthesesIdxList.length !== rightParenthesesIdxList.length) {
  //   throw new Error('parentheses is not matched')
  // }

  return [-1, -1];
}

if (import.meta.main) {
  const source = [
    '1', '+', '2', '*',
    '3', '+', '(', '4', '+',
    '(', '5', '+', '6', ')',
    ')', '*', '6'
  ];
  console.log(findParentheses(source));
}
