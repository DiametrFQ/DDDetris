import * as THREE from 'three';

class Clight //implements Ifigure
{
    public position: [number, number, number]
    private intensity: number;
    private color: number;
    private distance: number;
    private frontSpot: THREE.SpotLight;

    constructor(color: number, position: [number, number, number], intensity: number, distance: number) {
        this.color = color;
        this.position = position;
        this.intensity = intensity
        this.distance = distance;
    }
    createWithHelpers(target: THREE.Mesh){

        this.frontSpot = new THREE.SpotLight(this.color, this.intensity, this.distance);
        this.frontSpot.position.set(...this.position);
        this.frontSpot.target = target
        this.frontSpot.castShadow = true;
        this.frontSpot.shadow.camera.near = 400;
        this.frontSpot.shadow.camera.far = 2000;
        this.frontSpot.shadow.mapSize.width = 2048*4;
        this.frontSpot.shadow.mapSize.height = 2048*4;
        
        const spotLightHelper = new THREE.SpotLightHelper(this.frontSpot);
        const helper = new THREE.CameraHelper( this.frontSpot.shadow.camera );

        return [this.frontSpot, spotLightHelper, helper];
    }
    get(){
        return this.frontSpot;
    }
}
export default Clight;