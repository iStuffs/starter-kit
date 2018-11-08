# Front-end **Starter Kit**
![](docs/img/starter-kit_header.png)
A npm / gulp kick start template for fast and modern front-end development.

**Featues**:

-   Sass compilation with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
-   Es6 transpilation with [babel-loader](https://www.npmjs.com/package/babel-loader)
-   JavaScript exports with [webpack](https://webpack.js.org/)
-   Auto-refresh browser with [browser sync](https://www.npmjs.com/package/browser-sync)
-   [Source maps](https://www.npmjs.com/package/gulp-sourcemaps) in dev mode
-   Minification in production ([Clean CSS](https://www.npmjs.com/package/gulp-clean-css) and [Uglify](https://www.npmjs.com/package/gulp-uglify))
-   Autoprefix CSS with [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
-   Better errors message in gulp with [Plumber](https://www.npmjs.com/package/gulp-plumber) and [Notify](https://www.npmjs.com/package/gulp-notify)
-   Compress images with [Image min](https://www.npmjs.com/package/gulp-imagemin)

**The SASS folder structure**:

```
sass/
├── base/
│   ├── _reset.sass
│   └── _typography.sass
├── helpers/
│   ├── _mixins.sass
│   └── _variables.sass
├── layout/
│   ├── _footer.sass
│   ├── _global.sass
│   └── _header.sass
└── style.sass
```

## What you need ?

You first need to have [node.js](https://nodejs.org/en/) installed.
You should use [git](https://git-scm.com/) with your project.

## How to use

1. Clone it
```bash
git clone https://github.com/iStuffs/starter-kit.git my-new-project
```

2. Update your github user in the package.json
```json
...
"gitUser": "Your-GitHubUserName",
...
```

3. kickstart your project
```bash
cd my-new-project
npm run starter
```

4. Develop awesome things
```bash
npm start
```

5. Build assets for production
```bash
npm run build
```

6. Deploy on git hub pages
```bash
npm run deploy
```
