import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

scene = new THREE.Scene();

const fov = 70; // field of view
const aspect = window.innerWidth / window.innerHeight; // screen size
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(0.55, 64, 64);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,   
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
    bumpScale: 0.5
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudGeometry = new THREE.SphereGeometry(0.56, 64, 64);

const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// const cloudGeometry2 = new THREE.SphereGeometry(0.561, 55, 50);

// const cloudMesh2 = new THREE.Mesh(cloudGeometry2, cloudMaterial);
// scene.add(cloudMesh2);

const spaceGeometry = new THREE.SphereGeometry(80, 64, 64);

const spaceMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
})

const spaceMesh = new THREE.Mesh(spaceGeometry, spaceMaterial);
scene.add(spaceMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const animate = () =>{
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0045;
    cloudMesh.rotation.y -= 0.005;
    // cloudMesh2.rotation.x += 0.002;
    // cloudMesh2.rotation.y -= 0.0045;
    spaceMesh.rotation.y -= 0.0035;
    controls.update(),
    render();
}

const render = () =>{
    renderer.render(scene, camera);
}

animate();