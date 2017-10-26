module.exports = {
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  extends: 'react',
  extends: 'hackreactor',
  "env": {
    // I write for browser
    "browser": true,
    // in CommonJS
    "node": true
  },
  rules: {
    // Rules here will override the 'hackreactor' configuration
    // http://eslint.org/docs/rules/
  }
};
