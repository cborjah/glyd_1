module.exports = {
    "extends": [
      "airbnb",
      "plugin:jsx-a11y/recommended",
      "prettier",
      "prettier/react"
    ],
    "plugins":["jsx-a11y"],
    "parser": "babel-eslint",
    "rules": {
      "react/jsx-filename-extension": 0,
      "no-use-before-define": 0,
      "consistent-return": 0,
      "arrow-body-style": 0,
      "no-console": 0,
      "no-undef": 0
    }
};
