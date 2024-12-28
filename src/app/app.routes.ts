import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ModelsComponent } from './models/models.component';



export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"3D_Models", component:ModelsComponent},
    {path:"Projects", component:ProjectsComponent},
 
];
