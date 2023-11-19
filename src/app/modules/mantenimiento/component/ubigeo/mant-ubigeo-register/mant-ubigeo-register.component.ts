import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/constants/general.constants';

import { UbigeoService } from '../../../service/ubigeo.service';
import { UbigeoResponse } from '../../../models/ubigeo-response.model';
import { UbigeoRequest } from '../../../models/ubigeo-request.model';
import { convertToBoolean } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-mant-Ubigeo-register',
  templateUrl: './mant-Ubigeo-register.component.html',
  styleUrls: ['./mant-Ubigeo-register.component.scss']
})
export class MantUbigeoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() Ubigeo: UbigeoResponse = new UbigeoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  UbigeoEnvio: UbigeoRequest = new UbigeoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _UbigeoService: UbigeoService,
  ) {
    //nuestro formulario Ubigeo request
    this.myForm = this.fb.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      departamento: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      distrito: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("Ubigeo ==>", this.Ubigeo);

    this.myForm.patchValue(this.Ubigeo);

  }


  guardar() {

    
    this.UbigeoEnvio = this.myForm.getRawValue()

    // this.UbigeoEnvio.distrito = (this.UbigeoEnvio.distrito.toString());

    switch (this.accion) {
      case AccionMantConst.crear:
        this.crearRegistro();
        break;
      case AccionMantConst.editar:
        this.editarRegistro();
        break;
      // inactivar
      case AccionMantConst.eliminar:
        // eliminar registro
        break;
    }


  }

  crearRegistro()
  {

    this._UbigeoService.create(this.UbigeoEnvio).subscribe({
      next:(data:UbigeoResponse)=>{
        alert("creado de forma correcta");
      },
      error:()=>{
        alert("Ocurrio un erro");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });

    //llamar a nuestro servicio rest ==> crear un nuevo registro en base de datos

  }

  editarRegistro()
  {
    this._UbigeoService.update(this.UbigeoEnvio).subscribe({
      next:(data:UbigeoResponse)=>{
        alert("actualizado de forma correcta");
      },
      error:()=>{
        alert("Ocurrio un erro");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });
  }



  cerrarModal(res: boolean) {
    //true ==> hubo modificación en base de datos ==> necesito volver a cargar la lista
    //false ==> NO hubo modificación en base de datos ==> NOOOOOO necesito volver a cargar la lista
    this.closeModalEmmit.emit(res);

  }
  cancelarAccion() {
    // Aquí puedes agregar la lógica que deseas ejecutar al hacer clic en cancelar
    console.log('Operación cancelada');
    this.cerrarModal(false);
}

}
