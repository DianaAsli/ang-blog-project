import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginUser } from '../../models/login-user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }
    
    const user: LoginUser = form.value;

    this.authService.login(user).subscribe({
      next: (res) =>{
        console.log('Successful login', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error login', err.error.message);
        
      }
    })
    
  }
}
