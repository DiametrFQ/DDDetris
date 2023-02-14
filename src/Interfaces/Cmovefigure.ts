// import * as THREE from 'three';
// import Ifigure from '../Interfaces/Ifigure';
// import Cplatform from '../figures/Cplatform';
// import Cfigure from '../Interfaces/Cfigure';


// // This class does not implement an interface because each shape needs to have its own create() and move() methods.
// class CmoveFigure extends Cfigure
// {
//     moveDown = (usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform ) => 
//     {
//         if (
//             this.checkCollisionDown(usedCubes) &&
//             platform.checkCollision(this.cubes)
//         )
//         {
//             this.cubes.forEach(cube => cube.position.y -= 100)     
//         }
//     }  
//     checkCollisionLeft = (passiveCubes: THREE.Mesh[]): boolean => 
//     {    
//         for(const cube of this.cubes)
//         {
//             for(const passiveCube of passiveCubes)
//             {
//                 if(
//                     passiveCube.position.x === cube.position.x - 100 &&
//                     passiveCube.position.y === cube.position.y &&
//                     passiveCube.position.z === cube.position.z
//                 )
//                 {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
//     moveLeft = (usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform ) => 
//     {
//         if (
//             this.checkCollisionLeft(usedCubes) &&
//             !this.cubes.every(cube => cube.position.x < -this.border )
//         )
//         {
//             this.cubes.forEach(cube => cube.position.x -= 100)
//         }
//     }
//     checkCollisionRight = (passiveCubes: THREE.Mesh[]): boolean => 
//     {
//         for(const cube of this.cubes)
//         {
//             for(const passiveCube of passiveCubes)
//             {
//                 if(
//                     passiveCube.position.x === cube.position.x + 100 &&
//                     passiveCube.position.y === cube.position.y &&
//                     passiveCube.position.z === cube.position.z
//                 )
//                 {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
//     moveRight = (usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform) => 
//     {
//         if (
//             this.checkCollisionRight(usedCubes) &&
//             !this.cubes.every(cube => cube.position.x > this.border)
//         )
//         {
//             this.cubes.forEach(cube => cube.position.x += 100)
//         }
//     }
//     checkCollisionBack = (passiveCubes: THREE.Mesh[]): boolean => 
//     {
//         for(const cube of this.cubes)
//         {
//             for(const passiveCube of passiveCubes)
//             {
//                 if(
                    
//                     passiveCube.position.x === cube.position.x &&
//                     passiveCube.position.y === cube.position.y &&
//                     passiveCube.position.z === cube.position.z - 100
//                 )
//                 {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
//     moveBack = (usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform) => 
//     {
//         if (
//             this.checkCollisionBack(usedCubes) &&
//             !this.cubes.every(cube => cube.position.z > this.border )
//         )
//         {
//             this.cubes.forEach(cube => cube.position.z += 100)
//         }
//     }
//     checkCollisionFront = (passiveCubes: THREE.Mesh[]): boolean => 
//     {
//         for(const cube of this.cubes)
//         {
//             for(const passiveCube of passiveCubes)
//             {
//                 if(
//                     passiveCube.position.x === cube.position.x &&
//                     passiveCube.position.y === cube.position.y &&
//                     passiveCube.position.z === cube.position.z - 100
//                 )
//                 {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }
//     moveFront = (usedCubes: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[], platform: Cplatform) => 
//     {
//         if (
//             this.checkCollisionFront(usedCubes) &&
//             !this.cubes.every(cube => cube.position.z < -this.border )
//         )
//         {
//             this.cubes.forEach(cube => cube.position.z -= 100)
//         }
//     }
// }
// export default Cfigure;