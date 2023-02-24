import * as THREE from 'three';
import Afigure from '../Interfaces/AFigure';

class CT extends Afigure
{
    create(): THREE.Mesh[]
    {
        this.mesh.push(this.createChildren(this.geometryFigure))
        this.mesh[0].position.set(...this.position);


        {
            this.mesh.push(this.createChildren(
                [
                    100 + this.mesh[0].position.x,
                    0 + this.mesh[0].position.y,
                    0 + this.mesh[0].position.z
                ]
            ))


            this.mesh.push(this.createChildren(
                [
                    -100 + this.mesh[0].position.x, 
                    0 + this.mesh[0].position.y,
                    0 + this.mesh[0].position.z
                ]
            ))

            this.mesh.push(this.createChildren(
                [
                    0 + this.mesh[0].position.x,
                    0 + this.mesh[0].position.y,
                    100 + this.mesh[0].position.z
                ]
            ))

            this.mesh.push(this.createChildren(
                [
                    0 + this.mesh[0].position.x,
                    0 + this.mesh[0].position.y,
                    100 + this.mesh[0].position.z
                ]
            ))

            this.mesh.push(this.createChildren(
                [
                    0 + this.mesh[0].position.x,
                    100 + this.mesh[0].position.y,
                    0 + this.mesh[0].position.z
                ]
            ))

        }

        return this.mesh
    }


    private createChildren(position: [number, number, number]): THREE.Mesh
    {
        const geometry: [number, number, number] = [...this.geometryFigure];
        const cubeMesh = new THREE.Mesh
        (
            new THREE.BoxGeometry(...geometry),
            new THREE.MeshStandardMaterial({ color: this.color,  depthWrite: false, transparent: true, opacity: 2})
        );
        cubeMesh.position.set(...position);
        cubeMesh.receiveShadow = true;
        cubeMesh.castShadow = true;

        return cubeMesh;
    }

    // turnFront(): void 
    // {
    //     // if(this.cubes[1].position.z > this.cubes[0].position.z){
    //     //     this.cubes[0].position.set(this.cubes[1].position.x, this.cubes[1].position.y, this.cubes[1].position.z);
    //     //     this.cubes[1].position.set(this.cubes[2].position.x, this.cubes[2].position.y, this.cubes[2].position.z);
    //     //     this.cubes[2].position.set(this.cubes[3].position.x, this.cubes[3].position.y, this.cubes[3].position.z);
    //     //     this.cubes[3].position.set(this.cubes[0].position.x, this.cubes[0].position.y, this.cubes[0].position.z - 100);
    //     // }
    //     for (let i = 1; i < this.cubes.length; i++)
    //     {
    //         console.log(this.cubes[i].position.x < this.cubes[0].position.x);
    //         if(this.cubes[i].position.y > this.cubes[0].position.y && this.cubes[i].position.z === this.cubes[0].position.z && this.cubes[i].position.x === this.cubes[0].position.x)
    //         {
    //             this.cubes[i].position.set(this.cubes[0].position.x, this.cubes[0].position.y +100, this.cubes[0].position.z -100);
    //         }

    //         if(this.cubes[i].position.y < this.cubes[0].position.y && this.cubes[i].position.z === this.cubes[0].position.z && this.cubes[i].position.x === this.cubes[0].position.x)
    //         {
    //             this.cubes[i].position.set(this.cubes[0].position.x, this.cubes[0].position.y -100, this.cubes[0].position.z+100);
    //         }

    //         // if(this.cubes[i].position.x < this.cubes[0].position.x)
    //         // {
    //         //     this.cubes[i].position.set(this.cubes[0].position.x - 100, this.cubes[0].position.y + 100, this.cubes[0].position.z);
    //         // }

    //         // if(this.cubes[i].position.x > this.cubes[0].position.x)
    //         // {
    //         //     this.cubes[i].position.set(this.cubes[0].position.x + 100, this.cubes[0].position.y + 100, this.cubes[0].position.z);
    //         // }
    //         if(this.cubes[i].position.z < this.cubes[0].position.z && this.cubes[i].position.y === this.cubes[0].position.y && this.cubes[i].position.x === this.cubes[0].position.x)
    //         {
    //             this.cubes[i].position.set(this.cubes[0].position.x , this.cubes[0].position.y - 100, this.cubes[0].position.z+ 100);
    //         }

    //         if(this.cubes[i].position.z > this.cubes[0].position.z && this.cubes[i].position.y === this.cubes[0].position.y && this.cubes[i].position.x === this.cubes[0].position.x)
    //         {
    //             this.cubes[i].position.set(this.cubes[0].position.x, this.cubes[0].position.y - 100, this.cubes[0].position.z- 100);
    //         }
    //     }
    // }


    //     const X = camera.position.x
    //     const Z = camera.position.z
    
    //     //const front = (Z > 0 && Z > Math.abs(X) )
    //     const back = (Z < 0 && Z * -1 > Math.abs(X))
    //     const right = (X > 0 && X > Math.abs(Z))
    //     const left = (X < 0 && X * -1 > Math.abs(Z))
    // }
}

export default CT;