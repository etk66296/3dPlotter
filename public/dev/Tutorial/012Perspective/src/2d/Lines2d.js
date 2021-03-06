class Lines2d extends VertexGroup2d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINES
  }
}

class LineStrip2d extends VertexGroup2d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_STRIP
  }
}

class LineLoop2d extends VertexGroup2d {
  constructor(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv) {
    if (color4fv === undefined && vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey)
    } else if (vertices2fv === undefined) {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
    } else {
      super(glCntxt, shader, colorUniformKey, posAttributeKey, matrixUniformKey, color4fv, vertices2fv)
      if (color4fv.length < 4) {
        this.errorLog("color data must be of the type 4fv")
      }
      if (vertices2fv.length < 4) {
        this.errorLog("a 2d line needs at least 4 2fv coordinate elements in the 'psotionList' parameter")
      }
    }
    this.bufferCfg.primitiveType = this.glCntxt.LINE_LOOP
  }
}