import babel from "babel-core"
import traverse from "babel-traverse"
import babylon from "babylon"
import quasilion from "quasilion"
import util from "util"

import * as _quasilon from "quasilon"


export default function({ options}){
	return {
		visitor: {
			Program(path){
				
			}
		}
	}
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
