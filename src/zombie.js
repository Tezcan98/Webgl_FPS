class zombie {
    constructor(color,coord,size, id) {
      this.color = color;
      [this.x, this.y, this.z] = coord;
      [this.h, this.w, this.d] = size;
      this.ilkX = this.x;  //yunus el atıcak
      this.ilkY = this.y;
      this.ilkZ = this.z;
      this.zpoints= [];
      this.zcolors = [];
      this.zombieNum = id;
      colorCube(coord, size, color, this.zpoints, this.zcolors); 

    }
    
    createPoint(){
        

    }
    
    setX(x){this.x=x}
    setZ(z){this.z=z}

    showZombie(){  
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[-this.x, 1, -this.z]);   
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix); 
      gl.drawArrays( gl.TRIANGLES, points.length-(NumVertices*this.zombieNum),NumVertices);
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[this.x, -1, this.z]);   
    }

    followMe(moveX,moveZ){
      this.x += (moveX - this.x)/300;
      this.z += (moveZ - this.z)/200;
    }
    

  }