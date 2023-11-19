import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../service/auth.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm: FormGroup;
  loginRequest: LoginRequest = new LoginRequest();


  constructor(
    private fb: FormBuilder,
    private _authService: AuthService, 
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: [null, [Validators.required]],
      contraseña: [null, [Validators.required]],
    });
  }

  login() {

    console.log(this.loginForm.getRawValue());

    //este login request lo tengo que enviar hacia el servicio web
    this.loginRequest = this.loginForm.getRawValue();

    this._authService.login(this.loginRequest).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);
        alert("login correcto ");
        //redirigir al dashboard
        this._router.navigate(['dashboard']);

        //NOSOTROS ALMACENAMOS EL VALOR DEL TOKEN Y ALGUNOS VALORES DE NUESTRO USUARIO
        //PARA SESION STORAGE 
        if(data.success)
        {
          sessionStorage.setItem("token", data.token );
          sessionStorage.setItem("idUsuario", data.usuario.id.toString() );
          sessionStorage.setItem("username", data.usuario.usuario1 );
          sessionStorage.setItem("fullName", data.persona.nombres );
          sessionStorage.setItem("rolId", data.rol.id.toString() );

        }
        else {
          return;
        }

      },
      error: (err) => { },
      complete: () => { },
    });
  }
}