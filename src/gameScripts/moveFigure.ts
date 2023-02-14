// import * as THREE from 'three'
// // import Ifigure from '../interfaces/Ifigure'
// import Afigure from '../Interfaces/AFigure';

// const move = (event: KeyboardEvent, activeFigureNow: Afigure, camera: THREE.Camera, usedCubes, platform) => {

//     const X = camera.position.x
//     const Z = camera.position.z

//     ///Conditions for determining the position of the camera relative to the initial position
//     ///the initial position is considered to be the "front" position
//     ///the "back" position is considered to be the position in which the camera is behind the initial position etc.

//     //const front = (Z > 0 && Z > Math.abs(X) )
//     const back = (Z < 0 && Z * -1 > Math.abs(X))
//     const right = (X > 0 && X > Math.abs(Z))
//     const left = (X < 0 && X * -1 > Math.abs(Z))

//     const checkEk = (directionKeys: string[]) => directionKeys.includes(event.key)

//     if (checkEk(['ArrowUp',])) 
//     {
//         back?  activeFigureNow.moveBack(usedCubes, platform) : 
//         right? activeFigureNow.moveLeft(usedCubes, platform) : 
//         left?  activeFigureNow.moveRight(usedCubes, platform) : 

//         activeFigureNow.moveFront(usedCubes, platform);
//     }
//     else if (checkEk(['ArrowRight',]))
//     {
//         back?  activeFigureNow.moveLeft(usedCubes, platform) : 
//         right? activeFigureNow.moveFront(usedCubes, platform) : 
//         left?  activeFigureNow.moveBack(usedCubes, platform) :

//         activeFigureNow.moveRight(usedCubes, platform);
//     }
//     else if (checkEk(['ArrowDown',])) 
//     {
//         back?  activeFigureNow.moveFront(usedCubes, platform) : 
//         right? activeFigureNow.moveRight(usedCubes, platform) : 
//         left?  activeFigureNow.moveLeft(usedCubes, platform) :

//         activeFigureNow.moveBack(usedCubes, platform);
//     }
//     else if (checkEk(['ArrowLeft',]))
//     {
//         back? activeFigureNow.moveRight(usedCubes, platform) : 
//         right? activeFigureNow.moveBack(usedCubes, platform) : 
//         left? activeFigureNow.moveFront(usedCubes, platform) :

//         activeFigureNow.moveLeft(usedCubes, platform);
//     }

//     else if (checkEk(['S', 's', 'ы', 'Ы', ])) { }
//     else if (checkEk(['A', 'a', 'ф', 'Ф', ])) { }
//     else if (checkEk(['W', 'w', 'ц', 'Ц', ])) 
//     {
//         console.log('W')
//         //activeFigureNow.rotationFront()
//     }
//     else if (checkEk(['D', 'd', 'в', 'В', ])) { }

//     // else if (checkEk(['Q', 'q', 'й', 'Й'])) turnCube(1)
//     // else if (checkEk(['E', 'e', 'у', 'У'])) turnCube(-1)

//     //else if (checkEk([' ',])) activeFigureNow.moveDown(usedCubes, platform);
// }