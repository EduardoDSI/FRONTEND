import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaResponse } from 'src/app/models/persona-response.model';
import { PersonaRequest } from '../../../models/persona-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../service/persona.service';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { ApisPeruPersonaResponse } from '../../../models/apis-peru-persona-response';
import { alert_error, alert_success } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-mant-persona-register',
  templateUrl: './mant-persona-register.component.html',
  styleUrls: ['./mant-persona-register.component.scss']
})
export class MantPersonaRegisterComponent implements OnInit {
  


  /**TODO: DECLARANDO VARIABLES DE ENTRADA */
  @Input() title: string = "";
  @Input() Persona: PersonaResponse = new PersonaResponse();
  @Input() accion: number = 0;


  /**TODO: DECLARANDO VARIABLES DE SALIDA */
  @Output() closeModalEmmit = new EventEmitter<boolean>();



  /**TODO: DECLARANDO VARIABLES INTERNAS */

  myForm: FormGroup;
  PersonaEnvio: PersonaRequest = new PersonaRequest();
  /**TODO: DECLARANDO EL CONSTRUCTOR */

  constructor(
    private fb: FormBuilder,
    private _PersonaService: PersonaService,
  ) {
    //nuestro formulario Persona request
    this.myForm = this.fb.group({
      idPersona: [{ value: 0, disabled: true }, [Validators.required]],
      nombres: [null, [Validators.required]],
      apellidoPaterno: [null, [Validators.required]],
      apellidoMaterno: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      correoElectronico: [null, [Validators.required]],
      numeroCelular: [null, [Validators.required]],
      tipoPersona: [null, [Validators.required]],
      nroIdentificacion: [null, [Validators.required]],
      idTipoDocumento: [null, [Validators.required]],  // Agregar este campo si es necesario
      tipoDocumento: [null]  // Puedes inicializarlo como null o con algún valor predeterminado si es necesario
    });
  }


  ngOnInit(): void {
  // Puedes suscribirte a los cambios del control tipoDocumento
  this.myForm.get('tipoDocumento')?.valueChanges.subscribe(value => {
    if (value === 'dni') {
      this.myForm.get('idTipoDocumento')?.setValue(1); // Si es 'dni', establece el valor de idTipoDocumento a 1
    } else if (value === 'ruc') {
      this.myForm.get('idTipoDocumento')?.setValue(2); // Si es 'ruc', establece el valor de idTipoDocumento a 2
    }
    // Puedes agregar más condiciones si lo necesitas
  });
    console.log("title ==>", this.title);
    console.log("Persona ==>", this.Persona);

    this.myForm.patchValue(this.Persona);

  }


  guardar() {

    
    this.PersonaEnvio = this.myForm.getRawValue()

    // this.PersonaEnvio.distrito = (this.PersonaEnvio.distrito.toString());

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

    this._PersonaService.create(this.PersonaEnvio).subscribe({
      next:(data:PersonaResponse)=>{
        
        alert_success("Creado de forma correcta","Nueva Persona!");
      },
      error:()=>{
        alert_error("Ocurrio un erro","Nose puede crear nueva persona!");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });

    //llamar a nuestro servicio rest ==> crear un nuevo registro en base de datos

  }

  editarRegistro()
  {
    this._PersonaService.update(this.PersonaEnvio).subscribe({
      next:(data:PersonaResponse)=>{
        alert_success("Actualizado de forma correcta","Actualizacion Correcta");
      },
      error:()=>{
        alert_error("Ocurrio un erro","Actualizacion incorrecta!");
      },
      complete:()=>{
        this.cerrarModal(true);
      }
    });
  }
  buscarPersona() {
    const tipo = this.myForm.get('tipoDocumento')?.value;
    const numero = this.myForm.get('nroIdentificacion')?.value;
  
    if (tipo && numero) {
      this._PersonaService.obtenerInformacionPorIdentificacion(tipo, numero).subscribe(
        (response: ApisPeruPersonaResponse) => {
          if (response) {
            // Autocompletar el formulario con los datos de la persona encontrada
            this.myForm.patchValue({
              nombres: response.nombres,
              apellidoPaterno: response.apellidoPaterno,
              apellidoMaterno: response.apellidoMaterno,
              // Aunque no tienes todos los campos en el backend, puedes agregarlos según los necesites
            });
          } else {
            console.error('No se encontraron datos para la persona.');
            alert('No se encontraron datos para la persona.');
          }
        },
        error => {
          console.error('Error al buscar persona:', error);
          alert('Ocurrió un error al buscar la persona. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.warn('Los campos Tipo de Documento y Número de Identificación son requeridos.');
      alert('Por favor, ingresa un Tipo de Documento y Número de Identificación válidos.');
    }
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
