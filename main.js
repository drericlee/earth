// main.js

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from './OrbitControls.js';
const canvas = document.querySelector('canvas.webgl')

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere mesh
const radius = 5;
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, 50, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('texture.jpg'),
  })
);  
scene.add(sphere);

// Add orbit controls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Set up camera position
camera.position.z = 15;

// Add event listener for click event
renderer.domElement.addEventListener('mousedown', handleMouseDown);
renderer.domElement.addEventListener('mouseup', handleMouseUp);
renderer.domElement.addEventListener('mousemove', handleMouseMove);

// Define the coordinates of the Australia bounding box
const australiaBounds = {
  minLatitude: -40,
  maxLatitude: -8,
  minLongitude: -200,
  maxLongitude: -100,
};

// Define the coordinates of the Japan bounding box
const japanBounds = {
  minLatitude: 24,
  maxLatitude: 46,
  minLongitude: -200,
  maxLongitude: -100,
};

const maldivesBounds = {
  minLatitude: -5,
  maxLatitude: 10,
  minLongitude: -80,
  maxLongitude: 20,
};

let dragStart = null;

function handleMouseDown(event) {
  dragStart = {
    x: event.clientX,
    y: event.clientY
  };
}

function handleMouseUp(event) {
  if (dragStart) {
    const dragEnd = {
      x: event.clientX,
      y: event.clientY
    };

    const deltaX = Math.abs(dragEnd.x - dragStart.x);
    const deltaY = Math.abs(dragEnd.y - dragStart.y);

    if (deltaX < 5 && deltaY < 5) {
      handleClick(event);
    }

    dragStart = null;
  }
}

function handleMouseMove(event) {
  if (dragStart) {
    const dragEnd = {
      x: event.clientX,
      y: event.clientY
    };

    const deltaX = Math.abs(dragEnd.x - dragStart.x);
    const deltaY = Math.abs(dragEnd.y - dragStart.y);

    if (deltaX > 5 || deltaY > 5) {
      dragStart = null;
    }
  }
}

function handleClick(event) {
  // Calculate the normalized device coordinates (NDC) of the click
  const clickX = (event.clientX / window.innerWidth) * 2 - 1;
  const clickY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set up a raycaster from the camera's perspective
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x: clickX, y: clickY }, camera);

  // Get the intersection point with the sphere
  const intersects = raycaster.intersectObject(sphere);
  if (intersects.length > 0) {
    const intersectionPoint = intersects[0].point;

    // Convert the intersection point to latitude and longitude
    const latitude = Math.asin(intersectionPoint.y / radius);
    const longitude = Math.atan2(intersectionPoint.z, intersectionPoint.x);

    // Check if the intersection point is within the Australia bounds
    if (
      latitude >= THREE.MathUtils.degToRad(australiaBounds.minLatitude) &&
      latitude <= THREE.MathUtils.degToRad(australiaBounds.maxLatitude) &&
      longitude >= THREE.MathUtils.degToRad(australiaBounds.minLongitude) &&
      longitude <= THREE.MathUtils.degToRad(australiaBounds.maxLongitude)
    ) {
      // Navigate to the URL associated with Australia
      window.location.href = 'australia.html';
    }

    // Check if the intersection point is within the Japan bounds
    if (
      latitude >= THREE.MathUtils.degToRad(japanBounds.minLatitude) &&
      latitude <= THREE.MathUtils.degToRad(japanBounds.maxLatitude) &&
      longitude >= THREE.MathUtils.degToRad(japanBounds.minLongitude) &&
      longitude <= THREE.MathUtils.degToRad(japanBounds.maxLongitude)
    ) {
      // Navigate to the URL associated with Japan
      window.location.href = 'japan.html';
    }

    if (
      latitude >= THREE.MathUtils.degToRad(maldivesBounds.minLatitude) &&
      latitude <= THREE.MathUtils.degToRad(maldivesBounds.maxLatitude) &&
      longitude >= THREE.MathUtils.degToRad(maldivesBounds.minLongitude) &&
      longitude <= THREE.MathUtils.degToRad(maldivesBounds.maxLongitude)
    ) {
      // Navigate to the URL associated with Japan
      window.location.href = 'maldives.html';
    }
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
