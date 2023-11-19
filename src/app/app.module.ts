import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { WelcomeComponent } from './pages/home/welcome.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { TiendaComponent } from './pages/tienda/tienda/tienda.component';
import { MedioComponent } from './pages/medio/medio/medio.component';
import { SomosComponent } from './pages/somos/somos/somos.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    WelcomeComponent,
    TiendaComponent,
    MedioComponent,
    SomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // PaginationModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
