import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() drawer: MatSidenav | undefined; // You can explicitly type this for better clarity
  @Input() buttonConfig: any;
  @Input() currentRoute: string = '';

  ngOnInit() {
    // You can log it to check if it's being initialized
    console.log(this.drawer); // This should log the 'MatSidenav' instance
  }

  getButtonStyle(label: string, disabled: boolean) {
    if (disabled) return {};
    return {
      color:
        label === 'Verify'
          ? 'green'
          : label === 'Register Connection'
          ? 'orange'
          : '',
    };
  }

  onButtonClick(label: string) {
    console.log(`Button clicked: ${label}`);
  }
}
