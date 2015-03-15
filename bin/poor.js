#!/usr/bin/env node

var program = require('commander')
var bParser = require('wd-browser')
var pkg = require('../package.json')
var _ = require('lodash')
var stdin = require('stdin')
var only = require('only')
var poor = require('../')
require('vvv')

program
	.version(pkg.version)
	.option('-b, --browsers <browsers>', 'use sauce labs tests, e.g. ie:6..8,android,chrome:stable..', parseBrowser)
	.option('-R, --reporter [value]', 'mocha reporter, default is spec')
	.option('-u, --ui [value]', 'mocha ui like bdd, tdd')
	.option('--timeout [value]', 'mocha async timeout', parseInt)
	.option('--shim [value]', 'if use es-shim, default is true', Boolean)
	.option('--title [value]', 'web page title', Boolean)
	.option('--url [value]', 'test on url')
	.option('-v, --verbose', 'verbose', _.noop, 0)
	.parse(process.argv)

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
	log.v('options: %j', opt)

	poor(str, opt, function(err, ret) {
		if (err) {
			return console.error(err)
		}
		if (ret && !ret.hasFailed) {
			process.exit(0)
		} else {
			process.exit(1)
		}
	})
})
