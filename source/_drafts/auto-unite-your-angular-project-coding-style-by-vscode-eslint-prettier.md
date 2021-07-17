---
title: auto-unite-your-angular-project-coding-style-by-vscode-eslint-prettier
tags:
---

## Steps

### Setup Angular and ESLint

```sh
ng add @angular-eslint/schematics
```

### Setup ESLint with Airbnb's config

```sh
npm install --save-dev eslint-config-airbnb-typescript
```

Update `eslintrc.json`

```json
{
  "overrides": [
    {
      "extends": [
        "airbnb-typescript", // add this line
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ]
    }
  ]
}
```

### Setup ESLint and Prettier

```sh
npm install --save-dev \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

Create `.prettierrc.json`

```json
{
  "singleQuote": true,
  "jsxBracketSameLine": true
}
```

Update `eslintrc.json`

```json
{
  "overrides": [
    {
      "extends": [
        "airbnb-typescript",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended" // add this line
      ]
    }
  ]
}
```

### Setup vscode config

Create or update `extensions.json`

```json
{
  "recommendations": [
    "esbenp.prettier-vscode", // add this line
    "dbaeumer.vscode-eslint" // add this line
  ]
}

```

Create or update `settings.json`

```json
// add all these config
{
  "files.eol": "\n",
  "editor.formatOnSave": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "html"],
  "eslint.options": {
    "extensions": [".js", ".ts", ".html"]
  }
}
```

## Refs

ng + eslint

- <https://github.com/angular-eslint/angular-eslint>

eslint + airbnb-typescript

- <https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#eslint-configs>

eslint + prettier

- <https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#usage-with-prettier>
- <https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21>
- <https://github.com/prettier/eslint-plugin-prettier#recommended-configuration>
