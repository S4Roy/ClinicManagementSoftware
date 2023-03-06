import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { UserLoginComponent } from './pages/auth/user-login/user-login.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './pages/layouts/user-layout/user-layout.component';
import { AppointmentsComponent } from './pages/user/appointments/appointments.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { UserHeaderComponent } from './pages/user/includes/user-header/user-header.component';
import { UserFooterComponent } from './pages/user/includes/user-footer/user-footer.component';
import { UserSidebarComponent } from './pages/user/includes/user-sidebar/user-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NewScheduleComponent } from './pages/user/appointments/new-schedule/new-schedule.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AdminHeaderComponent } from './pages/admin/includes/admin-header/admin-header.component';
import { AdminSidebarComponent } from './pages/admin/includes/admin-sidebar/admin-sidebar.component';
import { ClientsComponent } from './pages/admin/clients/clients.component';
import { ServicesComponent } from './pages/admin/services/services.component';
import { MeetingsComponent } from './pages/admin/meetings/meetings.component';
import { CustomPaginationComponent } from './pages/includes/custom-pagination/custom-pagination.component';
import { CustomTableoptionComponent } from './pages/includes/custom-tableoption/custom-tableoption.component';
import { CustomTableloaderComponent } from './pages/includes/custom-tableloader/custom-tableloader.component';
import { NewClientComponent } from './pages/admin/clients/new-client/new-client.component';
import { NewServiceComponent } from './pages/admin/services/new-service/new-service.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminLoginComponent,
    UserLoginComponent,
    PageNotFoundComponent,
    AppointmentsComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserLayoutComponent,
    AdminHomeComponent,
    UserHomeComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserSidebarComponent,
    NewScheduleComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ClientsComponent,
    ServicesComponent,
    MeetingsComponent,
    CustomPaginationComponent,
    CustomTableoptionComponent,
    CustomTableloaderComponent,
    NewClientComponent,
    NewServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatCardModule,
    FullCalendarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    NgSelectModule,
    DpDatePickerModule,
  ],
  providers: [
    CustomTableloaderComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
