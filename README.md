# Futark **:style**
![](docs/img/futhark-logo.png)

**Featues**:

-   Sass map for variables
-   Color System
-   Animation defaults
-   Function utilities
-   Usefull mixins: (aspect-ratio, hover, triangle, text-ellipis)
-   Includes reset (boostrap-reboot, normalize-css)
-   Easy import with eyeglass

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
