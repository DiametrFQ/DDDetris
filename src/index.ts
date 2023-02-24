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
// import Afigure from './Interfaces/AFigure';

const ternCube2 = (parentCrdnt1 :number, parentCrdnt2 :number, childCrdnt1 :number, childCrdnt2 :number) :[number, number] => 
{
    const newCrdnt1 = childCrdnt1 + ((parentCrdnt1 - childCrdnt1) + (parentCrdnt2 - childCrdnt2));
    const newCrdnt2 = childCrdnt2 - ((parentCrdnt1 - childCrdnt1) - (parentCrdnt2 - childCrdnt2));

    return [newCrdnt1, newCrdnt2]
}

const turnCube = (cubeChild :THREE.Mesh, cubeParent :THREE.Mesh) => 
{

    const parentX = cubeParent.position.x;
    const parentY = cubeParent.position.y;
    const parentZ = cubeParent.position.z;


    const childX = cubeChild.position.x;
    const childY = cubeChild.position.y;
    const childZ = cubeChild.position.z;

    // //в право по Y
    // const newChildX = childX + ((parentX - childX) + (parentY - childY));
    // const newChildY = childY - ((parentX - childX) - (parentY - childY));

    // //в право по Y
    // const newChildY = childY + ((parentY - childY) + (parentX - childX));
    // const newChildX = childX - ((parentY - childY) - (parentX - childX));

    // //в право по Z
    // const newChildX = childX + ((parentX - childX) + (parentZ - childZ));
    // const newChildZ = childZ - ((parentX - childX) - (parentZ - childZ));

    // //в лево по Z
    //const newChildZ = childZ + ((parentZ - childZ) + (parentX - childX));
    //const newChildX = childX - ((parentZ - childZ) - (parentX - childX));

    // //вверх
    //const newChildZ = childZ + ((parentZ - childZ) + (parentY - childY));
    //const newChildY = childY - ((parentZ - childZ) - (parentY - childY));
    [cubeChild.position.z, cubeChild.position.y] = ternCube2
    (
        cubeParent.position.z, cubeParent.position.y, 
        cubeChild.position.z, cubeChild.position.y
    );
    // //вниз
    //const newChildY = childY + ((parentY - childY) + (parentZ - childZ));
    //const newChildZ = childZ - ((parentY - childY) - (parentZ - childZ));

    //cubeChild.position.x = newChildX;
    //[cubeChild.position.y, cubeChild.position.z] = ternCube2(parentY, parentZ, childY, childZ);
    //[cubeChild.position.z, cubeChild.position.y] = ternCube2(parentZ, parentY, childZ, childY);

    //cubeChild.position.y = newChildY
    //cubeChild.position.z = newChildZ
}

