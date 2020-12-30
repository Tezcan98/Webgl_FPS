class bullet {
    constructor(color,coord,target, id) {
      this.color = color;
      [this.x, this.y, this.z] = coord; 
      // this.y += 1;
      this.ilkX = -this.x;  //yunus el atıcak
      this.ilkY = -this.y;
      this.ilkZ = -this.z;
      this.bpoints= [];
      this.bcolors = [];
      this.bullnum = id;
      var size = [.2,.2,.2]
      this.target = [...target]
       
 
      colorCube(coord, size, color, this.bpoints, this.bcolors); 

    } 
    setX(x){this.x=x}
    setZ(z){this.z=z}

    showBullet(){   
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[-this.x + this.ilkX, this.y, -this.z - this.ilkZ]);   
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix); 
      gl.drawArrays( gl.TRIANGLES, points.length + (zombies.length*NumVertices) + (NumVertices*this.bullnum),NumVertices);
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[this.x - this.ilkX, -this.y, +this.z + this.ilkZ ]);   
    }

    goto(){
      console.log(this.target)
      this.x += this.target[2]/11
      // this.y -= (this.target[1] - this.y)/4000;
      this.z += this.target[0]/11 //(targetZ - this.z)/200;
      return this.x
    }
     
    
  }