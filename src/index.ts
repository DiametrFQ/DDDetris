import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Cplatform from './figures/Cplatform';
// import Cborder from './figures/Cborder';
// import Ccube from './figures/Ccube';
import CT from './figures/CT';
// // import Ifigure from './Interfaces/Ifigure';
import Clight from './light/Clight';
// import getRandom from './gameScripts/getRandom';
import onWindowResize from './gameScripts/onWindowResize';
import Afigure from './Interfaces/AFigure';
// import Afigure from './Interfaces/AFigure';

const ternCube2 = (parentCrdnt1 :number, parentCrdnt2 :number, childCrdnt1 :number, childCrdnt2 :number) :[number, number] => 
{
    const newCrdnt1 = childCrdnt1 + ((parentCrdnt1 - childCrdnt1) + (parentCrdnt2 - childCrdnt2));
    const newCrdnt2 = childCrdnt2 - ((parentCrdnt1 - childCrdnt1) - (parentCrdnt2 - childCrdnt2));

    return [newCrdnt1, newCrdnt2]
}

// const turnCube = (cubeChild :THREE.Mesh, cubeParent :THREE.Mesh) => 
// {

//     // //в право по Y
//     // const newChildX = childX + ((parentX - childX) + (parentY - childY));
//     // const newChildY = childY - ((parentX - childX) - (parentY - childY));

//     // //в право по Y
//     // const newChildY = childY + ((parentY - childY) + (parentX - childX));
//     // const newChildX = childX - ((parentY - childY) - (parentX - childX));

//     // //в право по Z
//     // const newChildX = childX + ((parentX - childX) + (parentZ - childZ));
//     // const newChildZ = childZ - ((parentX - childX) - (parentZ - childZ));

//     // //в лево по Z
//     //const newChildZ = childZ + ((parentZ - childZ) + (parentX - childX));
//     //const newChildX = childX - ((parentZ - childZ) - (parentX - childX));
// }

document.onkeydown = event => 
{
    const X = camera.position.x -1000
    const Z = camera.position.z -1000

    /// Conditions for determining the position of the camera relative to the initial position
    /// the initial position is considered to be the "front" position
    /// the "back" position is considered to be the position in which the camera is behind the initial position etc.

    const back = (Z < 0 && Z * -1 > Math.abs(X))
    const right = (X > 0 && X > Math.abs(Z))
    const left = (X < 0 && X * -1 > Math.abs(Z))
    //const front = (Z > 0 && Z > Math.abs(X) )

    const checkEk = (directionKeys: string[]) => directionKeys.includes(event.key);
    if (checkEk(['ArrowUp',])) 
    {
        back?  activeFigure.moveBack(passiveCubes) : 
        right? activeFigure.moveLeft(passiveCubes) : 
        left?  activeFigure.moveRight(passiveCubes) : 

        activeFigure.moveFront(passiveCubes)
    }
    else if (checkEk(['ArrowDown',])) 
    {
        back?  activeFigure.moveFront(passiveCubes) : 
        right? activeFigure.moveRight(passiveCubes) : 
        left?  activeFigure.moveLeft(passiveCubes) :

        activeFigure.moveBack(passiveCubes)
    }
    else if (checkEk(['ArrowRight',]))
    {
        back?  activeFigure.moveLeft(passiveCubes) : 
        right? activeFigure.moveFront(passiveCubes) : 
        left?  activeFigure.moveBack(passiveCubes) :

        activeFigure.moveRight(passiveCubes)
    }
    else if (checkEk(['ArrowLeft',]))
    {
        back? activeFigure.moveRight(passiveCubes) : 
        right? activeFigure.moveBack(passiveCubes) : 
        left? activeFigure.moveFront(passiveCubes) :

        activeFigure.moveLeft(passiveCubes)
    }
    if (checkEk(['W', 'w', 'ц', 'Ц', ])) 
    {
        back? activeFigure.leanBack(passiveCubes, platform) : 
        right? activeFigure.leanLeft(passiveCubes, platform)  : 
        left? activeFigure.leanRight(passiveCubes, platform)  :

        activeFigure.leanForward(passiveCubes, platform)
    }
    else if (checkEk(['S', 's', 'ы', 'Ы', ])) 
    {
        back? activeFigure.leanForward(passiveCubes, platform) : 
        right? activeFigure.leanRight(passiveCubes, platform)  : 
        left? activeFigure.leanLeft(passiveCubes, platform)  :

        activeFigure.leanBack(passiveCubes, platform)
    }
    else if (checkEk(['A', 'a', 'ф', 'Ф', ]))
    {
        back? activeFigure.leanBack(passiveCubes, platform) : 
        right? activeFigure.leanLeft(passiveCubes, platform)  : 
        left? activeFigure.leanForward(passiveCubes, platform)  :

        activeFigure.leanLeft(passiveCubes, platform)
    }
    else if (checkEk(['D', 'd', 'в', 'В', ]))
    { 
        back? activeFigure.leanBack(passiveCubes, platform) : 
        right? activeFigure.leanLeft(passiveCubes, platform) : 
        left? activeFigure.leanRight(passiveCubes, platform) :

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

const passiveCubes: THREE.Mesh[] = []
const activeCubes: THREE.Mesh[] = []
let activeFigure: Afigure

const getRandomArbitrary = (min: number, max: number) => 
{

    let num = Math.floor(Math.random() * (max - min) + min);

    return num;
};

const spawn = () =>
{
    const colors = [0x00ff00, 0x000000, 0xff0000, 0x0000ff, 0xff00ff, 0xb14bff, ];
    let color = colors[getRandomArbitrary(0, colors.length)];

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
        activeCubes.forEach(cube => passiveCubes.push(cube));
        activeCubes.length = 0;
        spawn();
    }
}, 1000);

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