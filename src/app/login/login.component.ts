import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  readonly mail = Mail;
  readonly lock = Lock;
  readonly user = User;
  readonly calendar = Calendar;
  readonly film = Film;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authService.startServerless().subscribe({
      next: () => {
        console.log('Serverless started');
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {    
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    }
  }
}
