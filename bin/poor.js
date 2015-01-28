#!/usr/bin/env node

var program = require('commander')
var bParser = require('wd-browser')
var pkg = require('../package.json')
var _ = require('lodash')
var stdin = require('stdin')
var only = require('only')
var poor = require('../')

program
	.version(pkg.version)
	.option('-b, --browsers <browsers>', 'use sauce labs tests, e.g. ie:6..8,android,chrome:stable..', parseBrowser)
	.option('-R, --reporter [value]', 'mocha reporter, default is spec')
	.option('-u, --ui [value]', 'mocha ui like bdd, tdd')
	.option('--timeout [value]', 'mocha async timeout', parseInt)
	.option('--shim [value]', 'if use es-shim, default is true', Boolean)
	.option('--title [value]', 'web page title', Boolean)
	.parse(process.argv)

//console.log(program)

function parseBrowser(val) {
	val = val || ''
	var browsers = val.split(/ *, */).map(bParser)
	browsers = _.flatten(browsers)
	return browsers
}

stdin(function(str) {
	var params = program.options.map(function(opt) {
		return opt.long.replace(/^--/, '')
	}).join(' ')
	var opt = only(program, params)
	poor(str, opt, function(err, ret) {
		if (!err && ret && !ret.hasFailed) {
			process.exit(0)
		} else {
			process.exit(1)
		}
	})
})
