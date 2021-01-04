"use strict";

var canvas;
var gl;

const canvasSizeX= 1024;
const canvasSizeY= 780;

var NumVertices  = 36;
var EnviromentPoints = [];
var EnviromentColors = [];
var program; 
var cBuffer;
var vBuffer;

var black = [ 0.0, 0.0, 0.0, 1.0 ];
var red = [ 1.0, 0.3, 0.0, 1.0 ]; // 
var yellow = [ 1.0, 0.8, 0.2, 1.0 ];  // 
var green = [ 0.0, 1.0, 0.2, 1.0 ]; // green
var blue = [ 0.2, 0.35, 0.9, 1.0 ];  // blue
var magenta = [ 0.5, 0.2, 0.9, 1.0 ];  // magenta
var cyan = [ 0.0, 0.5, 0.8, 1.0 ];  // cyan
var white = [ 1.0, 1.0, 1.0, 1.0 ]   // white

var moveX= 0.0;
var moveY= 0.0;
var moveZ= 0.0;
var eyeX = 0;
var kaybolmaSuresi = 120;

var zombies = [];  
var bullets = []; 

var finalPoints =[];
var finalColors =[];

let documentScore = document.getElementById("score");
let documentLife = document.getElementById("life");
let heartCode = 128153;
let score;
let life;
let isOver;
let playerImmune;

function loseLife() {
    if (life-- <= 0) {
        isOver == true;
        documentLife.textContent = '-';
        alert('GAME OVER!\nYour Score: ' + score + '\nPress ESC or SPACE for playing again.');
        location.reload(true)
        zombies = [];
        bullets = [];
    }
    else {
        let temp ="";
        for(let i = 0; i < life; i++) {
            temp += String.fromCodePoint(heartCode);
        }  
        documentLife.innerHTML = temp;
    } 
}

window.onload = function init()
{
    score = 0;
    life = 3;
    playerImmune = false;
    isOver = false;
    documentScore.textContent = score;
    for(let i = 0; i < life; i++) {
        documentLife.innerHTML += ' ' + String.fromCodePoint(heartCode)
    }

    canvas = document.getElementById( "gl-canvas" );
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

    canvas.onclick = function() {
        canvas.requestPointerLock();
    }

    if(document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
          console.log('The pointer lock status is now locked');
      } else {
          console.log('The pointer lock status is now unlocked');
      }

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvasSizeX, canvasSizeY );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);  


 
    program = initShaders( gl, "vertex-shader2", "fragment-shader2" );
    gl.useProgram( program ); 

    
    
    initEnviroment(); // Duvarlar ve zemin oluşturulur. 
    createPoints()  
    createColors()

    matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');  // BURADA GEREKSİZLERİ SİL PLS
    matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    matMoveUniformLocation = gl.getUniformLocation(program, 'mMove');
    matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
    

    worldMatrix = new Float32Array(16);   // BURADA GEREKSİZLERİ SİL PLS
    viewMatrix = new Float32Array(16); 
    projMatrix = new Float32Array(16);
    moveMatrix = new Float32Array(16);
    

    document.addEventListener('keydown', function onDownUp(event)
    {
        switch(event.key){
            case 'W':
            case 'w':
                moveX -= viewMatrix[8] /4
                moveZ += viewMatrix[10] /4
                break;
            case 'S':
            case 's':
                moveX += viewMatrix[8] /4 
                moveZ -= viewMatrix[10] /4 
                break;
            case 'D':
            case 'd':
                moveX -= viewMatrix[0] /4
                moveZ += viewMatrix[2] /4
                break;
            case 'A':
            case 'a':
                moveX += viewMatrix[0] /4 
                moveZ -= viewMatrix[2] /4 
                break;          
        }
        if(moveX >= 20.0)   // DUVARA DEĞMESİN
            moveX = 20.0
        else if (moveZ >= 20.0)
            moveZ = 20.0
        else if (moveX <= -30.0)
            moveX = -30.0
        else if (moveZ <= -30.0)
            moveZ = -30.0 

    }, false);
	
    document.addEventListener('mousemove', function (event) {
        eyeX = event.movementX/5
    }, false)
    
  
      document.addEventListener('click', function (event) {
        createBullet(viewMatrix); 
 
      }, false)
    

    glMatrix.mat4.lookAt(viewMatrix, 
        [0, 0, 0], // eye - Position of the viewer
        [0, 0, 0], //center - Point the viewer is looking at
        [0, 1, 0] // up - vec3 pointing up -> kameranın normal vektörü
    );
    render();
}
 

function initEnviroment(){

    var col1= [ 0.4, 0.6, 0.6, 1.0 ]
    var coord1 =[-20, 2, 20];
    var size1 = [50,1,50]; 
    colorCube(coord1, size1, col1, EnviromentPoints, EnviromentColors);  
  
    var col2= [ 0.4, 0.5, 0.5, 0.1]
    var coord2 =[-20, 2,-30];
    var size2 = [50,5,1]; 
    colorCube(coord2, size2, col2, EnviromentPoints, EnviromentColors); 
    var coord3 =[-20, 2,20];
    var size3 = [50,5,1]; 
    colorCube(coord3, size3, col2, EnviromentPoints, EnviromentColors); 

    finalColors = [...EnviromentColors]
    finalPoints = [...EnviromentPoints]
}

