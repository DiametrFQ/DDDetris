import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Cplatform from './figures/Cplatform';
// import Cborder from './figures/Cborder';
// import Ccube from './figures/Ccube';
import CT from './figures/CT';
import Clight from './light/Clight';
// import getRandom from './gameScripts/getRandom';
import onWindowResize from './gameScripts/onWindowResize';
import Afigure from './Interfaces/AFigure';

const passiveCubes: THREE.Mesh[] = []
const activeCubes: THREE.Mesh[] = []
const checkFull :THREE.Mesh[][] = [[],[],[],[],[],[],[],[],[],[]]
let activeFigure: Afigure
let timer = 1000

document.onkeydown = event => 
{
    const X = camera.position.x -1000
    const Z = camera.position.z -1000

    /// Conditions for determining the position of the camera relative to the initial position
    /// the initial position is considered to be the "front" position
    /// the "back" position is considered to be the position in which the camera is behind the initial position etc.

    const backSide = (Z < 0 && Z * -1 > Math.abs(X))
    const rightSide = (X > 0 && X > Math.abs(Z))
    const leftSide = (X < 0 && X * -1 > Math.abs(Z))
    //const front = (Z > 0 && Z > Math.abs(X) )

    const checkEk = (directionKeys: string[]) => directionKeys.includes(event.key);
    if (checkEk(['ArrowUp',])) 
    {
        backSide?  activeFigure.moveBack(passiveCubes) : 
        rightSide? activeFigure.moveLeft(passiveCubes) : 
        leftSide?  activeFigure.moveRight(passiveCubes) : 

        activeFigure.moveFront(passiveCubes)
    }
    else if (checkEk(['ArrowDown',])) 
    {
        backSide?  activeFigure.moveFront(passiveCubes) : 
        rightSide? activeFigure.moveRight(passiveCubes) : 
        leftSide?  activeFigure.moveLeft(passiveCubes) :

        activeFigure.moveBack(passiveCubes)
    }
    else if (checkEk(['ArrowRight',]))
    {
        backSide?  activeFigure.moveLeft(passiveCubes) : 
        rightSide? activeFigure.moveFront(passiveCubes) : 
        leftSide?  activeFigure.moveBack(passiveCubes) :

        activeFigure.moveRight(passiveCubes)
    }
    else if (checkEk(['ArrowLeft',]))
    {
        backSide?  activeFigure.moveRight(passiveCubes) : 
        rightSide? activeFigure.moveBack(passiveCubes) : 
        leftSide?  activeFigure.moveFront(passiveCubes) :

        activeFigure.moveLeft(passiveCubes)
    }
    if (checkEk(['W', 'w', 'ц', 'Ц', ])) 
    {
        backSide? activeFigure.leanBack(passiveCubes, platform) : 
        rightSide? activeFigure.leanLeft(passiveCubes, platform)  : 
        leftSide? activeFigure.leanRight(passiveCubes, platform)  :

        activeFigure.leanForward(passiveCubes, platform)
    }
    else if (checkEk(['S', 's', 'ы', 'Ы', ])) 
    {
        backSide? activeFigure.leanForward(passiveCubes, platform) : 
        rightSide? activeFigure.leanRight(passiveCubes, platform)  : 
        leftSide? activeFigure.leanLeft(passiveCubes, platform)  :

        activeFigure.leanBack(passiveCubes, platform)
    }
    else if (checkEk(['A', 'a', 'ф', 'Ф', ]))
    {
        backSide? activeFigure.leanRight(passiveCubes, platform) : 
        rightSide? activeFigure.leanBack(passiveCubes, platform)  : 
        leftSide? activeFigure.leanForward(passiveCubes, platform)  :

        activeFigure.leanLeft(passiveCubes, platform)
    }
    else if (checkEk(['D', 'd', 'в', 'В', ]))
    { 
        backSide? activeFigure.leanLeft(passiveCubes, platform) : 
        rightSide? activeFigure.leanForward(passiveCubes, platform) : 
        leftSide? activeFigure.leanBack(passiveCubes, platform) :

        activeFigure.leanRight(passiveCubes, platform)
    }
    else if (checkEk(['Q', 'q', 'й', 'Й']))
    {
        activeFigure.turnLeft(passiveCubes, platform)
    }
    else if (checkEk(['E', 'e', 'у', 'У']))
    {
        activeFigure.turnRight(passiveCubes, platform)
    }
    if (checkEk([' ',]))
    {
        if(
            !detectMeshCollision("y", activeCubes, [platform.Mesh]) && 
            !detectMeshCollision("y", activeCubes, passiveCubes)
        )
        {
            activeCubes.forEach(cube => cube.position.y -= 100);
        }
    }
}

const detectMeshCollision = (xyz :string, activeCubes :THREE.Mesh[], passiveCubes :THREE.Mesh[]): boolean =>
{
    for (const aCube of activeCubes) 
    {
        for (const pCube of passiveCubes) 
        {
            xyz === "x" ? aCube.geometry = new THREE.BoxGeometry(100, 1, 1): 
            xyz === "y" ? aCube.geometry = new THREE.BoxGeometry(1, 100, 1):    
            xyz === "z" ? aCube.geometry = new THREE.BoxGeometry(1, 1, 100): null;

            const box1 = new THREE.Box3().setFromObject(aCube, true);
            const box2 = new THREE.Box3().setFromObject(pCube, true);

            aCube.geometry = new THREE.BoxGeometry(100, 100, 100)

            if(box1.intersectsBox(box2))
            {
                return true
            }
        }
    }
    return false;
}


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('threejs').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8071FE);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.rotation.set( Math.PI / 6, Math.PI / 6, -Math.PI / 4);
camera.position.set(2050, 2250, 2050);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target = new THREE.Vector3(1000,1000,1000)
orbit.update();

const platform = new Cplatform('green', [1000, 1000, 1000]);
scene.add(platform.create());

const light = new Clight(0xffffff, [1000, 3000, 1000], 10, 3000);
scene.add(...light.createWithHelpers(platform.Mesh));

const getRandomArbitrary = (min: number, max: number) => 
{
    return Math.floor(Math.random() * (max - min) + min);
};

const spawn = () =>
{
    const colors = [0x00ff00, 0x000000, 0xff0000, 0x0000ff, 0xff00ff, 0xb14bff, ];
    const color = colors[getRandomArbitrary(0, colors.length)];

    activeFigure = new CT(color, [1000,1450,1000]);

    activeFigure.create()

    for (const cube of activeFigure.mesh) 
    {
        scene.add(cube);
        activeCubes.push(cube);
    }
}

spawn();

setInterval(() => 
{
    if(
        !detectMeshCollision("y", activeCubes, [platform.Mesh]) && 
        !detectMeshCollision("y", activeCubes, passiveCubes))
    {
        activeCubes.forEach(cube => cube.position.y -= 100);
    }
    else
    {

        activeCubes.forEach(cube => 
            {  
                checkFull[(cube.position.y-1050) / 100 ].push(cube)
                passiveCubes.push(cube)
            }
        );
        for (const line of checkFull) {
            if(line.length === 225)
            {
                for (const cube of line) {
                    scene.remove(cube)
                }
                for (const cube of passiveCubes) {
                    cube.position.y -= 100
                }
            }
        }
        activeCubes.length = 0;
        spawn();
    }
}, timer);

function animate() 
{  
    onWindowResize(camera, renderer);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();