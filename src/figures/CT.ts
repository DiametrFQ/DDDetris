import * as THREE from 'three';
import Afigure from '../Interfaces/AFigure';

class CT extends Afigure
{
    // getChildrenBodys(): CANNON.Body[]
    // {
    //     return this.cubeBodys;
    // }

    create(): THREE.Mesh[]
    {
        // this.mesh = new THREE.Mesh
        // (
        //     new THREE.BoxGeometry(...geometry), 
        //     new THREE.MeshStandardMaterial({ color: this.color,  depthWrite: false, transparent: true, opacity: 2})
        // );
        // this.mesh.position.set(...this.position);
        // this.mesh.receiveShadow = true;
        // this.mesh.castShadow = true;

        this.mesh = this.createChildren(this.geometryFigure)



        //for (let i = 1; i < 2; i++) 
        {
            this.mesh.add(this.createChildren([100, 0,0]))
            this.mesh.add(this.createChildren([200, 0,0]))


            this.mesh.add(this.createChildren([-100, 0,0]))
            this.mesh.add(this.createChildren([-200, 0,0]))

            this.mesh.add(this.createChildren([0, 0, 100]))
            this.mesh.add(this.createChildren([0, 0, 200]))

            this.mesh.add(this.createChildren([0, 0, -100]))
            this.mesh.add(this.createChildren([0, 0, -200]))

            this.mesh.add(this.createChildren([0, 100,0]))

        }
        this.mesh.position.set(...this.position);

        //console.log(this.parentCube.children[0].position)
        return [this.mesh]
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