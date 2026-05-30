import { tokenizeSource } from './lib.mjs';

const source = '1 + 2 * 3 + 4 + 5 * 6 + 7 + 8 * 9';

/*
 * Nestify flatten tokens array
 * 1 + 2 * 3 + 4 + 5 * 6
 * =>
 * [[[1 + [2 * 3]] + 4] + [5 * 6]]
 */
export const nestifyTokens = (tokens) => {
  if (!Array.isArray(tokens)) {
    return tokens;
  }

  const lastOperatorIdx = tokens.findLastIndex(token => token.match(/[\+\-\*\/]/))
  const lastOperator = tokens[lastOperatorIdx];

  switch (lastOperator) {
    case '*':
    case '/': {
      return [
        nestifyTokens(tokens.slice(0, tokens.length - 4)),
        tokens[tokens.length - 4],
        [
          nestifyTokens(tokens[tokens.length - 3]),
          lastOperator,
          nestifyTokens(tokens[tokens.length - 1]),
        ]
      ]
    }
    case '+':
    case '-': {
      return [
        nestifyTokens(tokens.slice(0, lastOperatorIdx)),
        lastOperator,
        nestifyTokens(tokens[tokens.length - 1]),
      ]
    }
  }
}

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);
  // step-02: nestifyTokens with priority
  const nestedTokens = nestifyTokens(tokens);

  console.log('source:', source);
  console.log('tokens:', tokens);
  console.log('nestedTokens:', JSON.stringify(nestedTokens, null, 2));
}
