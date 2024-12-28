import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GaugeModule } from 'angular-gauge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GaugeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
}
