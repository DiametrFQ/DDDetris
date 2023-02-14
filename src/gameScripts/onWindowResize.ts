export default function onWindowResize(camera : THREE.PerspectiveCamera, renderer : THREE.WebGLRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}