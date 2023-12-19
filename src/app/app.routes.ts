import { Routes } from '@angular/router';
import { CoresComponent } from './cores/cores.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'/',
        redirectTo:'home'
    },
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path:'cores',
        component: CoresComponent
    }
];
