module.exports = [
  {
    input: [1],
    output: [
      "()"
    ]
  },
  {
    input: [2],
    output: [
      "(())",
      "()()"
    ]
  },
  {
    input: [3],
    output: [
      "((()))",
      "(()())",
      "(())()",
      "()(())",
      "()()()"
    ]
  }
];