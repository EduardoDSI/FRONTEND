import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/home/welcome.component';
import { authGuard } from './guard/auth.guard';
import { TiendaComponent } from './pages/tienda/tienda/tienda.component';
import { MedioComponent } from './pages/medio/medio/medio.component';
import { SomosComponent } from './pages/somos/somos/somos.component';
import { PerfilListComponent } from './pages/usuario-perfil/perfil-list/perfil-list.component';
import { PerfilGuardComponent } from './pages/usuario-perfil/perfil-guard/perfil-guard.component';
import { CarritoListComponent } from './pages/carrito/carrito-list/carrito-list.component';

const routes: Routes = [


  //se llama ruteo simple
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'tienda', component: TiendaComponent
  },
  {
    path: 'medio', component: MedioComponent
  },
  {
    path: 'somos', component: SomosComponent
  },
  {
    path: 'usuarioPerfil', component: PerfilListComponent
  },
  {
    path: 'carrito', component: CarritoListComponent
  },
  {
    path: 'usuarioEdit', component: PerfilGuardComponent
  },

  //vamos a hacer uso de un lazy loading
  {
    path: 'auth', loadChildren: () => import("./modules/auth/auth.module").then(x => x.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import("./modules/template/template.module").then(x => x.TemplateModule)

  },


  // {
  //   path: '**', redirectTo: '/404'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
