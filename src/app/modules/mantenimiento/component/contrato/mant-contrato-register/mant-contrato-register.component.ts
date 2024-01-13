import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContratoResponse } from '../../../models/contrato-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoRequest } from '../../../models/contrato-request.model';
import { ContratoService } from '../../../service/contrato.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { alert_error, alert_success } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-mant-contrato-register',
  templateUrl: './mant-contrato-register.component.html',
  styleUrls: ['./mant-contrato-register.component.scss']
})
export class MantContratoRegisterComponent implements OnInit {


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() Contrato: ContratoResponse = new ContratoResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  ContratoEnvio: ContratoRequest = new ContratoRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _ContratoService: ContratoService,
  ) {
    //nuestro formulario Contrato request
    this.myForm = this.fb.group({
      idContrato: [{ value: 0, disabled: true }, [Validators.required]],
      duracionContratoMes: [null, [Validators.required]],
      fechaContrato: [null,[Validators.required]],
      fechaVenContrato: [null,[Validators.required]],
      tipoComprobante : [null,[Validators.required]],
      modoPago : [null,[Validators.required]],
      montoTarifaPlana: [null,[Validators.required]],
      montoPagado: [null,[Validators.required]],
      estado : [null,[Validators.required]],
    });
  }


  ngOnInit(): void {

    console.log("title ==>", this.title);
    console.log("Contrato ==>", this.Contrato);

    this.myForm.patchValue(this.Contrato);

  }


  guardar() {

    
    this.ContratoEnvio = this.myForm.getRawValue()

    // this.ContratoEnvio.distrito = (this.ContratoEnvio.distrito.toString());

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

    this._ContratoService.create(this.ContratoEnvio).subscribe({
      next:(data:ContratoResponse)=>{
        
        alert_success("Creado Correctamente","Nuevo contrato!");
      },
      error:()=>{
        alert_error("Ocurrio un erro","No se pudo realizar el contrato!");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });

    //llamar a nuestro servicio rest ==> crear un nuevo registro en base de datos

  }

  editarRegistro()
  {
    this._ContratoService.update(this.ContratoEnvio).subscribe({
      next:(data:ContratoResponse)=>{
        alert_success("Actualizado de forma correcta","Actualizado!");
      },
      error:()=>{
        alert_error("Ocurrio un erro","No se puede Acualizar!");
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