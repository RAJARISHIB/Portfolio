import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// import { FontAwsome } from '@angular/font-awesome';

@Component ({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    
  public content_data : any = []
  public full_screen = []

  constructor(private http: HttpClient) {
    this.http.get<{content: string}>('/assets/project_content/project_content.json').subscribe(data=>{
      this.content_data = data
      for(let content of this.content_data ) {
        console.log(content)
      }
    })
  }
  
  ngOnInit() {

  }
  
}
