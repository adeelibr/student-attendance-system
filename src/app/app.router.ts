import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PublicComponent } from './layouts/public/public.component';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';

export const router: Routes = [
    { path: '', component: PublicComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
      ]
    },
    { path: 'dashboard', component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'students',  component: StudentsComponent }
      ]
    }
];

// export const routes: ModuleWithProviders = RouterModule.forRoot(router);
export const routes: ModuleWithProviders = RouterModule.forRoot(router, {useHash: true});
