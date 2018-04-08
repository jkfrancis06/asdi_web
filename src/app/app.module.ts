import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Services

import {AdminService} from './services/admin/admin.service';

// Social login for admin

import {AuthGuard} from './core/super-admin/auth.guard';
import {AuthService} from './services/super-admin/auth.service';
import {AdminGuard} from './core/admin/admin.guard';


// Manterialize

import { MzSidenavModule } from 'ng2-materialize';
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { SuperAdminHomeComponent } from './components/super-admin/super-admin-home/super-admin-home.component';
import { SuperAdminNavBarComponent } from './components/super-admin/super-admin-nav-bar/super-admin-nav-bar.component';
import { SuperAdminFooterComponent } from './components/super-admin/super-admin-footer/super-admin-footer.component';
import { CreateAdminComponent } from './components/super-admin/create-admin/create-admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminNavBarComponent } from './components/admin/admin-nav-bar/admin-nav-bar.component';
import { AdminNavFooterComponent } from './components/admin/admin-nav-footer/admin-nav-footer.component';


const routes: Routes = [
  // Super Admin routes
  { path: 'super-admin', component: SuperAdminHomeComponent },
  { path: 'super-admin/create-admin', component: CreateAdminComponent },
  // Admin routes
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminHomeComponent , canActivate: [AdminGuard]}
];


export const firebaseConfig = {
  apiKey: 'AIzaSyCziMXftyDQlqvUkEAR2bUDd1qBIEb2KyI',
  authDomain: 'asdi-20ebf.firebaseapp.com',
  databaseURL: 'https://asdi-20ebf.firebaseio.com',
  projectId: 'asdi-20ebf',
  storageBucket: 'asdi-20ebf.appspot.com',
  messagingSenderId: '1025332104486'
}



@NgModule({
  declarations: [
    AppComponent,
    SuperAdminHomeComponent,
    SuperAdminNavBarComponent,
    SuperAdminFooterComponent,
    CreateAdminComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminNavBarComponent,
    AdminNavFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // Materialize modules
    MzSidenavModule,
    MzIconModule,
    // Materialize
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AdminService,
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }