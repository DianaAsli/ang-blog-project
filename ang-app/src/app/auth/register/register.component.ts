import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  onSubmit(form: NgForm) {
    if(form.invalid){
      return;
    }
    console.log('Form submitted');
    console.log(form.value);

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
