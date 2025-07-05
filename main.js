// ✅ 모듈 CDN에서 불러오기 (three.js + GLTFLoader)
import * as THREE from 'https://esm.sh/three@0.160.1';
import { GLTFLoader } from 'https://esm.sh/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';


// 🌍 씬 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);




// 👇 추가 버튼으로 추가된 부분
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableObjects = []; // 클릭 가능한 오브젝트 저장용



let model;
const loader = new GLTFLoader();

let mainButtonModel;
let textModel;

loader.load('main_button.glb', gltf => {
  mainButtonModel = gltf.scene;
  mainButtonModel.scale.set(0.5, 0.5, 0.5);
  scene.add(mainButtonModel);

  const startBtn = mainButtonModel.getObjectByName('startbutton1');
  const userBtn = mainButtonModel.getObjectByName('userbutton');
  if (startBtn) clickableObjects.push(startBtn);
  if (userBtn) clickableObjects.push(userBtn);
});

loader.load('readyText.glb', gltf => {
  model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  scene.add(model);

  // 👇 버튼 이름으로 가져오기 (Blender에서 이 이름 확인!)
  const startBtn = model.getObjectByName('startbutton1');
  const userBtn = model.getObjectByName('userbutton');

  // 👉 클릭 가능한 오브젝트로 등록
  if (startBtn) clickableObjects.push(startBtn);
  if (userBtn) clickableObjects.push(userBtn);
});

window.addEventListener('click', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableObjects, true);

  if (intersects.length > 0) {
    const clicked = intersects[0].object.name;
    if (clicked === 'startbutton1') {
      showPopup1();
    } else if (clicked === 'userbutton') {
      showPopup2();
    }
  }
});






const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  if (model) {
    const t = clock.getElapsedTime();
    model.position.y = Math.sin(t * 2) * 0.05;
  }
  renderer.render(scene, camera);
}
animate();


// 버튼 추가로 인한 자바스크립트 팝업 함수
function showPopup1() {
  const gif = document.getElementById('introGif');
  const staticImage = document.getElementById('staticImage');

    // 👉 1. 버튼 & 텍스트 모델 숨기기
  if (model) model.visible = false;         // readyText.glb 숨김
  if (mainButtonModel) mainButtonModel.visible = false;  // main_button.glb 숨김

  // 정적 이미지 숨기고, GIF 보이기
  staticImage.style.display = 'none';
  gif.style.display = 'block';

  // ⏱ GIF 한 번 재생 시간 이후 페이지 이동 (예: 5초)
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 445);  // 필요에 따라 시간 조절 가능
}


function showPopup2() {
  document.getElementById('popup2').style.display = 'block';
}
