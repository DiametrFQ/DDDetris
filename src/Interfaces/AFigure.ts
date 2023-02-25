import * as THREE from 'three';
import Cplatform from '../figures/Cplatform';

abstract class Afigure 
{
    protected geometryFigure: [number, number, number] = [100, 100, 100];
    protected position: [number, number, number];
    protected color: number;

    mesh: THREE.Mesh[] = [];
    //border: number = 600;

    constructor(color: number, position: [number, number, number]) 
    {
        this.color = color;
        this.position = position;
    }

    abstract create() :THREE.Mesh[];

    private ternCube = ( 
      parentCrdnt1 :number, parentCrdnt2 :number, 
      childCrdnt1 :number, childCrdnt2 :number
    ) :[number, number] => 
    {
        const newCrdnt1 = childCrdnt1 + ((parentCrdnt1 - childCrdnt1) + (parentCrdnt2 - childCrdnt2));
        const newCrdnt2 = childCrdnt2 - ((parentCrdnt1 - childCrdnt1) - (parentCrdnt2 - childCrdnt2));

        return [newCrdnt1, newCrdnt2]
    }
    private checkCollisionDown = (mesh :THREE.Mesh, passiveCubes: THREE.Mesh[], platform: Cplatform): boolean => 
    {
        mesh.position.y -= 100
        const downCollision = this.detectMeshCollision(passiveCubes)
        mesh.position.y += 100
    
        return downCollision
    }
    private detectMeshCollision = (passiveCubes :THREE.Mesh[]): boolean =>
    {
        for (const aCube of this.mesh) 
        {
            for (const pCube of passiveCubes) 
            {
                if
                (
                    aCube.position.x === pCube.position.x &&
                    aCube.position.y === pCube.position.y &&
                    aCube.position.z === pCube.position.z
                )
                {
                    return true
                }
            }
        }
        return false;
    }
    private determineOccupancy = (activeCubes :THREE.Mesh[], passiveCubes :THREE.Mesh[], platform :Cplatform) => 
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
    moveFront = (passiveCubes: THREE.Mesh[]) => 
    {
        for (const cubeChild of this.mesh) 
        {
            cubeChild.position.z -= 100
        }
        if(this.detectMeshCollision(passiveCubes)){
            for (const cubeChild of this.mesh) 
            {
                cubeChild.position.z += 100
            }
        }
    }
    moveRight = (passiveCubes: THREE.Mesh[]) => 
    {
        for (const cubeChild of this.mesh) 
        {
            cubeChild.position.x += 100
        }
        if(this.detectMeshCollision(passiveCubes)){
            for (const cubeChild of this.mesh) 
            {
                cubeChild.position.x -= 100
            }
        }
    }
    moveBack = (passiveCubes: THREE.Mesh[]) => 
    {
        for (const cubeChild of this.mesh) 
        {
            cubeChild.position.z += 100
        }
        if(this.detectMeshCollision(passiveCubes)){
            for (const cubeChild of this.mesh) 
            {
                cubeChild.position.z -= 100
            }
        }
    }
    moveLeft = (passiveCubes: THREE.Mesh[]) => 
    {
        for (const cubeChild of this.mesh) 
        {
            cubeChild.position.x -= 100
        }
        if(this.detectMeshCollision(passiveCubes)){
            for (const cubeChild of this.mesh) 
            {
                cubeChild.position.x += 100
            }
        }
    }
    lean = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.z, cubes.position.y] = this.ternCube
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
    leanForward = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.z, cubes.position.y] = this.ternCube
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
            [cubes.position.y, cubes.position.z] = this.ternCube
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
    leanRight = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.y, cubes.position.x] = this.ternCube
            (
                this.mesh[0].position.y, this.mesh[0].position.x, 
                cubes.position.y, cubes.position.x
            ); 
        }
        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanLeft(passiveCubes, platform)
        } 
    }
    leanLeft = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.x, cubes.position.y] = this.ternCube
            (
                this.mesh[0].position.x, this.mesh[0].position.y, 
                cubes.position.x, cubes.position.y
            );  
        }

        if(this.determineOccupancy(this.mesh, passiveCubes, platform))
        {
            this.leanRight(passiveCubes, platform)
        }
    }
    turnLeft = (passiveCubes: THREE.Mesh[], platform :Cplatform) => 
    {
        for (const cubes of this.mesh) 
        {
            [cubes.position.z, cubes.position.x] = this.ternCube
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
            [cubes.position.x, cubes.position.z] = this.ternCube
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