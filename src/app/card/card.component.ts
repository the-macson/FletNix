import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() year!: number;
  @Input() rating!: string;
  @Input() image!: string;
  @Output() showSelected = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
