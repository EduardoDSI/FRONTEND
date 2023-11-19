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


@NgModule({
  declarations: [
    MantubigeoListComponent,
    MantUbigeoRegisterComponent,
    MantDireccionListComponent,
    MantDireccionRegisterComponent,
    MantDeudaListComponent,
    MantDeudaRegisterComponent,
    MantPedidoListComponent,
    MantPedidoRegisterComponent
    
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
