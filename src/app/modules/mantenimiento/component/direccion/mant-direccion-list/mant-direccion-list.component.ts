import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionService } from '../../../service/direccion.service';
import { DireccionResponse } from '../../../models/direccion-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';

@Component({
  selector: 'app-mant-direccion-list',
  templateUrl: './mant-direccion-list.component.html',
  styleUrls: ['./mant-direccion-list.component.scss']
})
export class MantDireccionListComponent implements OnInit {


  modalRef?: BsModalRef;
  Direccions: DireccionResponse[] = [];
  DireccionSelected: DireccionResponse = new DireccionResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup ;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _direccionService: DireccionService,
  ) {
    this.myFormFilter = this.fb.group({
      idDireccion: ["", []],
      calle: ["", []],
      referencia: ["", []],
      idPersona: ["", []],
    });
  }


  

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listardireccions();
    this.myFormFilter.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(() => {
      this.filtrar();
    });

  }

  listardireccions() {
    this._direccionService.getAll().subscribe({

      next: (data: DireccionResponse[]) => {
        this.Direccions = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  
  }

  crearDireccion(template: TemplateRef<any>) {
    this.DireccionSelected = new DireccionResponse();
    this.titleModal = "NUEVO DIRECIÓN";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarDireccion(template: TemplateRef<any>, direccion: DireccionResponse) {
    this.DireccionSelected = direccion;
    this.titleModal = "EDITAR DIRECCIÓN";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listardireccions();
      this.request.numeroPagina = this.currentPage; // Establece el número de página al valor almacenado.
      this.filtrar();
    }
  }
  

  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._direccionService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listardireccions();
        }
      });
    }

  }
  

  filtrar() {
    this.request.filtros = [];
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "idDireccion", value: valueForm.idDireccion });
    this.request.filtros.push({ name: "calle", value: valueForm.calle });
    this.request.filtros.push({ name: "referencia", value: valueForm.referencia });
    this.request.filtros.push({ name: "idPersona", value: valueForm.idPersona });
    this._direccionService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<DireccionResponse>) => {
        console.log(data);
        this.Direccions = data.lista;
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
