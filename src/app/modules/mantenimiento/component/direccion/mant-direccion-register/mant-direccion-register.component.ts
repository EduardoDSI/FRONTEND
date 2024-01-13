import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/constants/general.constants';

import { DireccionService } from '../../../service/direccion.service';
import { DireccionResponse } from '../../../models/direccion-response.model';
import { DireccionRequest } from '../../../models/direccion-request.model';
import { convertToBoolean } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-mant-direccion-register',
  templateUrl: './mant-direccion-register.component.html',
  styleUrls: ['./mant-direccion-register.component.scss']
})
export class MantDireccionRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() Direccion: DireccionResponse = new DireccionResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  DireccionEnvio: DireccionRequest = new DireccionRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _DireccionService: DireccionService,
  ) {
    //nuestro formulario Direccion request
    this.myForm = this.fb.group({
      idDireccion: [{ value: 0, disabled: true }, [Validators.required]],
      calle: [null, [Validators.required]],
      referencia: [null, [Validators.required]],
      idPersona: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("Direccion ==>", this.Direccion);

    this.myForm.patchValue(this.Direccion);

  }


  guardar() {

    
    this.DireccionEnvio = this.myForm.getRawValue()

    // this.DireccionEnvio.distrito = (this.DireccionEnvio.distrito.toString());

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

    this._DireccionService.create(this.DireccionEnvio).subscribe({
      next:(data:DireccionResponse)=>{
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
    this._DireccionService.update(this.DireccionEnvio).subscribe({
      next:(data:DireccionResponse)=>{
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
