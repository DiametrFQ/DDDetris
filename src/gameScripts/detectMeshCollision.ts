import * as THREE from 'three';

const detectMeshCollision = (activeCubes: THREE.Mesh[], passiveCubes: THREE.Mesh[]): boolean =>
{
    for (const aCube of activeCubes) 
    {
        for (const pCube of passiveCubes) 
        {
            const box1 = new THREE.Box3().setFromObject(aCube);
            const box2 = new THREE.Box3().setFromObject(pCube);

            if(box1.intersectsBox(box2))
            {
                return true
            }
        }
    }
    return false;
}
export default detectMeshCollision;