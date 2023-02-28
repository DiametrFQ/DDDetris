# 🚀 DDDetris

It's just Tetris, but in 3D
The idea of creating this project was prompted by a banal desire to learn Three.js, but some features of 3D Tetris appeared that would make my life easier if I knew about them in advance.

## Stack technologies

<img src="https://repository-images.githubusercontent.com/206151984/51772d00-ce6e-11e9-996b-d311d1928950" width="150" height="150"> <img src="https://user-images.githubusercontent.com/70712590/221964905-304b889d-6f83-4523-8a29-0a74ca02a560.png" width="150" height="150"> <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="150" height="150"> <img src="https://user-images.githubusercontent.com/70712590/221966386-fec95056-b69c-4751-b7b9-224c36b250e4.png" width="250" height="150"> <img src="https://res.cloudinary.com/arcjet-media/image/upload/v1608734952/z8hzeszc9eb3sp3vp3qc.jpg" width="150" height="150">

Webpack Three.js TypeScript SCSS/Tailwid

## Lean and turn figures

The lean and turn figures use the formulas:

Xn+1 = Xn + ((Xp - Xn) + (Yp - Yn)); <br/>
Yn+1 = Xn - ((Xp - Xn) - (Yp - Yn));

In code it looks like this:

```
const newCrdnt1 = childCrdnt1 + ((parentCrdnt1 - childCrdnt1) + (parentCrdnt2 - childCrdnt2));
const newCrdnt2 = childCrdnt2 - ((parentCrdnt1 - childCrdnt1) - (parentCrdnt2 - childCrdnt2));
```

Where: <br/>
X and Y - coordinates of the cube (a separate part of the figure) and instead of them, the coordinates X, Y and Z can be used <br/>
p - indicates that the parent coordinate is used (around which the cube rotates) <br/>
n - indicates that the coordinate of the rotating cube is used <br/>
n+1 - new coordinate of the rotating cube

In the example above, if there are similar X and Y coordinates beyond the X and Y location, the cube leans to the right <br/>
*These formulas are also suitable for use in vanilla 2d tetris

PS: As it turned out, these formulas only work if X > 0, Y > 0 and Z > 0 or X < 0, Y < 0 and Z < 0. Because of this, the platform coordinates were moved from 0 0 0 to 1000 1000 1000

## Adaptive rotation
Also, the rotation of the figure becomes adaptive depending on which side you look at the platform on which the figures fall.

Tilt and roll figures use checks:

```
const backSide = (Z < 0 && Z * -1 > Math.abs(X))
const rightSide = (X > 0 && X > Math.abs(Z))
const leftSide = (X < 0 && X * -1 > Math.abs(Z))
const front = (Z > 0 && Z > Math.abs(X))
```
Where:
Z and X - similar camera coordinates

PS: As it turned out, these checks work if the camera rotates around the coordinate 0 0 0, and as we remember, we switched to the coordinate 1000 1000 1000. Because of this, we have to subtract 1000 from the camera coordinates (X-=1000, Y-=1000, Z -=1000 ).

PPS: Maybe I should have commented about this in the code, sorry

## How let's play in DDDetris?
You can run this project in 2 ways:

1 by clicking on the link: https://dddetris.vercel.app

2 You should download Node.js(https://nodejs.org/), after cloning or downloading the project, write in the path of the unpacked file:

```
npm install
```
```
npx webpack serve
```

## License

MIT

