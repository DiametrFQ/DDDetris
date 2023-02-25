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


            // this.mesh.push(this.createChildren(
            //     [
            //         -100 + this.mesh[0].position.x, 
            //         0 + this.mesh[0].position.y,
            //         0 + this.mesh[0].position.z
            //     ]
            // ))

            this.mesh.push(this.createChildren(
                [
                    0 + this.mesh[0].position.x,
                    0 + this.mesh[0].position.y,
                    100 + this.mesh[0].position.z
                ]
            ))

            // this.mesh.push(this.createChildren(
            //     [
            //         0 + this.mesh[0].position.x,
            //         0 + this.mesh[0].position.y,
            //         100 + this.mesh[0].position.z
            //     ]
            // ))

            // this.mesh.push(this.createChildren(
            //     [
            //         0 + this.mesh[0].position.x,
            //         100 + this.mesh[0].position.y,
            //         0 + this.mesh[0].position.z
            //     ]
            // ))

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
}

export default CT;