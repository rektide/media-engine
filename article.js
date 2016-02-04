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
				  modExp= t.memberExpression(t.identifier("module"), t.identifier("exports")),
				  block= [t.returnStatement(t.arrayExpression(returnIdentifiers))],
				  fn= t.functionExpression(null, [], t.blockStatement(block)),
				  assign= t.assignmentExpression("=", modExp, fn),
				  expr= t.expressionStatement(assign)
				block.unshift.apply(block, path.node.body)
				path.node.body= [expr]

			}
		}
	}
}
