import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  @Input() title: string = 'Cluster Explorer'; // Default title
  @Input() links: { label: string; url: string }[] = [];
  @Input() isHandset$!: any;
  @Input() mode: 'side' | 'over' = 'side';

  toggleDrawer() {
    this.drawer.toggle();
  }
}
