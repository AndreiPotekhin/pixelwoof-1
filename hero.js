
			// import * as THREE from './three.js';
			import {GLTFLoader} from './GLTFLoader.js';

			
			// Scene & Renderer

			const scene = new THREE.Scene();
		    const  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas")});

		    scene.background = new THREE.Color(0xffffff);		    

		    // Camera

		    // There's no reason to set the aspect here because we're going
		    // to set it every frame anyway so we'll set it to 2 since 2
		    // is the the aspect for the canvas default size (300w/150h = 2)
		    const  camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
		    camera.position.z = 5;			 

			// Objects

			const geometry = new THREE.TorusKnotGeometry( .7, .2, 50, 10, 1, 5 );

			let loader = new GLTFLoader();

			let obj;
			loader.load("ship.gltf", function (gltf) {
			  obj = gltf.scene;
			  scene.add(gltf.scene);


			// var model = gltf.scene;
			var newMaterial = new THREE.MeshToonMaterial({color: 0xff0000});
			obj.traverse((o) => {
			  if (o.isMesh) o.material = newMaterial;
			});			  
			});			

			// Material

			const material = new THREE.MeshToonMaterial();				
	
			// Mesh

			const mesh = new THREE.Mesh( geometry, material);
			//scene.add( mesh );

			// Lights

		    const light = new THREE.PointLight(0xff80C0, 1, 0);
		    light.position.set(200, 100, 300);
		    scene.add(light);

			
			// Sizes

			const sizes = {
			    width: window.innerWidth,
			    height: window.innerHeight
			}			

		    function resizeCanvasToDisplaySize() {
		      const canvas = renderer.domElement;
		      const width = canvas.clientWidth;
		      const height = canvas.clientHeight;

		      // you must pass false here or three.js sadly fights the browser
		      renderer.setSize(width, height, false);
		      camera.aspect = width / height;
		      camera.updateProjectionMatrix();

		      // set render target sizes here
		    }			


			// Other

		    const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
		    resizeObserver.observe(renderer.domElement, {box: 'content-box'});

			function animate() {
				requestAnimationFrame( animate );

				

				renderer.render( scene, camera );
			};

			animate();	