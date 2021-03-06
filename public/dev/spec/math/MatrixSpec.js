describe("MatrixFactory", function() {
  var myMatrixFactory

  beforeEach(function() {
    myMatrixFactory = new MatrixFactory()
  })

  it("has the parent class Plot3DFactory", function() {
    expect(myMatrixFactory.__proto__.__proto__.constructor.name).toEqual('Plot3DFactory')
  })

  it("should have a method createIdentityMatrix4x4 wich returns a new Instance of Matrix4x4", function() {
    let myIdentiyMatrix4x4 =  myMatrixFactory.createIdentityMatrix4x4()
    expect(myIdentiyMatrix4x4.cells).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])
  })

})

describe("Matrix", function() {
  var myMatrix

  beforeEach(function() {
    myMatrix = new Matrix()
  })

  it("has the parent class Plot3DObject", function() {
    expect(myMatrix.__proto__.__proto__.constructor.name).toEqual('Plot3DObject')
  })

  it("has an attribute cells which is an array object", function() {
    expect(myMatrix.cells.constructor.name).toEqual('Array')
  })

  it("sould have a methos log which prints the matrix well formated in the console", function() {
    expect(typeof myMatrix.log).toEqual('function')
  })

  describe('log', function() {
    it("should log the each cell", function() {
      spyOn(console, 'log')
      myMatrix.cells = [ '1', '2', '3', '4' ]
      myMatrix.log()
      expect(console.log).toHaveBeenCalledTimes(myMatrix.cells.length)
    })
  })
})

describe("Matrix4x4", function() {
  var myMatrix4x4

  beforeEach(function() {
    myMatrix4x4 = new Matrix4x4()
  })

  it("has the parent class Matrix", function() {
    expect(myMatrix4x4.__proto__.__proto__.constructor.name).toEqual('Matrix')
  })

  it("the attribute cells has the length 16", function() {
    expect(myMatrix4x4.cells.length).toEqual(16)
  })

  it("should have a method which rests the matrix to the identity matrix", function() {
    expect(typeof myMatrix4x4.reset).toEqual('function')
  })

  describe("reset", function() {
    it("should reset the cells array to the identity matrix", function() {
      myMatrix4x4.cells = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ]
      myMatrix4x4.reset()
      expect(myMatrix4x4.cells).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ])
    })
  })

  it("should provide a method multiplyM4", function() {
    expect(typeof myMatrix4x4.multiplyM4).toBe("function")
  })
  describe("multiplyM4", function() {
    it("should take one paramater as multiplier of object type Matrix4x4", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4()
      spyOn(myMatrix4x4, 'multiplyM4')
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.multiplyM4).toHaveBeenCalledWith(myMultiplierMatrix4x4)
    })
    it("should result the identity matrix when it was called with the identity matrix", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4()
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
    })
    it("should result the correct caluclated matrix", function() {
      var myMultiplierMatrix4x4 = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      myMatrix4x4.cells = [
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
      ]
      myMatrix4x4.multiplyM4(myMultiplierMatrix4x4)
      expect(myMatrix4x4.cells).toEqual([
        54 , 50 , 46 , 42 ,
        134, 130, 126, 122,
        146, 150, 154, 158,
        66 , 70 , 74 , 78
      ])
    })
  })

  describe("transpose", function() {
    it("should result the identity matrix when it was called with the identity matrix", function() {
      myMatrix4x4.transpose()
      expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
    })
    it("should result the correct transposed matrix", function() {
      myMatrix4x4.cells = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ]
      myMatrix4x4.transpose()
      expect(myMatrix4x4.cells).toEqual([
        1, 5, 9,  13,
        2, 6,	10, 14,
        3, 7,	11, 15,
        4, 8,	12, 16
      ])
    })
  })
  
  describe("invert", function() {
    it("should result the identity matrix when it was called with the identity matrix", function() {
      myMatrix4x4.invert()
      expect(myMatrix4x4.cells).toEqual(myMatrix4x4.cells)
    })
    it("should result the correct inverse matrix", function() {
      myMatrix4x4.cells = [
         1,  1,  1, -1,
         1,  1, -1,  1,
         1, -1,  1,  1,
        -1,  1,  1,  1
      ]
      myMatrix4x4.invert()
      expect(myMatrix4x4.cells).toEqual([
         0.25,  0.25,  0.25, -0.25,
         0.25,  0.25, -0.25,  0.25,
         0.25, -0.25,  0.25,  0.25,
        -0.25,  0.25,  0.25,  0.25
      ])
    })
  })
  describe('log', function() {
    it("should log the each cell", function() {
      spyOn(console, 'log')
      myMatrix4x4.log()
      expect(console.log).toHaveBeenCalledTimes(myMatrix4x4.cells.length / 4 + 2)
    })
  })
})

describe("Matrix4x4Math", function() {
  var myMatrix4x4Math

  beforeEach(function() {
    myMatrix4x4Math = new Matrix4x4Math()
  })

  it("Should have a method for calulation the product of two 4x4 matrices", function() {
    expect(typeof myMatrix4x4Math.multiplyTwoM4x4).toBe('function')
  })

  describe("multiplyTwoM4x4", function() {
    
    var mA
    var mB

    beforeEach(function() {
      mA = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      mB = new Matrix4x4([
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
      ])
    })
    
    it("should return a new Matrix4x4 object instance", function() {
      let result = myMatrix4x4Math.multiplyTwoM4x4(mA, mB)
      expect(result.constructor.name).toEqual('Matrix4x4')
    })

    it("should calculate the correct result", function() {
      let result = myMatrix4x4Math.multiplyTwoM4x4(mA, mB)
      expect(result.cells).toEqual([
        54 , 50 , 46 , 42 ,
        134, 130, 126, 122,
        146, 150, 154, 158,
        66 , 70 , 74 , 78
      ])
    })

  })

  it("should have a method for building the transpose matrix", function() {
    expect(typeof myMatrix4x4Math.transpose).toBe('function')
  })

  describe("transpose", function() {
    it("should build the correct transposed matrix", function() {
      let m = new Matrix4x4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
      ])
      expect(myMatrix4x4Math.transpose(m).cells).toEqual([
        1, 5, 9, 5,
        2, 6, 8, 4,
        3, 7, 7, 3,
        4, 8, 6, 2
      ])
    })
  })

  it("should have a method for inverting a matrix", function() {
    expect(typeof myMatrix4x4Math.invert).toBe('function')
  })

  describe("invert", function() {
    it("should calculate the correct inverted matrix", function() {
      let m = new Matrix4x4([
        1,  1,  1, -1,
        1,  1, -1,  1,
        1, -1,  1,  1,
       -1,  1,  1,  1
     ])
     
     expect(myMatrix4x4Math.invert(m).cells).toEqual([
        0.25,  0.25,  0.25, -0.25,
        0.25,  0.25, -0.25,  0.25,
        0.25, -0.25,  0.25,  0.25,
       -0.25,  0.25,  0.25,  0.25
     ])
    })
  })
})

describe("Matrix3x3", function() {
  var myMatrix3x3

  beforeEach(function() {
    myMatrix3x3 = new Matrix3x3()
  })

  it("has the parent class Matrix", function() {
    expect(myMatrix3x3.__proto__.__proto__.constructor.name).toEqual('Matrix')
  })

})