import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initScene() {
    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    //orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);


   
    const objects = [];
    const OBJECT_COUNT = 100;
    const minPos = new THREE.Vector3(-100, -100, -200);
    const maxPos = new THREE.Vector3(100, 100, 100);
    
    for (let i = 0; i < OBJECT_COUNT; i++) {
        const obj ={
            mesh: new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({color: randomColor()})
            ),
            velocity: random3DDirection().multiplyScalar(randomSpeed()),
            update: function(){
                this.mesh.position.add(this.velocity);

                
                if(this.mesh.position.y < minPos.y){
                    this.mesh.position.y = maxPos.y;
                }
                if(this.mesh.position.y > maxPos.y){
                    this.mesh.position.y = minPos.y;
                }
                if(this.mesh.position.z < minPos.z){
                    this.mesh.position.z = maxPos.z;
                }
                if(this.mesh.position.z > maxPos.z){
                    this.mesh.position.z = minPos.z;
                }
                if(this.mesh.position.x < minPos.x){
                    this.mesh.position.x = maxPos.x;
                }
                if(this.mesh.position.x > maxPos.x){
                    this.mesh.position.x = minPos.x;
                }


            }
        };
        obj.mesh.position.copy(randomPosInSpace(minPos, maxPos));
        scene.add(obj.mesh);



        objects.push(obj);

        }
    


    camera.position.z = 15;

    const clock = new THREE.Clock();
    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        const delta = clock.getDelta();
        objects.forEach(obj => obj.update(delta));
    };

    animate();
}

/**
 * 
 * @param {THREE.Vector3} min 
 * @param {THREE.Vector3} max 
 */
function randomPosInSpace(min, max){
    return new THREE.Vector3(
        Math.random() * (max.x - min.x) + min.x,
        Math.random() * (max.y - min.y) + min.y,
        Math.random() * (max.z - min.z) + min.z
    );
}


function pickRandom(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
const colors = [
    0x012030,0x13678A, 0x45C4B0, 0x9AEBA3, 0xDAFDBA
];
function randomColor(){
    return pickRandom(colors);
}

function random3DDirection(){
    return new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).normalize();
}

const MIN_SPEED = 0.05;
const MAX_SPEED = 0.2;
function randomSpeed(){
    return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
}
