import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContratoResponse } from '../../../models/contrato-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { Router } from '@angular/router';
import { ContratoService } from '../../../service/contrato.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-contrato-list',
  templateUrl: './mant-contrato-list.component.html',
  styleUrls: ['./mant-contrato-list.component.scss']
})
export class MantContratoListComponent implements OnInit {

  modalRef?: BsModalRef;
  contratos: ContratoResponse[] = [];
  contratoSelected: ContratoResponse = new ContratoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup ;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 3;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _contratoService: ContratoService,
    
  ) {
    //nuestro formulario contrato request
    this.myFormFilter = this.fb.group({
      idContrato: ["", []],
      duracionContratoMes:["",[]],
      fechaContrato: ["",[]],
      fechaVenContrato: ["",[]],
      tipoComprobante : ["",[]],
      modoPago : ["",[]],
      montoTarifaPlana: ["",[]],
      montoPagado: ["",[]],
      estado : ["",[]],
    });
  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listarcontratos();
    this.myFormFilter.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(() => {
      this.filtrar();
    });

  }

  listarcontratos() {
    this._contratoService.getAll().subscribe({

      next: (data: ContratoResponse[]) => {
        this.contratos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearcontrato(template: TemplateRef<any>) {
    this.contratoSelected = new ContratoResponse();
    this.titleModal = "NUEVO CONTRATO";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarcontrato(template: TemplateRef<any>, contrato: ContratoResponse) {
    this.contratoSelected = contrato;
    this.titleModal = "EDITAR CONTRATO";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarcontratos();
      this.request.numeroPagina = this.currentPage; // Establece el número de página al valor almacenado.
      this.filtrar();
    }
  }
  

  eliminarRegistro(id: number) {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if (result) {
      this._contratoService.delete(id).subscribe({
        next: (data: number) => {
          alert("Registro eliminado de forma correcta");
        },
        error: () => { },
        complete: () => {
          this.listarcontratos();
        }
      });
    }

  }

  filtrar() {
    this.request.filtros = [];
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "idContrato", value: valueForm.idContrato });
    this.request.filtros.push({ name: "duracionContratoMes", value: valueForm.duracionContratoMes });
    this.request.filtros.push({ name: "fechaContrato", value: valueForm.fechaContrato });
    this.request.filtros.push({ name: "fechaVenContrato", value: valueForm.fechaVenContrato });
    this.request.filtros.push({ name: "tipoComprobante", value: valueForm.tipoComprobante });
    this.request.filtros.push({ name: "modoPago", value: valueForm.modoPago });
    this.request.filtros.push({ name: "montoTarifaPlana", value: valueForm.montoTarifaPlana });
    this.request.filtros.push({ name: "montoPagado", value: valueForm.montoPagado });
    this.request.filtros.push({ name: "estado", value: valueForm.estado });
    this._contratoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<ContratoResponse>) => {
        console.log(data);
        this.contratos = data.lista;
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