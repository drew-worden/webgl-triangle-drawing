//IMPORTS
import { Canvas, Program } from "./utilities.js"

//CREATE CANVAS
const { gl } = new Canvas({ id: "canvas" })

//VERTEX SHADER SOURCE CODE (GLSL)
const vertexShaderSourceCode = `#version 300 es

in vec4 position;

void main() {
  gl_Position = position;
}`

//FRAGMENT SHADER SOURCE CODE (GLSL)
const fragmentShaderSourceCode = `#version 300 es

precision highp float;
 
out vec4 color;
 
void main() {
  color = vec4(1, 0, 0, 1);
}`

//CREATE PROGRAM
const { program } = new Program({ gl, vertexShaderSourceCode, fragmentShaderSourceCode })

//GET LOCATION OF VERTEX SHADER POSITION ATTRIBUTE
var positionAttributeLocation = gl.getAttribLocation(program, "position")

//CREATE POSITION BUFFER TO STORE POSITION DATA
var positionBuffer = gl.createBuffer()

//BIND BUFFER TO BIND POINT
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

//POSITION DATA
var positions = [0, 0, 0, 1, 0.5, 0.5]

//STORE POSITION DATA IN BUFFER REFERENCE BY BIND POINT
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

//CREATE VERTEX ARRAY
var vertexArray = gl.createVertexArray()

//BIND VERTEX ARRAY
gl.bindVertexArray(vertexArray)

//TURN POSITION ATTRIBUTE ON BY ENABLING VERTEX ARRAY
gl.enableVertexAttribArray(positionAttributeLocation)

//DESCRIBE HOW TO PULL DATA OUT OF VERTEX ARRAY
let size = 2
let type = gl.FLOAT
let normalize = false
let stride = 0
let offset = 0

//APPLY SETTINGS
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

//USE PROGRAM
gl.useProgram(program)

//DRAW COMMAND AND SETTINGS
var count = 3
var primitiveType = gl.TRIANGLES
gl.drawArrays(primitiveType, offset, count)
