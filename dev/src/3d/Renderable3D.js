class Renderable3D extends Renderable {
  constructor(glCntxt, shader) {
    super(glCntxt, shader)
    this.color = new Vector4([ 1.0, 0.0, 1.0, 1.0 ])
    
    this.modelMatrix = new Matrix4x4()
    this.modelSpaceRotationInRad = { x: 0.0, y: 0.0, z: 0.0 }
    this.modelScale = {x: 0.0, y: 0.0, z: 0.0 }

    this.worldTranslationMatrix = new Matrix4x4()
    this.worldPosition = new Vector3([ 0.0, 0.0, 0.0 ])

    this.glVertexBuffer = this.glCntxt.createBuffer()
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.vertices3fv = [
      -10, -10, 0,
      10, -10, 0,
      0, 10, 0
    ]
    this.vertices3fv =  [
      1.0,-1.0,-1.0,
		  -1.0,-1.0, 1.0,
		  -1.0, 1.0, 1.0,
		  1.0, 1.0,-1.0,
		  -1.0,-1.0,-1.0,
		  -1.0, 1.0,-1.0,
		  1.0,-1.0, 1.0,
		  -1.0,-1.0,-1.0,
		  1.0,-1.0,-1.0,
		  1.0, 1.0,-1.0,
		  1.0,-1.0,-1.0,
		  -1.0,-1.0,-1.0,
		  -1.0,-1.0,-1.0,
		  -1.0, 1.0, 1.0,
		  -1.0, 1.0,-1.0,
		  1.0,-1.0, 1.0,
		  -1.0,-1.0, 1.0,
  		-1.0,-1.0,-1.0,
		  -1.0, 1.0, 1.0,
		  -1.0,-1.0, 1.0,
		  1.0,-1.0, 1.0,
		  1.0, 1.0, 1.0,
		  1.0,-1.0,-1.0,
		  1.0, 1.0,-1.0,
		  1.0,-1.0,-1.0,
		  1.0, 1.0, 1.0,
		  1.0,-1.0, 1.0,
		  1.0, 1.0, 1.0,
		  1.0, 1.0,-1.0,
		- 1.0, 1.0,-1.0,
		  1.0, 1.0, 1.0,
		  -1.0, 1.0,-1.0,
		  -1.0, 1.0, 1.0,
		  1.0, 1.0, 1.0,
		  -1.0, 1.0, 1.0,
		  1.0,-1.0, 1.0
  ]
    this.glCntxt.bufferData(glCntxt.ARRAY_BUFFER, new Float32Array(this.vertices3fv), glCntxt.STATIC_DRAW)

  }

  rotateXIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.x += angleInRadian
    let tyy = Math.cos(this.modelSpaceRotationInRad.x)
    let tzy = (-1) * Math.sin(this.modelSpaceRotationInRad.x)
    let tyz = Math.sin(this.modelSpaceRotationInRad.x)
    let tzz = Math.cos(this.modelSpaceRotationInRad.x)
    let xAxisRotation = new Matrix()
    xAxisRotation.cells = [
      1.0, 0.0, 0.0, 0.0,
      0.0, tyy, tzy, 0.0,
      0.0, tyz, tzz, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelMatrix.multiplyM4(xAxisRotation)
  }

  rotateYIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.y += angleInRadian
    let txx = Math.cos(this.modelSpaceRotationInRad.y)
    let tzx = Math.sin(this.modelSpaceRotationInRad.y)
    let txz = (-1) * Math.sin(this.modelSpaceRotationInRad.y)
    let tzz = Math.cos(this.modelSpaceRotationInRad.y)
    let yAxisRotation = new Matrix()
    yAxisRotation.cells = [
      txx, 0.0, tzx, 0.0,
      0.0, 1.0, 0.0, 0.0,
      txz, 0.0, tzz, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelMatrix.multiplyM4(yAxisRotation)
  }

  rotateZIncremental(angleInRadian) {
    this.modelSpaceRotationInRad.z += angleInRadian
    let txx = Math.cos(this.modelSpaceRotationInRad.z)
    let tyx = (-1) * Math.sin(this.modelSpaceRotationInRad.z)
    let txy = Math.sin(this.modelSpaceRotationInRad.z)
    let tyy = Math.cos(this.modelSpaceRotationInRad.z)
    let zAxisRotation = new Matrix()
    zAxisRotation.cells = [
      txx, tyx, 0.0, 0.0,
      txy, tyy, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]
    this.modelMatrix.multiplyM4(zAxisRotation)
  }

  translateXIncremental(distance) {
    this.worldPosition.cells[0] += distance
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
  }

  translateYIncremental(distance) {
    this.worldPosition.cells[1] += distance
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
  }

  translateZIncremental(distance) {
    this.worldPosition.cells[2] += distance
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }
  
  scaleX(factor) {
    this.modelScale.x = factor
    this.modelMatrix.cells[0] = this.modelScale.x
  }

  scaleY(factor) {
    this.modelScale.y = factor
    this.modelMatrix.cells[5] = this.modelScale.y
  }
  
  scaleZ(factor) {
    this.modelScale.z = factor
    this.modelMatrix.cells[10] = this.modelScale.z
  }

  setWorldPosition(x, y, z) {
    this.worldPosition.cells[0] = x
    this.worldPosition.cells[1] = y
    this.worldPosition.cells[2] = z
    this.worldTranslationMatrix.cells[12] = this.worldPosition.cells[0]
    this.worldTranslationMatrix.cells[13] = this.worldPosition.cells[1]
    this.worldTranslationMatrix.cells[14] = this.worldPosition.cells[2]
  }

  update() {
    this.modelMatrix.reset()
    this.rotateXIncremental(0.01)
    this.rotateYIncremental(0.01)
    this.rotateZIncremental(0.01)
  }

  draw() {
    this.glCntxt.useProgram(this.shader.program)

    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelMatrix'], false, this.modelMatrix.cells)
    this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_modelToWorldMatrix'], false, this.worldTranslationMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_WorldToViewMatrix'], false, this.camera.lookAtMatrix.cells)
    // // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.orthographicProjectionMatrix.cells)
    // this.glCntxt.uniformMatrix4fv(this.shader.glVertexUniformLocation['u_ViewToProjectionMatrix'], false, this.camera.perspectiveProjectionMatrix.cells)
    
    this.glCntxt.uniform4fv(this.shader.glVertexUniformLocation['u_color'], this.color.cells)


    // test -->
    this.glCntxt.enableVertexAttribArray(this.shader.glAttrLocation['a_position'])
    this.glCntxt.bindBuffer(this.glCntxt.ARRAY_BUFFER, this.glVertexBuffer)
    this.glCntxt.vertexAttribPointer(
      this.shader.glAttrLocation['a_position'],
      3,
      this.glCntxt.FLOAT,
      false,
      0,
      0
    )

    this.glCntxt.drawArrays(
      this.glCntxt.TRIANGLES,
      0,
      36
    )
    // <-- test

  }
}
