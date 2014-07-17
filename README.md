[![view on npm](http://img.shields.io/npm/v/jsdoc-to-markdown.svg)](https://www.npmjs.org/package/jsdoc-to-markdown)
[![npm module downloads per month](http://img.shields.io/npm/dm/jsdoc-to-markdown.svg)](https://www.npmjs.org/package/jsdoc-to-markdown)
[![Build Status](https://travis-ci.org/75lb/jsdoc-to-markdown.svg?branch=master)](https://travis-ci.org/75lb/jsdoc-to-markdown)
[![Dependency Status](https://david-dm.org/75lb/jsdoc-to-markdown.svg)](https://david-dm.org/75lb/jsdoc-to-markdown)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-32/jsdoc-to-markdown/README.md?pixel)

***work in progress, unstable, draft documentation***

#jsdoc-to-markdown
[jsdoc](http://usejsdoc.org) documented source code in, markdown out.

Essentially, this app connects the output of [jsdoc-parse](https://github.com/75lb/jsdoc-parse) to the input of [dmd](https://github.com/75lb/dmd). 

##Synopsis
write documented code:
```js
/**
a quite wonderful function
@param {object} - privacy gown
@param {object} - security
@returns {survival}
*/
function protection(cloak, dagger){}
```

get markdown docs: 
```
$ jsdoc2md example/function.js

#protection(cloak, dagger)
a quite wonderful function

**Params**

- cloak `object` - privacy gown
- dagger `object` - security

**Returns**: `survival`
```

these commands achieve the same result: 
```sh
$ cat example/function.js | jsdoc2md
$ cat example/function.js | jsdoc-parse | dmd
$ jsdoc-parse example/function.js | dmd
```

##Examples
These projects have readme files rendered by `jsdoc2md`:
* [handbrake-js](https://github.com/75lb/handbrake-js) (exports an object with inner class)
* [array-tools](https://github.com/75lb/array-tools) (exports a object)
* [file-set](https://github.com/75lb/file-set) (exports a class)
* [command-line-args](https://github.com/75lb/command-line-args)  (exports a class)

##Usage
Document your source code using [correct jsdoc syntax](http://usejsdoc.org), then run it through `jsdoc2md`.

###Command-line tool
Install `jsdoc2md` globally:
```sh
$ npm install -g jsdoc-to-markdown
```

Options:
```
$ jsdoc2md -h

  jsdoc-to-markdown
  Markdown API documentation generator, good for Github projects

  Usage
  $ jsdoc2md [<options>] <source_files>
  $ cat <source_files> | jsdoc2md [<options>]

  --src <array>             A list of javascript source files or glob expressions
  -t, --template <string>   A custom handlebars template to insert the rendered documentation into
  -j, --json                Output the parsed jsdoc data only
  -v, --verbose             More verbose error reporting
  -h, --help                Print usage information
  --private                 Include symbols marked @private in the output
  -s, --stats               Print a few stats about the doclets parsed.
  --heading-depth <number>  root heading depth to begin the documentation from, defaults to 1 (`#`).
  -p, --plugin <array>      Use an installed package containing helper and/or partial overrides
  --helper <array>          handlebars helper files to override or extend the default set
  --partial <array>         handlebars partial files to override or extend the default set
```

Some typical use cases: 

```sh
$ # dump everything you have in a single file
$ jsdoc src/**/*.js > api.md
```

```sh
$ # split into separate files
$ jsdoc src/main-module.js > main-module.md
$ jsdoc src/important-class.js > important-class.md
```

```sh
$ # embed documentation in your README.md
$ jsdoc src/**/*.js --template readme.hbs > README.md
```

###Bundled with your project
####As an `npm run` task
```sh
$ npm install jsdoc-to-markdown --save-dev
```

Then add a `docs` build script to your `package.json`, e.g.:
```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "scripts": {
    "docs": "jsdoc2md lib/*.js > api.md"
  }
}
```
Docs are generated like so:

```sh
$ npm run docs
```

####As a grunt plug-in
See [grunt-jsdoc-to-markdown](https://github.com/75lb/grunt-jsdoc-to-markdown).

####As a gulp plug-in
Use a task like this until the gulp plugin is ready, you should only need to edit `src` and `outputFile`: 

```js
var jsdoc2md = require("jsdoc-to-markdown");
var gutil = require("gulp-util");
var fs = require("fs");

gulp.task("docs", function(done){
    var src = "lib/**/*.js";
    var outputFile = "api.md";
    gutil.log("writing documentation to " + outputFile);
    jsdoc2md.render(src).pipe(fs.createWriteStream(outputFile));
});
```

###Library
**Example**  

```js
var jsdoc2md = require("jsdoc-to-markdown");
```

<a name="module_jsdoc-to-markdown.render"></a>
####jsdoc2md.render(src, options)
Transforms jsdoc into markdown documentation

**Params**

- src `string` | `Array.<string>` - The javascript source file(s) - required.
- options `object` - The render options
  - [private] `boolean` - Include symbols marked @private in the output
  - [json] `boolean` - Return the JSON template data only
  - [stats] `boolean` - Return stats about the doclets parsed
  - [template] `string` - A handlebars template to insert your documentation into.
  - [helper] `string` | `Array.<string>` - Helper overrides
  - [partial] `string` | `Array.<string>` - Partial overrides
  - [plugin] `string` | `Array.<string>` - Packages containing helper and/or partial overrides
  - [heading-depth] `number` - Root heading depth, defaults to 2.

**Returns**: `stream` - A readable stream containing the rendered markdown  
**Example**  
this code:
```js
> jsdoc2md.render("lib/*.js").pipe(process.stdout);
```
generates:
```markdown
#jsdoc-to-markdown
**Members**
[jsdoc2md.render(sourceFiles, options)](#module_jsdoc-to-markdown.render)
[jsdoc2md.createRenderStream(options)](#module_jsdoc-to-markdown.createRenderStream)

<a name="module_jsdoc-to-markdown.render"></a>
##jsdoc2md.render(sourceFiles, options)
Renders the jsdoc documentation from the specified source files as markdown.
**Params**

- sourceFiles `string` | `Array.<string>` - The javascript source file(s) - required.
- options `object` - The render options
  - [template] `string` - A handlebars template to insert your documentation into.
  - [json] `boolean` - Return the JSON template data only
  - [stats] `boolean` - Return a few stats about the doclets parsed
  - [private] `boolean` - Include symbols marked @private in the output
  - [heading-depth] `number` - Root heading depth, defaults to 1.
**Returns**: `stream` - A readable stream containing the rendered markdown

etc.
etc.
```


