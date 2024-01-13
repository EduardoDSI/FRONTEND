import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PersonaResponse } from 'src/app/models/persona-response.model';
import { PersonaService } from '../../../service/persona.service';

@Component({
  selector: 'app-mant-persona-list',
  templateUrl: './mant-persona-list.component.html',
  styleUrls: ['./mant-persona-list.component.scss']
})
export class MantPersonaListComponent implements OnInit {

  modalRef?: BsModalRef;
  personas: PersonaResponse[] = [];
  personaSelected: PersonaResponse = new PersonaResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup ;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1; // Puedes inicializarlo con 1 o el valor que quieras.
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _personaService: PersonaService,
    
  ) {
    //nuestro formulario Persona request
    this.myFormFilter = this.fb.group({
      idPersona: ['', []], // Definiendo el tipo y valor predeterminado
      nombres: ['', []],
      apellidoPaterno: ['', []],
      apellidoMaterno: ['', []],
      fechaNacimiento: ['', []],
      correoElectronico: ['', []],
      numeroCelular: ['', []],
      tipoPersona: ['', []],
      nroIdentificacion: ['', []],
      idTipoDocumento: [0, []], // Definiendo el tipo y valor predeterminado
      tipoDocumento: this.fb.group({
        idTipoDocumento: [0, []],  // Aquí puedes inicializarlo según tus necesidades
        nombre: ['', []]           // También puedes inicializarlo como una cadena vacía o con algún valor predeterminado si lo deseas
      })
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listarpersonas();
    this.myFormFilter.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(() => {
      this.filtrar();
    });

  }

  listarpersonas() {
    this._personaService.getAll().subscribe({

      next: (data: PersonaResponse[]) => {
        this.personas = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearpersona(template: TemplateRef<any>) {
    this.personaSelected = new PersonaResponse();
    this.titleModal = "NUEVO PERSONA";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarpersona(template: TemplateRef<any>, persona: PersonaResponse) {
    this.personaSelected = persona;
    this.titleModal = "EDITAR PERSONA";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarpersonas();
      this.request.numeroPagina = this.currentPage; // Establece el número de página al valor almacenado.
      this.filtrar();
    }
  }

  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._personaService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarpersonas();
        }
      });
    }

  }

  filtrar() {
    this.request.filtros = [];
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "idPersona", value: valueForm.idPersona });
    this.request.filtros.push({ name: "nombres", value: valueForm.nombres });
    this.request.filtros.push({ name: "apellidoPaterno", value: valueForm.apellidoPaterno });
    this.request.filtros.push({ name: "apellidoMaterno", value: valueForm.apellidoMaterno });
    this.request.filtros.push({ name: "fechaNacimiento", value: valueForm.fechaNacimiento });
    this.request.filtros.push({ name: "correoElectronico", value: valueForm.correoElectronico });
    this.request.filtros.push({ name: "numeroCelular", value: valueForm.numeroCelular });
    this.request.filtros.push({ name: "nroIdentificacion", value: valueForm.nroIdentificacion });
    
    this._personaService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PersonaResponse>) => {
        console.log(data);
        this.personas = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => {
        console.log("error");
      },
      complete: () => {
        console.log("completo");
      },
    });
  }

  changePage(event: PageChangedEvent) {
    this.currentPage = event.page; // Almacena la página actual.
    this.request.numeroPagina = event.page;
    this.filtrar();
  }


  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
}


