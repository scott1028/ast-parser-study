# AST Parser Study

This is a small learning project for exploring how a simple expression parser can be built step by step in JavaScript.

The current example focuses on:

- Tokenizing a string expression into a flat token list
- Grouping tokens into a nested structure
- Handling basic operator precedence for `*`, `/`, `+`, and `-`
- Printing the parsed result so the transformation is easy to inspect

## Purpose

This repository is intended for study and experimentation. It is not a production parser, compiler, or general-purpose AST library.

The goal is to make the parsing process visible and approachable, starting from a small arithmetic expression and gradually transforming it into a structured representation.

## Run

```bash
node level-01.js
```

## Current Example

`level-01.js` starts from a source expression:

```js
1 + 2 * 3 + 4 + 5 * 6 + 7 + 8 * 9
```

It then:

1. Removes spaces and tokenizes the expression.
2. Builds a nested token structure based on operator precedence.
3. Logs the result to the console.

## Notes

This project intentionally keeps the code small and direct so it can be used as a learning reference. Future levels may add more parser features, validation, or AST node types.

## Data Diagram
```
1 + 2 * 3 + 4 * 5

# step-1: meet + and then number 2
  +
 / \
1   2

# step-2: meet * and then number 3
  +
 / \
1   *     <--
   / \
  2   3

# step-3: meet + and then number 4
     +    <--
    / \
   /   \
  +     4
 / \
1   *
   / \
  2   3

# step-4: meet * and then number 5
     +
    / \
   /   *    <--
  +   / \
 / \ 4   5
1   \
     *
    / \
   2   3
...
```
