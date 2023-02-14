// import * as THREE from 'three';

// class Cborder {
//     Mesh: THREE.Mesh;
//     position: [number, number, number];
//     private color: string;

//     constructor(color: string, position: [number, number, number]) 
//     {
//         this.color = color;
//         this.position = position;
//     }
    
//     create = (): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> =>
//     {
//         const geometry:[number,number,number] = [1500, 0.1, 1500];
//         this.Mesh = new THREE.Mesh
//         (
//             new THREE.BoxGeometry( ...geometry ),
//             new THREE.MeshStandardMaterial
//             ({ 
//                 color: this.color
//             })
//         );
//         this.Mesh.position.set(...this.position);
//         this.Mesh.receiveShadow = true;

//         //this.Body.collisionResponse = false; // no impact on other bodys
//         return this.Mesh;
//     }

//     checkCollision = (activeCube: THREE.Object3D) => 
//     {
//         const activeCubebox = new THREE.Box3().setFromObject(activeCube);
//         const platformbox = new THREE.Box3().setFromObject(this.Mesh);

//         return !platformbox.intersectsBox(activeCubebox)
//     }
// }
// export default Cborder;