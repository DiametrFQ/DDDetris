import * as THREE from 'three';
//import Ifigure from '../Interfaces/Ifigure';
import Cplatform from '../figures/Cplatform';

// This class does not implement an interface because each shape needs to have its own create() and move() methods.
abstract class Afigure //implements Ifigure
{
    //Mesh: THREE.Mesh;
    geometryFigure: [number, number, number] = [100, 100, 100];
    position: [number, number, number];
    mesh: THREE.Mesh[] = [];
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
        for (const meshCube of this.mesh) {
            if(!platform.checkCollision(meshCube)){
                return true
            }
            if(!this.checkCollisionDown(meshCube, passiveCubes, platform))
            {
                meshCube.position.y -= 100
                return false;
            }
        }
        return true;
    }

    checkCollisionDown = (mesh :THREE.Mesh, passiveCubes: THREE.Mesh[], platform: Cplatform): boolean => 
    {
        mesh.position.y -= 100
        const downCollision = this.detectMeshCollision(passiveCubes)
        mesh.position.y += 100
    
        return downCollision
    }

    // checkCollisionForMove = (passiveCubes: THREE.Mesh[], zx: string, factor: number) => 
    // {
    //     if(zx === 'z')
    //     {
    //         this.mesh.position.z += 100 * factor
    //         if(this.detectMeshCollision(passiveCubes))
    //         {
    //             this.mesh.position.z -= 100 * factor
    //             return;
    //         }
    //     }
    //     if(zx === 'x')
    //     {
    //         this.mesh.position.x += 100 * factor
    //         if(this.detectMeshCollision(passiveCubes))
    //         {
    //             this.mesh.position.x -= 100 * factor
    //             return;
    //         }
    //     }
    // }

    // moveFront = (usedCubes: THREE.Mesh[]) => 
    // {
    //     this.checkCollisionForMove(usedCubes, 'z', -1)
    // }
    // moveLeft = (usedCubes: THREE.Mesh[]) => 
    // {
    //     this.checkCollisionForMove(usedCubes, 'x', -1)
    // }
    // moveRight = (usedCubes: THREE.Mesh[]) => 
    // {
    //     this.checkCollisionForMove(usedCubes, 'x', 1)
    // }
    // moveBack = (usedCubes: THREE.Mesh[]) => 
    // {
    //     this.checkCollisionForMove(usedCubes, 'z', 1)
    // }

    // tiltRight = () => {
    //     [cubeChild.position.z, cubeChild.position.y] = ternCube2
    //     (
    //         cubeParent.position.z, this.activeCubes[0].position.y, 
    //         cubeChild.position.z, activeCubes[0].position.y
    //     );
    // }

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
        for (const meshCube of this.mesh) {
            
        
            for (const pCube of passiveCubes) 
            {
                const box1 = new THREE.Box3().setFromObject(meshCube, true);
                const box2 = new THREE.Box3().setFromObject(pCube, true);

                if(box1.intersectsBox(box2))
                {
                    return true
                }
            }
        }
        return false;
    }

    protected determineOccupancy = (activeCubes :THREE.Mesh[], passiveCubes :THREE.Mesh[], platform :Cplatform) => 
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

    leanForward = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.z, cubes.position.y] = ternCube
            (
                this.mesh[0].position.z, this.mesh[0].position.y, 
                cubes.position.z, cubes.position.y
            ); 
        }
        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanBack(passiveCubes, platform)
        } 
    }

    leanBack = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.y, cubes.position.z] = ternCube
            (
                this.mesh[0].position.y, this.mesh[0].position.z, 
                cubes.position.y, cubes.position.z
            );   
        }

        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanForward(passiveCubes, platform)
        }
    }

    leanLeft = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.y, cubes.position.x] = ternCube
            (
                this.mesh[0].position.y, this.mesh[0].position.x, 
                cubes.position.y, cubes.position.x
            ); 
        }
        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanRight(passiveCubes, platform)
        } 
    }

    leanRight = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.x, cubes.position.y] = ternCube
            (
                this.mesh[0].position.x, this.mesh[0].position.y, 
                cubes.position.x, cubes.position.y
            );  
        }

        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanLeft(passiveCubes, platform)
        }
    }

    turnLeft = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.z, cubes.position.x] = ternCube
            (
                this.mesh[0].position.z, this.mesh[0].position.x, 
                cubes.position.z, cubes.position.x
            ); 
        }
        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.turnRight(passiveCubes, platform)
        } 
    }

    turnRight = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.x, cubes.position.z] = ternCube
            (
                this.mesh[0].position.x, this.mesh[0].position.z, 
                cubes.position.x, cubes.position.z
            );  
        }

        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.turnLeft(passiveCubes, platform)
        }
    }
}
export default Afigure;

const ternCube = (parentCrdnt1 :number, parentCrdnt2 :number, childCrdnt1 :number, childCrdnt2 :number) :[number, number] => 
{
    const newCrdnt1 = childCrdnt1 + ((parentCrdnt1 - childCrdnt1) + (parentCrdnt2 - childCrdnt2));
    const newCrdnt2 = childCrdnt2 - ((parentCrdnt1 - childCrdnt1) - (parentCrdnt2 - childCrdnt2));

    return [newCrdnt1, newCrdnt2]
}


const turnCube = (cubeChild :THREE.Mesh, cubeParent :THREE.Mesh) => 
{

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
}