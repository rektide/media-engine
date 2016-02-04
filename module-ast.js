import * as babylon from "babylon"

function ast(){
	var
	  module= require("./module").toString(),
	  i= module.indexOf("{")
	module= module.substring(i + 1, module.length - 1)
	module= babylon.parse(module)
	return module
}

module.exports= ast()

if(require.main === module){
	var inspect= require("util").inspect
	console.log(inspect(module.exports.program, {depth:null}))
}
