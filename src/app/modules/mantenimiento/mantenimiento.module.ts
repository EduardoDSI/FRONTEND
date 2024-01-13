import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ModalModule } from 'ngx-bootstrap/modal';



import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantubigeoListComponent } from './component/ubigeo/mant-ubigeo-list/mant-ubigeo-list.component';
import { MantUbigeoRegisterComponent } from './component/ubigeo/mant-ubigeo-register/mant-ubigeo-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MantDireccionListComponent } from './component/direccion/mant-direccion-list/mant-direccion-list.component';
import { MantDireccionRegisterComponent } from './component/direccion/mant-direccion-register/mant-direccion-register.component';
import { MantDeudaListComponent } from './component/deuda/mant-deuda-list/mant-deuda-list.component';
import { MantDeudaRegisterComponent } from './component/deuda/mant-deuda-register/mant-deuda-register.component';
import { MantPedidoListComponent } from './component/pedido/mant-pedido-list/mant-pedido-list.component';
import { MantPedidoRegisterComponent } from './component/pedido/mant-pedido-register/mant-pedido-register.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantPersonaRegisterComponent } from './component/persona/mant-persona-register/mant-persona-register.component';
import { MantUsuarioListComponent } from './component/usuario/mant-usuario-list/mant-usuario-list.component';
import { MantUsuarioRegisterComponent } from './component/usuario/mant-usuario-register/mant-usuario-register.component';
import { MantContratoListComponent } from './component/contrato/mant-contrato-list/mant-contrato-list.component';
import { MantContratoRegisterComponent } from './component/contrato/mant-contrato-register/mant-contrato-register.component';

@NgModule({
  declarations: [
    MantubigeoListComponent,
    MantUbigeoRegisterComponent,
    MantDireccionListComponent,
    MantDireccionRegisterComponent,
    MantDeudaListComponent,
    MantDeudaRegisterComponent,
    MantPedidoListComponent,
    MantPedidoRegisterComponent,
    MantPersonaListComponent,
    MantPersonaRegisterComponent,
    MantUsuarioListComponent,
    MantUsuarioRegisterComponent,
    MantContratoListComponent,
    MantContratoRegisterComponent,
    
    
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
