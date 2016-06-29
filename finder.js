"use strict"

var
  _ = require("lodash"),
  promisify = require("es6-promisify"),
  glob = promisify(require("glob")),

module.exports.defaults = function(){
	return {
		engines: "MEDIA_ENGINES",
		context: _.defaults({}, process.env, {
			"MEDIA_ENGINES": "${HOME}/.config/media-engine/views/*.js:${CWD}/views/*.js"
		})
	}
}


export default function Finder( opts){
	opts= opts|| {}
	_.defaultsDeep( opts, defaults.default())
	var paths= opts.context[ opts.engines].split( /:/)

	var state= {}
	var loaded= new Promise( function( resolve){
		var _loaded= paths.map(function( path){
			var matches= glob( path)
			if( !opts.oneshot){
				
			}
			return matches
		})
		return Promise.all(_loaded).then(function(){
			found
		})
	})

	var map={
		get: function( key){
			var current= state[ key]
			if( current!== undefined){
				return Promise.resolve( current)
			}
			return done.then( arguments.callee)
		}
	}
	return { map, loaded}
}

export const main= function main(){
	var
	  argv= arguments.length> 0? arguments: process.argv.splice(2)
	for(var i in argv){
	}
}
