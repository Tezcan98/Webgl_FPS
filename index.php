<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="./src/style.css">
<script id = "vertex-shader2" type="x-shader/x-vertex">
    precision mediump float;
    attribute vec3 vPosition;
    attribute vec3 vColor;
    varying vec3 fragColor;
    uniform mat4 mWorld;
    uniform mat4 mView;
    uniform mat4 mProj;
    uniform mat4 mMove;

    
    void main()
    {
        fragColor = vColor;
        gl_Position =  mProj * mView * mMove * mWorld * vec4(vPosition, 1.0);
    }
    
    
</script>
<script id="fragment-shader2" type="x-shader/x-fragment">

    precision mediump float;
    
    varying vec3 fragColor;
    void main()
    {
     gl_FragColor = vec4(fragColor, 1.0);
    }

</script>
<!-- <script type="text/javascript" src="enviroment.js"></script> -->
 
</head>
<body>
    <canvas id="gl-canvas" width="1024" height="700" style=" position: absolute;left: 20%;  border-style: dotted;"> 
    Oops ...  
    </canvas>

    <div id="game_stuff" style="position:absolute;z-index: 20; left:20%; top: 0; user-select: none;">
        <p>Score: <span id="score">0</span></p>
        <p>Life: <span id="life"></span></p>
    </div>

    <img src="src/aim.png" alt="aim"  width="30" height="30" style="position: absolute; z-index: 5; 
    left=20%; top: 350px; user-select: none;">
    </body>

    <script type="text/javascript" src="Common/webgl-utils.js"></script>
    <script type="text/javascript" src="Common/initShaders.js"></script>
    <script type="text/javascript" src="Common/MV.js"></script>
    <script type="text/javascript" src="Common/gl-matrix.js"></script>

    <script type="text/javascript" src="src/main.js"></script>
    <script type="text/javascript" src="src/zombie.js"></script>
    <script type="text/javascript" src="src/bullet.js"></script>
</html>
