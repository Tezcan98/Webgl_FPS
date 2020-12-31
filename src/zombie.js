class zombie {
    constructor(color,coord,size, id) {
      this.color = color;
      [this.x, this.y, this.z] = coord;
      [this.h, this.w, this.d] = size;
      this.ilkX = this.x;  //yunus el atıcak
      this.ilkY = this.y;
      this.ilkZ = this.z;
      this.points= [];
      this.colors = [];
      this.zombieNum = id;
      this.size = size
      colorCube(coord, size, color, this.points, this.colors); 

    } 
    setX(x){this.x=x}
    setZ(z){this.z=z}

    showZombie(i){  
      
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[-this.x + this.ilkX, 1, -this.z + this.ilkZ ]);   
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix); 
      gl.drawArrays( gl.TRIANGLES, EnviromentPoints.length + (NumVertices*i),NumVertices);
      glMatrix.mat4.translate(worldMatrix, worldMatrix,[this.x - this.ilkX, -1, this.z- this.ilkZ]);   
      return this.Checkcollusion(); // if collusion zombie will dead
    }

    Checkcollusion(){ 
      
      for (let b of bullets){
        var bxmin = b.x;
        var bxmax = b.x + b.size[0]
        var bzmin = b.z;
        var bzmax = b.z + b.size[2]
        var axmax = this.x
        var axmin = this.x-this.size[0]
        var azmax = this.z
        var azmin = this.z-this.size[2]
        if (axmin <= bxmax && axmax >= bxmin) 
          if(azmin <= bzmax && azmax >= bzmin){
            console.log("a")
            return -1     
          }
      }

    }

    followMe(moveX,moveZ){
      this.x += (moveX - this.x)/200;
      this.z += (moveZ - this.z)/200;
    }
    

  }