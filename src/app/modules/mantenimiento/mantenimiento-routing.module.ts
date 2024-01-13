import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantubigeoListComponent } from './component/ubigeo/mant-ubigeo-list/mant-ubigeo-list.component';
import { MantDireccionListComponent } from './component/direccion/mant-direccion-list/mant-direccion-list.component';
import { MantDeudaListComponent } from './component/deuda/mant-deuda-list/mant-deuda-list.component';
import { MantPedidoListComponent } from './component/pedido/mant-pedido-list/mant-pedido-list.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantContratoListComponent } from './component/contrato/mant-contrato-list/mant-contrato-list.component';

const routes: Routes = [


  {
    path: 'ubigeo', component: MantubigeoListComponent
  },
  {
    path: 'direccion', component: MantDireccionListComponent  
  },
  {
    path: 'deuda', component: MantDeudaListComponent  
  },
  {
    path: 'pedido', component: MantPedidoListComponent  
  },
  {
    path: 'contrato', component: MantContratoListComponent  
  },
  {
    path: 'persona', component: MantPersonaListComponent  
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
