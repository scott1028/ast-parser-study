import { tokenizeSource } from './lib02.mjs';
// import { nestifyTokens as baseNestifyTokens } from './level-01.mjs';
// import { findBracket, unBracket } from './level-02-find-bracket.mjs';

// diagram:     |       |            |         |    |       |    |     ||   |
const source = '1 + 2 * (3 + 4 * 2 + (5 + 6 + 7) * 8) * 6 + ((6 + ((7)) + 8) * 9) + ((9 * 8 + 7)) * 6';
// const source = '1 + 2 * 3 + (4 + 5) * 6';

// const unbracketizeTokens = (tokens) => {
//   const [leftBracketIdx, rightBracketIdx] = findBracket(tokens);

//   // recursive terminal condition
//   if (leftBracketIdx === -1 && rightBracketIdx === -1) {
//     return tokens.map(token => {
//       if (Array.isArray(token)) {
//         return unbracketizeTokens(token)
//       }
//       return token;
//     });
//   }

//   const firstChunkTokens = tokens.slice(0, leftBracketIdx);
//   const chunkTokens = tokens.slice(leftBracketIdx + 1, rightBracketIdx);
//   const restChunkTokens = tokens.slice(rightBracketIdx + 1);

//   return unbracketizeTokens([
//     ...firstChunkTokens,
//     chunkTokens,
//     ...restChunkTokens,
//   ]);
// };

/**
  tokens: [
    '(', '1', '+', '2', '*',
    '3', '+', '(', '4', '+',
    '(', '5', '+', '6', ')',
    ')', '*', '6', ')'
  ]
 */
const nestifyTokens = (tokens) => {
  if (!Array.isArray(tokens)) {
    return tokens;
  }
  

  const lastOperatorIdx = tokens.findLastIndex(token => {
    return token.match(/[\+\-\*\/]/)
  })
  const lastOperator = tokens[lastOperatorIdx];  
}

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);

  // // step-02: unbracket tokens
  // const unbracketedTokens = unbracketizeTokens(tokens);
  // console.log('unbracketedTokens:', JSON.stringify(unbracketedTokens, null, 2));
  
  // // step-03: nestifyTokens with priority
  // const nestedTokens = nestifyTokens(unbracketedTokens);
  
  console.log('tokens:', tokens);
  // console.log('nestedTokens:', JSON.stringify(nestedTokens, null, 2));
  // console.log('source:', source);
}
