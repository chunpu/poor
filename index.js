var browserMocha = require('browser-mocha')
var async = require('async')
var _ = require('lodash')

module.exports = exports = Poor

function Poor(str, opt, cb) {
	if ('function' == typeof opt) return Poor(str, {}, opt)
	opt = opt || {}
	var arr
	if (opt.browsers && opt.browsers.length) {
		// saucelabs
		arr = opt.browsers.map(function(browser) {
			var ret = _.extend({}, opt, {
				  browser: browser
				, script: str
				, sauceLabs: true
			})
			return ret
		})
	} else {
		// phantomjs
		arr = [_.extend({}, opt, {
			script: str
		})]
	}
	
	async.mapLimit(arr, 3, bmWrap, function(err, ret) {
		if (err) return cb(err)
		var hasFailed = ret.some(function(item) {
			return item.failures > 0
		})
		ret = {
			results: ret,
			hasFailed: hasFailed
		}
		cb(null, ret)
	})
}

function bmWrap(opt, cb) {
	browserMocha(opt, function(err, ret) {
		if (err) return cb(err)
		printBrowser(ret.session.browser)
		browserMocha.print(ret.logs)
		cb(null, ret)
	})
}

function printBrowser(browser) {
	console.log('%s@%s %s', browser.name, browser.version, browser.platform)
}
