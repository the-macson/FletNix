import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  Mail,
  Lock,
  User,
  Calendar,
  Film,
} from 'lucide-angular';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  readonly mail = Mail;
  readonly lock = Lock;
  readonly user = User;
  readonly calendar = Calendar;
  readonly film = Film;
  registerForm: FormGroup;

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
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      dob: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, dob } = this.registerForm.value;
      this.authService.register(name, password, email, dob);
    }
  }
}
