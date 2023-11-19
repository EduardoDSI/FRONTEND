import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionService } from '../../../service/direccion.service';
import { DireccionResponse } from '../../../models/direccion-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccionMantConst } from 'src/app/constants/general.constants';

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


  constructor(
    private _route: Router,
    private modalService: BsModalService,
    private _DireccionService: DireccionService,
  ) {

  }

  /**
   * FIXME: ES EL PRIMER EVENTO QUE EJECUTA EL COMPONENTE
   * */
  ngOnInit(): void {
   
    this.listarDireccions();

  }

  listarDireccions()
  {
    this._DireccionService.getAll().subscribe({

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
    this.titleModal = "NUEVO Direccion";
    this.accionModal = AccionMantConst.crear;
    this.openModal(template);
  }


  editarDireccion(template: TemplateRef<any>, Direccion: DireccionResponse) {
    this.DireccionSelected = Direccion;
    this.titleModal = "EDITAR Direccion";
    this.accionModal = AccionMantConst.editar;
    this.openModal(template);
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide();
    if(res)
    {
      this.listarDireccions();
    }

  }


  eliminarRegistro(id:number)
  {
    let result = confirm("¿Está seguro de eliminar el registro?");

    if(result)
    {
      this._DireccionService.delete(id).subscribe({
        next:(data:number)=>{
          alert("Registro eliminado de forma correcta");
        },
        error:()=>{},
        complete:()=>{
          this.listarDireccions();
        }
      });
    }

  }


}