function createPoints()
{  
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer ); 
    gl.bufferData( gl.ARRAY_BUFFER, flatten(finalPoints), gl.STATIC_DRAW );
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );   
}
function createColors(){
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(finalColors), gl.STATIC_DRAW );
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
}
   
var worldMatrix;
var viewMatrix;
var projMatrix;
var moveMatrix;
var matWorldUniformLocation;
var matViewUniformLocation;
var matProjUniformLocation;
var matMoveUniformLocation;


function createBullet(target){  
    var color= [ 0,0,0, 1.0 ]   
    bullets.push( new bullet(color, [moveX,moveY,moveZ], target ,bullets.length) );  
    refresh()
}

function createZombie(){ 
    var color= [ 0.1, 1, 0.1, 1.0 ] 
    var x = moveX + Math.floor(Math.random()*(60)) - 30; 
    var y = 2
    var z = moveZ + Math.floor(Math.random()*(60)) - 30;
    if(x >= 20.0)   // DUVARA DEĞMESİN
        x = 20.0
    else if (z >= 20.0)
        z = 20.0
    else if (x <= -30.0)
        x = -30.0
    else if (z <= -30.0)
        z = -30.0 
     
    var coord =[x,y,z];
    var size = [1,3,1];   

    zombies.push( new zombie(color,coord,size, zombies.length));  
    refresh()
}

function sum(color){  // randomize cube's color so feel like shadow :)
    var lamb = Math.random()/3
    return [(color[0]-lamb),(color[1]-lamb),(color[2]-lamb),(color[3])]
}
 
function colorCube(coord,size,color,p,c)
{ 
    let [x,y,z] = coord;
    let [w,h,r] = size; 
    
    quad( 1, 0, 3, 2,-x,y,z,w,h,r,sum(color), p, c); 
    quad( 2, 3, 7, 6,-x,y,z,w,h,r,sum(color), p, c); 
    quad( 3, 0, 4, 7,-x,y,z,w,h,r,sum(color), p, c); 
    quad( 6, 5, 1, 2,-x,y,z,w,h,r,sum(color), p, c);
    quad( 4, 5, 6, 7,-x,y,z,w,h,r,sum(color), p, c);
    quad( 5, 4, 0, 1,-x,y,z,w,h,r,sum(color), p, c);
}

function quad(a, b, c, d,x,y,z,w,h,r,color, point, colp)
{
    var vertices = [
        vec4( -x, -y,  -z+r, 1.0 ),
        vec4( -x,  -y+h,  -z+r, 1.0 ),
        vec4(  -x+w,  -y+h,  -z+r, 1.0 ),
        vec4(  -x+w, -y,  -z+r, 1.0 ),
        vec4( -x, -y, -z, 1.0 ),
        vec4( -x,  -y+h, -z, 1.0 ), 
        vec4(  -x+w,  -y+h, -z, 1.0 ),
        vec4(  -x+w, -y, -z, 1.0 )
    ]; 

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        point.push( vertices[indices[i]] ); 
        colp.push(color) 
    }
   
}
function refresh(){

    finalPoints = [...EnviromentPoints];
    finalColors = [...EnviromentColors];

    let objects = zombies.concat(bullets);
    for (var o of objects) {
        finalPoints = [...finalPoints,...o.points]
        finalColors = [...finalColors,...o.colors]    
    }
    
    createPoints() 
    createColors()
}

var z_timer = 0 ;
function render()
{
    
    if(z_timer++ % 100 == 0 )
        createZombie()  

    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.rotate(viewMatrix, viewMatrix, glMatrix.glMatrix.toRadian(eyeX), [0, 1, 0])
    glMatrix.mat4.fromTranslation(moveMatrix, [moveX, 0, moveZ]);
    
    eyeX = 0;
    glMatrix.mat4.perspective(projMatrix,
        glMatrix.glMatrix.toRadian(90),
        canvas.clientWidth / canvas.clientHeight, 
        1.0, 1000.0);
        
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matMoveUniformLocation, gl.FALSE, moveMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix); 
    
    
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT); 
    gl.drawArrays( gl.TRIANGLES, 0, EnviromentPoints.length ); 
    
     
    for (let [i,z] of zombies.entries()){  
        z.followMe(moveX,moveZ);
        if(z.showZombie(i) == -1){ // vurulma varsa  
            zombies.splice(i,1);
            documentScore.textContent = ++score;
            refresh()   
        } 
    } 
     
    for (let [i,b] of bullets.entries()){   
        b.showBullet(i)  
        var timer = b.goto(); 
        if (timer > kaybolmaSuresi ){ //belirli uzaklıkta kaybolur
            bullets.splice(i,1); 
            refresh(bullets) 
        }
    }  
    
    if (!isOver) 
        requestAnimFrame( render );

}