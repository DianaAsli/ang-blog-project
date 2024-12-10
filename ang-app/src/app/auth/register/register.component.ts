import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  emailError: string = '';
  usernameError: string = '';
  submitted = true;

  onSubmit(form: NgForm) {

    if (form.invalid) {
      this.submitted = false;
      return;
    }

    const user: User = form.value;
    this.authService.register(user).subscribe({
      next: (resp) => {
        console.log('Successful registration', resp);
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.error && err.error.field) {
          if (err.error.field == 'email') {
            this.emailError = err.error.message;
          } 
           if(err.error.field=='username'){
            this.usernameError=err.error.message;
          }

          //console.log('Backend error', err.error.message);

        } else {

          //this.errorMessage = 'An unexpected error occured.'
          console.log('error from server', err);
        }
      }
    });
  }

  getErrorMessage(input: any, fieldName: string): string | null {
    if (input.errors?.required) {
      return `${fieldName} is required.`;
    } else if (input.errors?.email) {
      return 'Email is invalid.';
    } else if (input.errors?.minlength) {
      return `${fieldName} must be at least ${input.errors.minlength.requiredLength} characters.`;
    }
    return null;
  }

  matchPasswords(form: NgForm): boolean {
    const password = form.value.password;
    const repass = form.value.repass;

    return password === repass;
  }

}

