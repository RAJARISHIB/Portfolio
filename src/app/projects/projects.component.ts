import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent{
    
  public project_list = ['Raspberri PI', 'Automated can washer', 'PCB Design and fabrication of Traffic management system']
}
