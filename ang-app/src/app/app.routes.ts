import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {path:'auth/login', component:LoginComponent},
    {path:'auth/register', component:RegisterComponent}
];
