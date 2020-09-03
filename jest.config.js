module.exports = {
  verbose: true,
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    "utils/*.js", "lib/*.js",
  ],
  transform: {
    "^.+\\.[jt]s?$": "babel-jest"
  },
  testPathIgnorePatterns: [
    "<rootDir>/utils/__tests__/code/", "<rootDir>/node_modules/", "<rootDir>/demo/"
  ],
  modulePathIgnorePatterns: ["<rootDir>/build/"]
};
