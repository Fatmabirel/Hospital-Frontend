
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutComponent } from '../../../features/about/about.component';
@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent,AboutComponent],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss',
})
export class BasicLayoutComponent {}
