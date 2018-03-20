import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Manterialize

import { MzSidenavModule } from 'ng2-materialize';
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { SuperAdminHomeComponent } from './SuperAdmin/super-admin-home/super-admin-home.component';
import { SuperAdminNavBarComponent } from './SuperAdmin/super-admin-nav-bar/super-admin-nav-bar.component';
import { SuperAdminFooterComponent } from './SuperAdmin/super-admin-footer/super-admin-footer.component';


const routes: Routes = [
  { path: 'super-admin', component: SuperAdminHomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SuperAdminHomeComponent,
    SuperAdminNavBarComponent,
    SuperAdminFooterComponent
  ],
  imports: [
    BrowserModule,
    // Materialize modules
    MzSidenavModule,
    MzIconModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
