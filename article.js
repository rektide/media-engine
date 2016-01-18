export default function({ Plugin, types: t }) {
	console.log("TYPES", types)
	return new Plugin("media-engine-article", {
		visitor: {
			EmptyStatement(node, file) {
				console.log("empty", node)
			},
			Program(path, file) {
				console,log("pFOO", this)
				console.log("pBAR", path)
				console.log("pBAZ", file)
			},
			FunctionExpression(node, parent) {
				console.log("fFOO", this)
				console.log("fBAR", node)
				console.log("fBAZ", parent)
			}
		}
	})
}
