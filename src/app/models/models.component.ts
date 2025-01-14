import { Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

interface Project{
  name : string;
  path : string;
}

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})



export class ModelsComponent implements OnInit, OnDestroy {
  

  project: Project[] = [
    {name: "BATMAN", path:"assets/batman.glb"},
    {name: "ENGINE", path:"assets/engine.glb"},
    {name: "BELT ROLLER", path:"assets/beltroller.glb"},
    {name: "MOUSE", path:"assets/mouse.glb"},
    {name: "SCREW DRIVER", path:"assets/screw_driver.glb"},
    {name: "STAPLER", path:"assets/stapler.glb"},
    {name: "WHISTLE", path:"assets/whistle.glb"}
  ]


  selectedModelPath!: string; 
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;

  ngOnInit(): void {
    this.selectedModelPath = this.project[0].path;
    this.loadModel();
  }

  ngOnDestroy(): void {
    this.cleanup();  
  }

  selectProject(project: Project): void {
    this.cleanup();
    this.selectedModelPath = project.path;
    this.loadModel();
  }

  loadModel(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 500; 

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const loader = new GLTFLoader();
    const controls = new ArcballControls(this.camera, this.renderer.domElement, this.scene);

    loader.load(this.selectedModelPath, (gltf) => {
      const model = gltf.scene;

      model.position.set(0, 0, 0);
      this.scene.add(model);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(100, 100, 100);
      this.scene.add(directionalLight);

      this.animate();
    },
    undefined,
    (error: any) => {
      console.error('An error occurred:', error);
    });
  }

  animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }
}