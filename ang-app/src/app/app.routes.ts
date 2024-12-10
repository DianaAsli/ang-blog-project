import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    
    {path:'auth/login', component:LoginComponent},
    {path:'auth/register', component:RegisterComponent},

    {path:'', component:HomeComponent},
    {path:'about', component:AboutComponent},
    {path:'terms-and-conditions', component:TermsConditionsComponent},
    {path:'contact', component:ContactComponent},
];
