import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'auth/login', component:LoginComponent},
    {path:'auth/register', component:RegisterComponent}
];
