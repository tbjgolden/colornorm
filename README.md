# `colornorm`

[![npm version](https://img.shields.io/npm/v/colornorm.svg?style=flat-square)](https://www.npmjs.com/package/colornorm)
[![test coverage](https://img.shields.io/badge/dynamic/json?style=flat-square&color=brightgreen&label=coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Funpkg.com%2Fcolornorm%2Fcoverage%2Fcoverage-summary.json)](https://www.npmjs.com/package/colornorm)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tbjgolden/colornorm/Release?style=flat-square)](https://github.com/tbjgolden/colornorm/actions?query=workflow%3ARelease)

> **PostCSS plugin for normalizing colors**

Convert different syntaxes to a single one.

Useful for de-duplicating colors, and standardizing a stylesheet on one color
syntax.

You may assume that the same input color will map the same output color,
regardless of input syntax.

Invalid color syntax returns null. Global values ("inherit", "initial", "unset")
also return null.

## Usage

```js
const colornorm = require('colornorm')

// Any crazy valid CSS color you can think of
const inputs = [
  'red',
  'RED',
  '#f00',
  '#ff0000',
  '#ff0000ff',
  'rgb(255,0,0)',
  'rgb(255 0 0)',
  'rgba(255, 0, 0, 1)',
  'rgb(255 0 0 / 1)',
  'hsl(0, 100%, 50%)',
  'hsla(0, 100%, 50%, 1)'
  // hwb, cmyk, lab, lch inputs also supported
]

const outputs = inputs.map((input) => colornorm(input))
// all are 'hsl(0 100% 50%)'

// output styles: 'hsl' (default as most human friendly widely adopted format), 'hwb', 'lab', 'lch', 'cmyk', 'rgb', 'hex'
const outputs = inputs.map((input) => colornorm(input, 'hex'))
// all are '#f00'
```

## Installation

```sh
npm install colornorm --save
# yarn add colornorm
```

Alternatively, there are also client web builds available:

<!-- IMPORTANT: Do not delete or change the comments in the code block below -->

```html
<!-- Dependencies -->

<!-- window.ColorNorm -->
<script src="https://unpkg.com/colornorm/dist/colornorm.umd.js"></script>
```

## Documentation

- [`Docs`](docs)
- [`API`](docs/api)

## License

MIT

<!-- Original starter readme: https://github.com/tbjgolden/create-typescript-react-library -->
