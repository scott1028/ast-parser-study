import { tokenizeSource, findParenthesesRange } from './lib02.mjs';
// import { nestifyTokens as baseNestifyTokens } from './level-01.mjs';
// import { findBracket, unBracket } from './level-02-find-bracket.mjs';

// diagram:     |       |            |         |    |       |    |     ||   |
const source = '1 + 2 * (3 + 4 * 2 + (5 + 6 + 7) * 8) * 6 + ((6 + ((7)) + 8) * 9) + ((9 * 8 + 7)) * 6';

/**
  tokens: [
    '(', '1', '+', '2', '*',
    '3', '+', '(', '4', '+',
    '(', '5', '+', '6', ')',
    ')', '*', '6', ')'
  ]
 */
const removeTokensParentheses = (tokens) => {
  const foundParenthesesRange = findParenthesesRange(tokens);

  if (!foundParenthesesRange) {
    // tip: make [[7 + 8]] => [7 + 8]
    if (tokens.length === 1) {
      return tokens[0]
    }

    return tokens;
  }

  return removeTokensParentheses([
    ...tokens.slice(0, foundParenthesesRange[0]),
    removeTokensParentheses(tokens.slice(foundParenthesesRange[0] + 1, foundParenthesesRange[1])),
    ...tokens.slice(foundParenthesesRange[1] + 1),
  ])
}

const nestifyTokens = (tokens) => {
  // wip
}

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);

  // step-02: unbracket tokens
  const removedParenthesesTokens = removeTokensParentheses(tokens);
  
  // step-03: nestifyTokens with priority
  // const nestedTokens = nestifyTokens(unbracketedTokens);
  
  console.log('tokens:', tokens);
  console.log('removedParenthesesTokens:', JSON.stringify(removedParenthesesTokens, null, 2));
  // console.log('nestedTokens:', JSON.stringify(nestedTokens, null, 2));
  console.log('source:', source);
}