document.onkeydown = event => {

    // const X = camera.position.x
    // const Z = camera.position.z

    // ///Conditions for determining the position of the camera relative to the initial position
    // ///the initial position is considered to be the "front" position
    // ///the "back" position is considered to be the position in which the camera is behind the initial position etc.

    // const back = (Z < 0 && Z * -1 > Math.abs(X))
    // const right = (X > 0 && X > Math.abs(Z))
    // const left = (X < 0 && X * -1 > Math.abs(Z))

    // //const front = (Z > 0 && Z > Math.abs(X) )

    const checkEk = (directionKeys: string[]) => directionKeys.includes(event.key);

    if (checkEk(['ArrowUp',])) 
    {
        // back?  activeFigureNow.moveBack(usedCubes) : 
        // right? activeFigureNow.moveLeft(usedCubes) : 
        // left?  activeFigureNow.moveRight(usedCubes) : 

        // activeFigureNow.moveFront(usedCubes);
        if(!detectMeshCollision("z", activeCubes, passiveCubes)){
            for (const cubeChild of activeCubes) 
            {
                cubeChild.position.z -= 100
            }
        }
    }
    else if (checkEk(['ArrowDown',])) 
    {
        // back?  activeFigureNow.moveFront(usedCubes) : 
        // right? activeFigureNow.moveRight(usedCubes) : 
        // left?  activeFigureNow.moveLeft(usedCubes) :

        // activeFigureNow.moveBack(usedCubes);
        if(!detectMeshCollision("z", activeCubes, passiveCubes)){
            for (const cubeChild of activeCubes) 
            {
                cubeChild.position.z += 100
            }
        }
    }
    else if (checkEk(['ArrowRight',]))
    {
        // back?  activeFigureNow.moveLeft(usedCubes) : 
        // right? activeFigureNow.moveFront(usedCubes) : 
        // left?  activeFigureNow.moveBack(usedCubes) :

        // activeFigureNow.moveRight(usedCubes);
        if(!detectMeshCollision("x", activeCubes, passiveCubes)){
            for (const cubeChild of activeCubes) 
            {
                cubeChild.position.x += 100
            }
        }
    }

    else if (checkEk(['ArrowLeft',]))
    {
        // back? activeFigureNow.moveRight(usedCubes) : 
        // right? activeFigureNow.moveBack(usedCubes) : 
        // left? activeFigureNow.moveFront(usedCubes) :

        // activeFigureNow.moveLeft(usedCubes);
        if(!detectMeshCollision("x", activeCubes, passiveCubes)){
            for (const cubeChild of activeCubes) 
            {
                cubeChild.position.x -= 100
            }
        }
    }

    if (checkEk(['W', 'w', 'ц', 'Ц', ])) 
    {
        const movedCubes :THREE.Mesh[] = []

        for (const cubeChild of activeCubes) 
        {
            movedCubes.push(cubeChild)

            turnCube(cubeChild, activeCubes[0])

            if(determineOccupancy(activeCubes, passiveCubes))
            {
                for (const movedCube of movedCubes) 
                {
                    turnCube(movedCube, activeCubes[0])
                    turnCube(movedCube, activeCubes[0])
                    turnCube(movedCube, activeCubes[0])
                }
                movedCubes.length = 0
                break
            }
        }
    }
//         else if (checkEk(['S', 's', 'ы', 'Ы', ])) { }
//         else if (checkEk(['A', 'a', 'ф', 'Ф', ])) { }

//         else if (checkEk(['D', 'd', 'в', 'В', ])) { }
    
//         else if (checkEk(['Q', 'q', 'й', 'Й'])) {}
//         else if (checkEk(['E', 'e', 'у', 'У'])) {}


    if (checkEk([' ',]))
    {
        if(
            !detectMeshCollision("y", activeCubes, [platform.Mesh]) && 
            !detectMeshCollision("y", activeCubes, passiveCubes)
        )
        {
            activeCubes.forEach(cube => cube.position.y -= 100);
        }
    } //activeFigureNow.moveDown(usedCubes, platform);
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
const determineOccupancy = (activeCubes :THREE.Mesh[], passiveCubes :THREE.Mesh[]) => 
{
    
    for (const activeCube of activeCubes) 
    {
        if(activeCube.position.y < platform.position[1])
        {
            return true
        }
        for (const passiveCube of passiveCubes) 
        {
            if(
                activeCube.position.x === passiveCube.position.x &&
                activeCube.position.y === passiveCube.position.y &&
                activeCube.position.z === passiveCube.position.z
            ){
                return true
            }
        }
    }
    return false
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

const getRandomArbitrary = (min: number, max: number) => 
{

    let num = Math.floor(Math.random() * (max - min) + min);

    return num;
};

const spawn = () =>
{
    const colors = [0x00ff00, 0x000000, 0xff0000, 0x0000ff, 0xff00ff, 0xb14bff, ];
    let color = colors[getRandomArbitrary(0, colors.length)];

    let cubes = new CT(color, [1000,1450,1000]);

    cubes.create()

    for (const cube of cubes.mesh) 
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