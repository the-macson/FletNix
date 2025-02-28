import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LucideAngularModule,
  Mail,
  Lock,
  User,
  Calendar,
  Film,
} from 'lucide-angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly mail = Mail;
  readonly lock = Lock;
  readonly user = User;
  readonly calendar = Calendar;
  readonly film = Film;
  loginForm: FormGroup;
  
  constructor(private authService: AuthService, private router: Router) {
    this.authService.startServerless().subscribe();
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.loginForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    }
  }
}
