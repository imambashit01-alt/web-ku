let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 6;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background stars
let loader = new THREE.TextureLoader();
let starsTexture = loader.load('textures/stars.jpg');
scene.background = starsTexture;

// Lights
let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);

// Controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Globe
let geometry = new THREE.SphereGeometry(2, 128, 128);
let textureDay = loader.load('textures/earth_bw.jpg');
let textureNight = loader.load('textures/earth_night_lights.jpg');

let globeMaterial = new THREE.MeshStandardMaterial({ map: textureNight });
let globe = new THREE.Mesh(geometry, globeMaterial);
scene.add(globe);

// Hover country name (simple example)
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Theme toggle
let isDark = true;
document.querySelector('.theme-toggle').addEventListener('click', () => {
    isDark = !isDark;
    document.body.style.backgroundColor = isDark ? 'black' : 'white';
    globe.material.map = isDark ? textureNight : textureDay;
    globe.material.needsUpdate = true;
});

// Animate
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002;

    // Hover logic (optional: display country name)
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObject(globe);
    if(intersects.length > 0){
        // Bisa tambahkan tooltip nama negara di sini
    }

    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
