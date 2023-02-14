import * as THREE from 'three';
//import Ifigure from '../Interfaces/Ifigure';
import Cplatform from '../figures/Cplatform';

// This class does not implement an interface because each shape needs to have its own create() and move() methods.
abstract class Afigure //implements Ifigure
{
    //Mesh: THREE.Mesh;
    geometryFigure: [number, number, number] = [90, 90, 90];
    position: [number, number, number];
    mesh: THREE.Mesh;
    border: number = 600;

    protected color: number;

    constructor(color: number, position: [number, number, number]) 
    {
        this.color = color;
        this.position = position;
    }

    abstract create() :THREE.Mesh[];

    moveDown = (passiveCubes: THREE.Mesh[], platform: Cplatform) =>
    {
        if(!platform.checkCollision(this.mesh)){
            return true
        }
        if(!this.checkCollisionDown(passiveCubes, platform))
        {
            this.mesh.position.y -= 100
            return false;
        }
        return true;
    }

    checkCollisionDown = (passiveCubes: THREE.Mesh[], platform: Cplatform): boolean => 
    {
        this.mesh.position.y -= 100
        // for(let i = 0; i < 800000000; i++)
        // {
            
        // }
        const downCollision = this.detectMeshCollision(passiveCubes)
        this.mesh.position.y += 100

        return downCollision
    }

    checkCollisionForMove = (passiveCubes: THREE.Mesh[], zx: string, factor: number) => 
    {
        if(zx === 'z')
        {
            this.mesh.position.z += 100 * factor
            if(this.detectMeshCollision(passiveCubes))
            {
                this.mesh.position.z -= 100 * factor
                return;
            }
        }
        if(zx === 'x')
        {
            this.mesh.position.x += 100 * factor
            if(this.detectMeshCollision(passiveCubes))
            {
                this.mesh.position.x -= 100 * factor
                return;
            }
        }
    }

    moveFront = (usedCubes: THREE.Mesh[]) => 
    {
        this.checkCollisionForMove(usedCubes, 'z', -1)
    }
    moveLeft = (usedCubes: THREE.Mesh[]) => 
    {
        this.checkCollisionForMove(usedCubes, 'x', -1)
    }
    moveRight = (usedCubes: THREE.Mesh[]) => 
    {
        this.checkCollisionForMove(usedCubes, 'x', 1)
    }
    moveBack = (usedCubes: THREE.Mesh[]) => 
    {
        this.checkCollisionForMove(usedCubes, 'z', 1)
    }

    //move(turningSide: string, positionCamera: THREE.Vector3): void;

    //checkCollisionDown(cubes: THREE.Mesh[]): boolean;
    //moveDown(usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform ): void;

    //checkCollisionLeft(cubes: THREE.Mesh[]): boolean;


    // checkCollisionRotate(cubes: THREE.Mesh[]): boolean;
    // rotate(usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[]): void;
    //getPositions(): [number, number, number][];

    //rotationFront(): void;

    detectMeshCollision = (passiveCubes: THREE.Mesh[]): boolean =>
    {
        for (const pCube of passiveCubes) 
        {
            const box1 = new THREE.Box3().setFromObject(this.mesh, true);
            const box2 = new THREE.Box3().setFromObject(pCube, true);

            if(box1.intersectsBox(box2))
            {
                return true
            }
        }
        return false;
    }

}
export default Afigure;

// const turnCube = bool => {
//     let minX = null, maxX = null
//     let minZ = null, maxZ = null
//     let minY = null, maxY = null

//     for (let i = 1; i < amount + 1; i++) {

//         if (minX > cubes[cubes.length - i].position.x || minX === null) minX = cubes[cubes.length - i].position.x
//         if (minZ > cubes[cubes.length - i].position.z || minZ === null) minZ = cubes[cubes.length - i].position.z
//         if (minY > cubes[cubes.length - i].position.y || minY === null) minY = cubes[cubes.length - i].position.y

//         if (maxX < cubes[cubes.length - i].position.x || maxX === null) maxX = cubes[cubes.length - i].position.x
//         if (maxZ < cubes[cubes.length - i].position.z || maxZ === null) maxZ = cubes[cubes.length - i].position.z
//         if (maxY < cubes[cubes.length - i].position.y || maxY === null) maxY = cubes[cubes.length - i].position.y

//     }
//     let X = (maxX + minX) / 2, Y = (maxY + minY) / 2, Z = (maxZ + minZ) / 2

//     if (camera.position.z > 0 && camera.position.z > Math.abs(camera.position.x)) {
//         if (answer(-1 * bool, "x", X, Y, Z)) {
//             turn(-1 * bool, "x", X, Y, Z)
//         }
//     }
//     if (camera.position.z < 0 && camera.position.z * -1 > Math.abs(camera.position.x)) {
//         if (answer(bool, "x", X, Y, Z)) {
//             turn(bool, "x", X, Y, Z)
//         }
//     }
//     if (camera.position.x > 0 && camera.position.x > Math.abs(camera.position.z)) {
//         if (answer(bool, "z", X, Y, Z)) {
//             turn(bool, "z", X, Y, Z)
//         }
//     }
//     if (camera.position.x < 0 && camera.position.x * -1 > Math.abs(camera.position.z)) {
//         if (answer(-1 * bool, "z", X, Y, Z)) {
//             turn(-1 * bool, "z", X, Y, Z)
//         }
//     }

// }