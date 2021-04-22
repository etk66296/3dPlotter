describe("Vector3", function() {
  var myVector3

  beforeEach(function() {
    myVector3 = new Vector3()
  })

  it("has the parent class Vector", function() {
    expect(myVector3.__proto__.__proto__.constructor.name).toEqual('Vector')
  })

  it("should provide a method cross", function() {
    expect(typeof myVector3.cross).toBe("function")
  })

  describe("cross", function() {
    it("should take one paramater as multiplier of object type Vector3", function() {
      var myMultiplierVector3 = new Vector3()
      spyOn(myVector3, 'cross')
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cross).toHaveBeenCalledWith(myMultiplierVector3)
    })
    it("should result the correct vector", function() {
      var myMultiplierVector3 = new Vector3([1, 0, 0])
      myVector3.cells = [0, 0, 1]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([0, 1, 0])
    })
    it("should result the correct vector with negative values", function() {
      var myMultiplierVector3 = new Vector3([ 0, -1.0, 0 ])
      myVector3.cells = [ 0, 0, -1.0 ]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([-1.0, -0, -0])
    })
    it("should result the correct vector with exact", function() {
      var myMultiplierVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      myVector3.cells = [ 13.141516, 17.181920, 21.222324 ]
      myVector3.cross(myMultiplierVector3)
      expect(myVector3.cells).toEqual([ 35.87422262304004, -93.41406114979199, 53.41503856799999 ])
    })
    it("should return itself", function() {
      var myMultiplierVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      let self = myVector3.cross(myMultiplierVector3)
      expect(self).toEqual(myVector3)
    })
  })

  it("should provide a method subtract", function() {
    expect(typeof myVector3.subtract).toBe("function")
  })

  describe("subtract", function() {
    it("should take one paramater as multiplier of object type Vector3", function() {
      var myMultiplierVector3 = new Vector3()
      spyOn(myVector3, 'subtract')
      myVector3.subtract(myMultiplierVector3)
      expect(myVector3.subtract).toHaveBeenCalledWith(myMultiplierVector3)
    })
    it("should return itself", function() {
      var mySubtrahendVector3 = new Vector3([ 1.234, 5.678, 9.101112 ])
      let self = myVector3.subtract(mySubtrahendVector3)
      expect(self).toEqual(myVector3)
    })
    it("should result the correct calulated vector", function() {
      var mySubtrahendVector3 = new Vector3([ 2 * 1.234, 2 * 5.678, 2 * 9.101112 ])
      myVector3.cells = [ 1.234, 5.678, 9.101112 ]
      myVector3.subtract(mySubtrahendVector3)
      expect(myVector3.cells).toEqual([ -1.234, -5.678, -9.101112 ])
    })
  })

  it("should provide a method normalize", function() {
    expect(typeof myVector3.normalize).toBe("function")
  })

  describe("normalize", function() {
    it("should return itself", function() {
      let self = myVector3.normalize()
      expect(self).toEqual(myVector3)
    })
    it("should return the same vector if it is a normalized vector", function() {
      myVector3.cells = [1, 0, 0]
      myVector3.normalize()
      expect(myVector3.cells).toEqual([ 1, 0, 0 ])
    })
    it("should return the correct normalized vector", function() {
      myVector3.cells = [1, 2, 3]
      myVector3.normalize()
      expect(myVector3.cells).toEqual([ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732 ])
    })
  })
})
