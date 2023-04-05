//CANVAS
class Canvas {
	//CONSTRUCTOR
	constructor({ id }) {
		this.id = id
		this.canvas = this.getCanvasElement()
		this.gl = this.getWebGLContext()
	}

	//GET CANVAS ELEMENT
	getCanvasElement() {
		const canvas = document.getElementById(this.id)
		return canvas
	}

	//GET WEBGL CONTEXT
	getWebGLContext() {
		const gl = this.canvas.getContext("webgl2")
		this.canvas.style.width = "100vw"
		this.canvas.style.height = "100vh"
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT)
		return gl
	}
}

//PROGRAM
class Program {
	//CONSTRUCTOR
	constructor({ gl, vertexShaderSourceCode, fragmentShaderSourceCode }) {
		this.gl = gl
		this.vertexShaderSourceCode = vertexShaderSourceCode
		this.fragmentShaderSourceCode = fragmentShaderSourceCode
		this.vertexShader = this.compileShader("vertex", this.vertexShaderSourceCode)
		this.fragmentShader = this.compileShader("fragment", this.fragmentShaderSourceCode)
		this.program = this.linkProgram()
	}

	//COMPILER SHADER BASED ON TYPE
	compileShader(type, source) {
		let shaderType
		if (type === "vertex") {
			shaderType = this.gl.VERTEX_SHADER
		} else if (type === "fragment") {
			shaderType = this.gl.FRAGMENT_SHADER
		}

		const shader = this.gl.createShader(shaderType)
		this.gl.shaderSource(shader, source)
		this.gl.compileShader(shader)
		const shaderCompileSuccess = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)
		if (shaderCompileSuccess) {
			return shader
		} else {
			console.error(this.gl.getShaderInfoLog(shader))
			this.gl.deleteShader(shader)
		}
	}

	//LINK PROGRAM FROM COMPILED SHADERS
	linkProgram() {
		const program = this.gl.createProgram()
		this.gl.attachShader(program, this.vertexShader)
		this.gl.attachShader(program, this.fragmentShader)
		this.gl.linkProgram(program)
		const linkProgramSuccess = this.gl.getProgramParameter(program, this.gl.LINK_STATUS)
		if (linkProgramSuccess) {
			return program
		} else {
			console.error(this.gl.getProgramInfoLog(program))
			this.gl.deleteProgram(program)
		}
	}
}

//EXPORTS
export { Canvas, Program }
