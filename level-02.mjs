import { tokenizeSource } from './lib.mjs';
import { nestifyTokens as baseNestifyTokens } from './level-01.mjs';
import { findBracket } from './level-02-find-bracket.mjs';

// diagram:     |       |            |         |    |       |    |     ||   |
const source = '1 + 2 * (3 + 4 * 2 + (5 + 6 + 7) * 8) * 6 + (7 * (8 + 9)) * 9';

const groupTokens = (tokens) => {
  const [leftBracketIdx, rightBracketIdx] = findBracket(tokens);

  // recursive terminal condition
  if (leftBracketIdx === -1 && rightBracketIdx === -1) {
    console.log('debug:', tokens);
    return tokens;
  }

  const chunkTokens = tokens.slice(leftBracketIdx + 1, rightBracketIdx);
  const restChunkTokens = tokens.slice(rightBracketIdx + 1);

  return groupTokens([
    ...tokens.slice(0, leftBracketIdx),
    groupTokens(chunkTokens),
    ...restChunkTokens,
  ]);
};

if (import.meta.main) {
  // step-01: make string expression to token expression arrays
  const tokens = tokenizeSource(source);

  // step-02: unbracket tokens
  const groupedTokens = groupTokens(tokens);

  // step-03: nestifyTokens with priority
  // const nestedTokens = baseNestifyTokens(groupedTokens);

  console.log('source:', source);
  console.log('tokens:', tokens);
  console.log('groupedTokens:', JSON.stringify(groupedTokens, null, 2));
}
