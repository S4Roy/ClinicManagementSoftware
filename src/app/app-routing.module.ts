import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './gurds/admin.guard';
import { GuestGuard } from './gurds/guest.guard';
import { UserGuard } from './gurds/user.guard';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ClientsComponent } from './pages/admin/clients/clients.component';
import { MeetingsComponent } from './pages/admin/meetings/meetings.component';
import { ServicesComponent } from './pages/admin/services/services.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { UserLoginComponent } from './pages/auth/user-login/user-login.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './pages/layouts/user-layout/user-layout.component';
import { AppointmentsComponent } from './pages/user/appointments/appointments.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [GuestGuard], data: {
      pageTitle: 'Home',
    },
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [GuestGuard],
    data: {
      pageTitle: 'Authentication',
    },
    children: [
      {
        path: 'admin/login', component: AdminLoginComponent, data: {
          pageTitle: 'Admin Login',
        },
      },
      {
        path: 'user/login', component: UserLoginComponent, data: {
          pageTitle: 'Employee Login',
        },
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    data: {
      pageTitle: 'Admin',
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: AdminHomeComponent, data: {
          pageTitle: 'Admin Dashboard',
        },
      },
      {
        path: 'meetings', component: MeetingsComponent, data: {
          pageTitle: 'Meetings',
        },
      },
      {
        path: 'clients', component: ClientsComponent, data: {
          pageTitle: 'Clients',
        },
      },
      {
        path: 'services', component: ServicesComponent, data: {
          pageTitle: 'Services',
        },
      },
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [UserGuard],
    data: {
      pageTitle: 'User',
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: UserHomeComponent, data: {
          pageTitle: 'User Dashboard',
        },
      },
      {
        path: 'appointments', component: AppointmentsComponent, data: {
          pageTitle: 'Appointments',
        },
      },]
  },
  {
    path: '404', component: PageNotFoundComponent, data: {
      pageTitle: 'Page Not Found',
    }
  },

  {
    path: '**', component: PageNotFoundComponent, data: {
      pageTitle: 'Page Not Found',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
