import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UbigeoService } from '../../../service/ubigeo.service';
import { UbigeoResponse } from '../../../models/ubigeo-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-mant-ubigeo-list',
  templateUrl: './mant-ubigeo-list.component.html',
  styleUrls: ['./mant-ubigeo-list.component.scss']
})
export class MantubigeoListComponent implements OnInit {

  modalRef?: BsModalRef;
  ubigeos: UbigeoResponse[] = [];
  ubigeoSelected: UbigeoResponse = new UbigeoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup ;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _ubigeoService: UbigeoService,
    
  ) {
    //nuestro formulario ubigeo request
    this.myFormFilter = this.fb.group({
      id: ["", []],
      departamento: ["", []],
      provincia: ["", []],
      distrito: ["", []],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listarubigeos();
    this.myFormFilter.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(() => {
      this.filtrar();
    });

  }

  listarubigeos() {
    this._ubigeoService.getAll().subscribe({

      next: (data: UbigeoResponse[]) => {
        this.ubigeos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearubigeo(template: TemplateRef<any>) {
    this.ubigeoSelected = new UbigeoResponse();
    this.titleModal = "NUEVO UBIGEO";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarubigeo(template: TemplateRef<any>, ubigeo: UbigeoResponse) {
    this.ubigeoSelected = ubigeo;
    this.titleModal = "EDITAR UBIGEO";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarubigeos();
    }

  }
  

  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._ubigeoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarubigeos();
        }
      });
    }

  }

  filtrar() {
    this.request.filtros = [];
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "id", value: valueForm.id });
    this.request.filtros.push({ name: "departamento", value: valueForm.departamento });
    this.request.filtros.push({ name: "provincia", value: valueForm.provincia });
    this.request.filtros.push({ name: "distrito", value: valueForm.distrito });
    this._ubigeoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<UbigeoResponse>) => {
        console.log(data);
        this.ubigeos = data.lista;
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
    this.request.numeroPagina = event.page;
    this.filtrar();
  }


  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
}


