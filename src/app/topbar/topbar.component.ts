import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})

export class TopbarComponent 
{
  routelink = ["Home", "Projects", "3D_Models"]
  topbarList = ["Home", "Projects", "3D Models"]

  navItems = this.routelink.map((route, index)=>({
    route : route,
    name : this.topbarList[index]
  }))
}
