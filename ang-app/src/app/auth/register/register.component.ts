import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService){}
  
  onSubmit(form: NgForm) {
    if(form.invalid){
      return;
    }
    const user: User = form.value;
    this.authService.register(user).subscribe(
      response =>{
        console.log('Successful user registratiion', response);
      },
      error => {
        console.log('Error', error);
        
      }
    )

  }

  getErrorMessage(input: any, fieldName: String): String | null {
    if (input.errors.required) {
      return `${fieldName} is required.`;
    } else if (input.errors?.email) {
      return 'Email is invalid.';
    } else if (input.errors?.minlength) {
      return `${fieldName} must be at least ${input.errors.minlength.requiredLength} characters.`
    }
    return null;
  }

  matchPasswords(form: NgForm): boolean {
    const password = form.value.password;
    const repass = form.value.repass;

    return password === repass;
  }

}
