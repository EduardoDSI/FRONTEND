import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionMantConst } from 'src/app/constants/general.constants';
import { PersonaResponse } from 'src/app/models/persona-response.model';
import { PersonaRequest } from 'src/app/modules/mantenimiento/models/persona-request.model';
import { PersonaService } from 'src/app/modules/mantenimiento/service/persona.service';
import { RolService } from 'src/app/modules/mantenimiento/service/rol.service';
import { UsuarioService } from 'src/app/modules/mantenimiento/service/usuario.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  imagenSeleccionada: string = 'https://bootdey.com/img/Content/avatar/avatar7.png'; 
  @Input() userId: number = 1;
  @Input() accion: number = 0;
  personas: PersonaResponse[] = [];
  usuarios: any[] = [];
  rols: any[] = [];
  editMode = false;
  editPersona: any;
  personaSelected: PersonaResponse = new PersonaResponse();
  titleModal = "";
  accionModal = 0;
  myFormFilter: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private personaService: PersonaService
  ) {
    this.myFormFilter = this.fb.group({
      idPersona: ['', []], 
      nombres: ['', []],
      apellidoPaterno: ['', []],
      apellidoMaterno: ['', []],
      fechaNacimiento: ['', []],
      correoElectronico: ['', []],
      numeroCelular: ['', []],
      tipoPersona: ['', []],
      nroIdentificacion: ['', []],
      idTipoDocumento: [0, []], 
      tipoDocumento: this.fb.group({
        idTipoDocumento: [0, []], 
        nombre: ['', []]        
      })
    });
  }
  ngOnInit(): void {
    this.listarPerfil(this.userId);
    this.listarUsuario(this.userId);
    this.listarRol(this.userId);
    this.myFormFilter.patchValue(this.personas);
  }

  editarPersona(template: TemplateRef<any>, persona: PersonaResponse) {
    this.personaSelected = persona;
    this.titleModal = "EDITAR Persona";
    this.accionModal = AccionMantConst.editar;
    this.editMode = true; 
  }

  editarPerfil() {
    // Reemplaza el índice 1 con userId en tu lógica
    this.editPersona = { ...this.personas.find(persona => persona.idPersona === this.userId) };
    this.editMode = true; 
  }

  cancelarEdicion() {
    this.editMode = false;
  }

  guardar() {
   
    this.personaService.updateProfile(this.userId, this.myFormFilter.getRawValue()).subscribe({
      next: (data: PersonaResponse) => {
        alert("Actualizado de forma correcta");
      },
      error: (err) => {
        console.error("Ocurrió un error", err);  
      },
      complete: () => {
        this.editMode = false;  
      }
    });
  }

  cargarImagen(): void {
    const input = document.getElementById("upload-input") as HTMLInputElement;
    
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      
      const reader = new FileReader();
      
      reader.onload = (event: any) => {
        const imageDataUrl = event.target.result;
        this.imagenSeleccionada = imageDataUrl; 
      };

      reader.onerror = (error: any) => {
        console.error("Error reading the file:", error);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No se seleccionó ningún archivo o input no encontrado.");
    }
  }
  subirImagen(): void {
    const inputFile = document.getElementById('upload-input') as HTMLInputElement;
    inputFile.click(); 
  }

  listarPerfil(userId: number) {
    this.personaService.getProfileById(userId).subscribe({
      next: (data: PersonaResponse) => {
        this.personas = [data];
      },
      error: (err) => {
        console.log("Error: ", err);
      },
    });
  }

  listarUsuario(userId: number) {
    this.usuarioService.getProfileById(userId).subscribe({
      next: (data: any) => {
        this.usuarios = [data];
      },
      error: (err) => {
        console.log("Error: ", err);
      },
    });
  }

  listarRol(userId: number) {
    this.rolService.getProfileById(userId).subscribe({
      next: (data: any) => {
        this.rols = [data];
      },
      error: (err) => {
        console.log("Error: ", err);
      },
    });
  }
}
