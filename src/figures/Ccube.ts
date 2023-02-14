import * as THREE from 'three';
import Afigure from '../Interfaces/AFigure';

class Ccube extends Afigure
{
    create = () :THREE.Mesh[] => 
    {
        //const geometry:[number,number,number] = [t];

        this.mesh = new THREE.Mesh
        (
            new THREE.BoxGeometry(...this.geometryFigure),
            new THREE.MeshStandardMaterial({ color: this.color})
        );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.mesh.position.set(...this.position);

        const parentCubeMesh2 = new THREE.Mesh
        (
            new THREE.BoxGeometry(...this.geometryFigure),
            new THREE.MeshStandardMaterial({ color: this.color})
        );
        parentCubeMesh2.receiveShadow = true;
        parentCubeMesh2.castShadow = true;
        parentCubeMesh2.position.set(0,100,0);

        return [this.mesh, parentCubeMesh2];
    }
    turnFront(){}

}
export default Ccube;