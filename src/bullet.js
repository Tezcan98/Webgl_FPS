class bullet {

    
    constructor(color,coord,target, id) {
      this.color = color;
      [this.x, this.y, this.z] = coord; 
      // this.y += 1;
      this.ilkX = -this.x;  //yunus el atıcak
      this.ilkY = -this.y;
      this.ilkZ = -this.z;
      this.points= [];
      this.colors = [];
      this.bullnum = id;
      this.size = [.2,.2,.2]
      this.target = [...target]
       
 
      colorCube(coord, this.size, color, this.points, this.colors); 

    } 
    setX(x){this.x=x}
    setZ(z){this.z=z}

    showBullet(i){   
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[-this.x + this.ilkX, this.y, -this.z - this.ilkZ]);   
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix); 
      gl.drawArrays( gl.TRIANGLES, EnviromentPoints.length + (zombies.length*NumVertices) + (NumVertices*i),NumVertices);
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[this.x - this.ilkX, -this.y, +this.z + this.ilkZ ]);   
    }

    goto(){
      // console.log(this.target) 
      this.x += this.target[2]/10
      // this.y -= (this.target[1] - this.y)/4000;
      this.z += this.target[0]/10 //(targetZ - this.z)/200;
  
      return [this.x,this.z]
    }
     
    
  }