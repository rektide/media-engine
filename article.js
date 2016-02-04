import * as t from "babel-types"
import * as ModuleAst from "./module-ast"

import util from "util"

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
				  mod= ModuleAst.program.body,
				  bod= mod[0].expression.right.body.body,
				  ret= bod[bod.length-1],
				  arr= t.arrayExpression(returnIdentifiers)
				ret.argument= arr
				path.node.body.push.apply(path.node.body, mod)
			}
		}
	}
}
