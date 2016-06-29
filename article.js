var
  babel = require("babel-core"),
  traverse = require("babel-traverse"),
  babylon = require("babylon"),
  quasilon = require("quasilon"),
  util = require("util")



export default function( opts){
	var finder= finder( opts)
	return new Promise( function( resolve, reject){
		return {
			visitor: {
				Program(path){
				}
			}
		}
	})
}

export default function({ options }) {
	//var t = options.types
	return {
		visitor: {
			Program(path, file) {

				var returnIdentifiers= []
				for(var i= 0; i< path.node.body.length; ++i){
					var
					  node= path.node.body[i]
					if(!t.isExpressionStatement(node)){
						continue
					}
					var
					  uid= path.scope.generateUidIdentifier("captureMe"),
					  declarator= t.variableDeclarator(uid, node.expression),
					  declaration= t.variableDeclaration("const", [declarator])
					path.node.body[i]= declaration
					returnIdentifiers.push(uid)
				}

				var
				  arr= t.arrayExpression(returnIdentifiers),
				  val= quasilon`
					module.exports= function(){
						${path.node.body}
						return ${arr}
					}`
				path.node.body= val.ast.program.body
			}
		}
	}
}
