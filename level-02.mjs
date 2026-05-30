import { tokenizeSource } from './lib.mjs';
// import { nestifyTokens as baseNestifyTokens } from './level-01.mjs';
import { findBracket } from './level-02-find-bracket.mjs';

// diagram:     |       |            |         |    |       |    |     ||   |
const source = '1 + 2 * (3 + 4 * 2 + (5 + 6 + 7) * 8) * 6 + (7 * (8 + 9)) + 9 * 8';

const unbracketizeTokens = (tokens) => {
  const [leftBracketIdx, rightBracketIdx] = findBracket(tokens);

  // recursive terminal condition
  if (leftBracketIdx === -1 && rightBracketIdx === -1) {
    return tokens.map(token => {
      if (Array.isArray(token)) {
        return unbracketizeTokens(token)
      }
      return token;
    });
  }

  const firstChunkTokens = tokens.slice(0, leftBracketIdx);
  const chunkTokens = tokens.slice(leftBracketIdx + 1, rightBracketIdx);
  const restChunkTokens = tokens.slice(rightBracketIdx + 1);

  return unbracketizeTokens([
    ...firstChunkTokens,
    chunkTokens,
    ...restChunkTokens,
  ]);
};

const nestifyTokens = (tokens) => {
  const lastOperatorIdx = tokens.findLastIndex(token => ['+', '-', '*', '/'].includes(token));
  const lastOperator = tokens[lastOperatorIdx];

  // terminate condition
  if (!lastOperator) {
    return tokens;
  }

  return [
    ...tokens.slice(0, lastOperatorIdx - 1),
    nestifyTokens(tokens[lastOperatorIdx - 1]),
    lastOperator,
    nestifyTokens(tokens[lastOperatorIdx + 1]),
    ...tokens.slice(lastOperatorIdx + 2),
  ];
}

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);

  // step-02: unbracket tokens
  const unbracketedTokens = unbracketizeTokens(tokens);
  
  // step-03: nestifyTokens with priority
  const nestedTokens = nestifyTokens(unbracketedTokens);
  
  console.log('source:', source);
  console.log('tokens:', tokens);
  console.log('unbracketedTokens:', JSON.stringify(unbracketedTokens, null, 2));
  console.log('nestedTokens:', JSON.stringify(nestedTokens, null, 2));
}
