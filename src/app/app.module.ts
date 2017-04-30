import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.router';

// Layouts
import { AppComponent } from './app.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PublicComponent } from './layouts/public/public.component';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';

// Services
import { StudentsService } from './services/students.service';
import { AuthService } from './services/auth.service';

// Components
import { DashboardSidebarComponent } from './layouts/components/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    PublicComponent,
    LoginComponent,
    HomeComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routes
  ],
  providers: [
    StudentsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
