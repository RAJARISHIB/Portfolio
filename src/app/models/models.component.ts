import { Component, model, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js';
import { CommonModule } from '@angular/common';

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
  
  // All the model names should be saved as uppercase.glb
  model_list = ['batman', 'engine', 'beltroller', 'mouse', 'screw_driver', 'whistle']

  model: Project[] = []

  selectedModelPath!: string; 
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;


  ngOnInit(): void {
    for(let model of this.model_list) {
      this.model.push({
        name: model.toUpperCase(),
        path: `assets/3d_models/${model}.glb`
      })
    }

    this.selectedModelPath = this.model[0].path;
    this.loadModel();
  }

  ngOnDestroy(): void {
    this.cleanup();  
  }

  selectProject(model: Project): void {
    this.cleanup();
    this.selectedModelPath = model.path;
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