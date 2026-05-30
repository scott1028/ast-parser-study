import { tokenizeSource } from './lib.mjs';

// diagram:    |      |             |              |  
const source = '1 + 2 * ((3 + 4 + (5 + 6) * 7 + 8) * 2 + 5) * 6 + (7 + 8) * 9';

export const findBracket = (tokens) => {
  const bracketLeftIdxList = [];
  const bracketRightIdxList = [];

  for(let idx = 0; idx < tokens.length; idx++) {   
    const token = tokens[idx];
    switch (token) {
      case '(': {
        bracketLeftIdxList.push(idx);
        break;
      }
      case ')': {
        bracketRightIdxList.push(idx);
        break;
      }
    }

    // Caution!! if brack paired just return directly
    if (bracketLeftIdxList.length > 0 && bracketLeftIdxList.length === bracketRightIdxList.length) {
      return [bracketLeftIdxList[0], bracketRightIdxList.pop()];
    }
  }

  // no any bracket in tokens
  return [-1, -1];
};

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);

  // step-02: bracket idx: [start, end]
  const foundBracketIndexes = findBracket(tokens);

  console.log('source:', source);
  console.log('tokens:', tokens);
  console.log('foundBracketIndexes:', foundBracketIndexes);
}
