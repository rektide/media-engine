"use strict"

const promisify= require("es6-promisify")
const
  _= require("lodash"),
  env2prop= require("env2prop"),
  glob= promisify(require("glob")),
  xdgBasedir= require("xdg-basedir"),
  stringTemplate= require("string-template")


const env = env2prop(process.env)

const defaultContext = env.mediaContext || "mediaengine"

const envMediaEngines = env.mediaEngines && env.mediaEngines.length && env.mediaEngines.split(":")
const defaultMediaEngines = envMediaEngines || [
	"${config}/${context}/views/*.js",
	"${cwd}/views/*.js"
];

export const defaults = {
	context: defaultContext,
	mediaEngines: defaultMediaEngines
}

export default function Finder( opts){
	opts= opts|| {}
	_.defaultsDeep( opts, defaults)
	const params= {
		configDir: xdgBasedir.config,
		context: opts.context,
		cwd: process.cwd()
	}
	const pathMatches= opts.mediaEngines.map(function( raw){
		const interpolated= stringTemplate( raw, params)
		return glob( interpolated)
	})
	const paths= Promise.all( pathMatches).then( function(){
		return _.concat.apply( _, arguments)
	})
	return paths
}

export const main= function main(){
	Finder().then(function( paths){
		console.log( "paths:")
		console.log( paths)
	})
}

if(require.main === module){
	main()
}
