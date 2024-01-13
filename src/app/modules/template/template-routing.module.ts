import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './component/template/template.component';
import { PerfilListComponent } from 'src/app/pages/usuario-perfil/perfil-list/perfil-list.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children: [
      {
        path: 'mantenimiento', loadChildren: () => import("./../mantenimiento/mantenimiento.module").then(x => x.MantenimientoModule)
      },
      {
        path: 'reportes', loadChildren: () => import("./../mantenimiento/mantenimiento.module").then(x => x.MantenimientoModule)
      },
      {
        path: 'usuarioPerfil', component: PerfilListComponent // Nueva ruta al componente PerfilListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
