var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');
var cssmodulesify = require('css-modulesify');

if (process.argv.length < 5) {
    // exit if no arguments specified
    console.error('invalid argument.');
    return;
}

// browserify entry point filepath
const entryFile = process.argv[2];

// browserify output filepath

const outputFile = process.argv[3];

// CSS modules output filepath
const cssFile = process.argv[4];

var b = browserify({
    entries: [entryFile],
    cache: {},
    packageCache: {},
});

b.plugin(watchify);
b.plugin(cssmodulesify, {
    rootDir: path.resolve(__dirname, "../src/views"),
    output: cssFile,
});
const bundle = bundler(b);
b.on('update', bundle);
b.on('log', msg => {
    const date = new Date();
    console.log(`${date.toString()}: ${msg}`);
});

bundle(); // run first

function bundler(b)
{
    return () => 
        b
            .bundle()
            .on('error', e => console.error(e.toString()))
            .pipe(fs.createWriteStream(outputFile))
}
