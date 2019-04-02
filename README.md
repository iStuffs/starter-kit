# Futark **:style**
![](docs/images/futhark-logo.png)

**Featues**:


-   Sass variable system (prefixed variables + sass map + getter function)
    -   Color System
    -   Animation defaults
    -   Border defaults
    -   Icons
-   Function utilities
    -   for lists
    -   for maps
    -   for numbers
    -   validator
-   Minilalist grid system (with flexbox)
-   Usefull mixins: (aspect-ratio, hover, media-query, triangle, text-ellipis)
-   Includes third party
    -   reset ([Normalize-css](https://necolas.github.io/normalize.css/))
    -   [Animate.css](https://daneden.github.io/animate.css/)
    -   [Bourbon](https://www.bourbon.io/)
-   Easy import
    -   for gulp (with [eyeglass](https://github.com/linkedin/eyeglass/tree/master/packages/eyeglass#readme))
-   Icon system (works great with [icomoon](https://icomoon.io/))


**The SASS folder structure**:

```
sass/
├── helpers/
│   ├── _variables.scss
│   ├── _bourbon.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   └── ...
├── layout/
│   ├── _footer.scss
│   ├── _global.scss
│   └── _header.scss
└── style.sass
```

Sass Documentation : https://istuffs.github.io/starter-kit/

## Installation

```shell
npm i -S @futark:style
```

## How to use

Import in your build tool or Bundler

1. Webpack

2. Gulp (with eyeglass)

3.  Gulp (with include-path)
