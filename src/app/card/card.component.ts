import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() type!: string;
  @Input() year!: number;
  @Input() rating!: string;
  constructor(private authService: AuthService, private router: Router) {}

  goToDetails(id: string) {
    this.router.navigate([id]);
  }
}
