---
title: Unite Your Angular Coding Style With Teammates By Visual Studio Code & ESLint & Prettier
date: 2021-07-21 22:39:19
thumbnail: unite-your-angular-coding-style-with-teammates-by-vscode-and-eslint-and-prettier/logo.png
categories:
  - 技術文章
tags:
  - angular
  - vscode
  - eslint
  - prettier
  - linter
  - formatter
  - coding style
toc: true
---

{% asset_img logo.png %}

## Brief

Hello Visitor ~

Todays I will guide you to setup Visual Studio Code and ESLint and Prettier, let editor auto-format and auto-fix your code for you and your coworker or contributor, it will becomes your lifesaver, free your hands on fixing errors and align coding style with teammates.

Let me read those documents, and organize things for you.

## Steps

There are only 3 steps for you, it is very easy to follow my steps to set everything up

1. Setup Angular and ESLint
2. Integrate Prettier and ESLint
3. Setup Visual Studio Code

<!-- more -->

### Setup Angular and ESLint

For Angular project which started at Angular 12

```sh
ng add @angular-eslint/schematics
```

> If your Angular project was started at Angular 11 or belows, you should read and follow this [link](https://github.com/angular-eslint/angular-eslint#quick-start-with-angular-before-v12)


### Integrate Prettier and ESLint

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

### Setup Visual Studio Code

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

### (Optional)Apply Airbnb's TypeScript coding style to ESLint

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

## References

### ng + eslint

- <https://github.com/angular-eslint/angular-eslint>

### eslint + airbnb-typescript

- <https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#eslint-configs>

### eslint + prettier

- <https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#usage-with-prettier>
- <https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21>
- <https://github.com/prettier/eslint-plugin-prettier#recommended-configuration>
