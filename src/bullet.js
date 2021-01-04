class bullet {

    
    constructor(color,coord,target, id) {
      this.color = color;
      [this.x, this.y, this.z] = coord; 
      this.ilkX = -this.x;
      this.ilkY = -this.y;
      this.ilkZ = -this.z;
      this.points= [];
      this.colors = [];
      this.bullnum = id;
      this.size = [.2,.2,.2]
      this.target = [...target]
      this.time = 0;
 
      colorCube(coord, this.size, color, this.points, this.colors); 

    } 

    showBullet(i){   
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[-this.x + this.ilkX, this.y, -this.z - this.ilkZ]);   
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix); 
      gl.drawArrays( gl.TRIANGLES, EnviromentPoints.length + (zombies.length*NumVertices) + (NumVertices*i),NumVertices);
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[this.x - this.ilkX, -this.y, +this.z + this.ilkZ ]);   
    }

    goto(){
      this.x += this.target[2]/10
      this.z += this.target[0]/10
      return this.time++
    }
     
  }