  var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight,

  mouseX = 0, mouseY = 0,

  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,

  SEPARATION = 100,
  AMOUNTX = 90,
  AMOUNTY = 90,

  camera, scene, renderer;

  init();
  animate();

  function init() {

    var container, separation = 500, amountX = 50, amountY = 50,
    particles, particle;

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );

    // particles

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial( {

      color:  0x131313,
      program: function ( context ) {

        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();

      }

    } );

    var geometry = new THREE.Geometry();

    for ( var i = 0; i < 2000; i ++ ) {
      particle = new THREE.Sprite( material );
      particle.position.x = Math.random() * 3 - 1;
      particle.position.y = Math.random() * 3 - 1;
      particle.position.z = Math.random() * 3 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar( Math.random() * 10 + 450 );
      particle.scale.multiplyScalar( 2 );
      particle.scale.x = particle.scale.y = 3;
      scene.add( particle );

      geometry.vertices.push( particle.position );

    }

    // lines between lines
    /*
    var line_c = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xbe00ff, opacity: 0.5 } ) );
    scene.add( line_c );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //

    window.addEventListener( 'resize', onWindowResize, false );
    */


    //Line
    for (var i = 0; i < 300; i++) {

      var geometry = new THREE.Geometry();

      var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
      vertex.normalize();
      vertex.multiplyScalar( 450 );

      geometry.vertices.push( vertex );

      var vertex2 = vertex.clone();
      vertex2.multiplyScalar( Math.random() * 0.2 + 1 );

      geometry.vertices.push( vertex2 );

      var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( {
        color: 0x0D0301, linewidth: 3, opacity: Math.random() } ) );
      scene.add( line );
    }

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  //

  function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart( event ) {

    if ( event.touches.length > 1 ) {

      event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

  }

  function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

      event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

  }

  //

  function animate() {

    requestAnimationFrame( animate );

    render();

  }

  function render() {

    renderer.setClearColor( 0x00e0ff, 1); //

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
  }
