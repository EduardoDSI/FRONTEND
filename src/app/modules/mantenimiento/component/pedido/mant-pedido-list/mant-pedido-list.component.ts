import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../../service/pedido.service';
import { PedidoResponse } from '../../../models/pedido-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-pedido-list',
  templateUrl: './mant-pedido-list.component.html',
  styleUrls: ['./mant-pedido-list.component.scss']
})
export class MantPedidoListComponent implements OnInit {


  modalRef?: BsModalRef;
  Pedidos: PedidoResponse[] = [];
  PedidoSelected: PedidoResponse = new PedidoResponse();
  titleModal: string = "";
  accionModal: number = 0;
  totalItems: number = 0;
  myFormFilter: any;
  itemsPerPage: any;
  currentPage: number = 1;
  request: GenericFilterRequest = new GenericFilterRequest();


  constructor(
    private _route: Router,
    private modalService: BsModalService,
    private _PedidoService: PedidoService,
  ) {

  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listarPedidos();

  }

  listarPedidos()
  {
    this._PedidoService.getAll().subscribe({

      next: (data: PedidoResponse[]) => {
        this.Pedidos = data;
      },
      error: (err) => {
        console.log("error ", err);
      },
      complete: () => {
        //hare algo
      },

    });
  }


  crearPedido(template: TemplateRef<any>) {
    this.PedidoSelected = new PedidoResponse();
    this.titleModal = "NUEVO Pedido";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarPedido(template: TemplateRef<any>, Pedido: PedidoResponse) {
    this.PedidoSelected = Pedido;
    this.titleModal = "EDITAR Pedido";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarPedidos();
      this.request.numeroPagina = this.currentPage; // Establece el número de página al valor almacenado.
      this.filtrar();
    }
  }


  eliminarRegistro(id:number)
  {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if(result)
    {
      this._PedidoService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarPedidos();
        }
      });
    }

  }
filtrar() {
    let valueForm = this.myFormFilter.getRawValue();
    this.request.filtros.push({ name: "id", value: valueForm.id });
    this.request.filtros.push({ name: "fecha", value: valueForm.fecha });
    this.request.filtros.push({ name: "cita", value: valueForm.cita });
    this.request.filtros.push({ name: "numPedido", value: valueForm.numPedido });
    this.request.filtros.push({ name: "tipoComprobante", value: valueForm.tipoComprobante });
    this.request.filtros.push({ name: "descuento", value: valueForm.descuento });
    this.request.filtros.push({ name: "idPersona", value: valueForm.idPersona });
    this._PedidoService.genericFilter(this.request).subscribe({
      next: (data: GenericFilterResponse<PedidoResponse>) => {
        console.log(data);
        this.Pedidos = data.lista;
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