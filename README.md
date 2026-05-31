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

## Data algorithm diagram
```
# read left to right by for-loop
1 + 2 * 3 + 4 * 5

# step-01: meet + and then number 2
  +         <-- cursor here
 / \
1   2

# step-02: meet * and then number 3
  +
 / \
1   *       <-- cursor here
   / \
  2   3

# step-03: meet + and then number 4 (*Rebuild whole root tree by moving original data to left bottom)
     +      <-- cursor here
    / \
   /   \
  +     4
 / \
1   *
   / \
  2   3

# step-04: meet * and then number 5
     +
    / \
   /   *    <-- cursor here
  +   / \
 / \ 4   5
1   \
     *
    / \
   2   3
...
```

## Data algorithm diagram with parentheses
```
# read left to right by for-loop
1 + 2 * (3 + 4) * 5

# step-00: meet 1
 null       <-- cursor here
 / \
1  null

# step-01: meet +
  +         <-- cursor here
 / \
1  null

# step-02: meet number 2
  +         <-- cursor here
 / \
1   2

# step-03: meet *
  +
 / \
1   *       <-- cursor here
   / \
  2  null

# step-04: meet "("
  +
 / \
1   *
   / \
  2  null   <-- cursor here
     /  \
   null null

# step-05: meet number 3
  +
 / \
1   *
   / \
  2  null   <-- cursor here
     /  \
    3   null

# step-06: meet +
  +
 / \
1   *
   / \
  2   +     <-- cursor here
     /  \
    3   null

# step-07: meet 4
  +
 / \
1   *
   / \
  2   +     <-- cursor here
     /  \
    3    4

# step-08: meet ")"
  +
 / \
1  null     <-- cursor here
   / \
  *  null
 / \
2   +
   /  \
  3    4

# step-09: meet *
  +
 / \
1   *       <-- cursor here
   / \
  *  null
 / \
2   +
   /  \
  3    4

# step-10: meet 5
  +
 / \
1   *       <-- cursor here
   / \
  *   5
 / \
2   +
   /  \
  3    4

...
```
