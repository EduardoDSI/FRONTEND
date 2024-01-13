import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../service/auth.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';
import { alert_error, alert_success } from 'src/app/functions/general.functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  showPassword: boolean = false;
  loginForm: FormGroup;
  loginRequest: LoginRequest = new LoginRequest();
  contraseña = new FormControl('');


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
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log(this.loginForm.getRawValue());

    // Obtener datos del formulario para enviar al servicio
    this.loginRequest = this.loginForm.getRawValue();

    this._authService.login(this.loginRequest).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);
        
        // Mostrar alerta de "Login correcto" utilizando SweetAlert2
        alert_success("Login correcto", "¡Bienvenido! Has iniciado sesión correctamente.");

        // Redirigir al dashboard después de un inicio de sesión exitoso
        this._router.navigate(['dashboard']);
        
        // Almacenar valores en sessionStorage si es necesario
        if (data.success) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("idUsuario", data.usuario.id.toString());
          sessionStorage.setItem("username", data.usuario.usuario1);
          sessionStorage.setItem("fullName", data.persona.nombres);
          sessionStorage.setItem("rolId", data.rol.idRol.toString());
        }
      },
      error: (err) => {
        // Mostrar alerta de error utilizando SweetAlert2
        alert_error("Error de inicio de sesión", "Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.");
      },
      complete: () => {
        // Aquí puedes agregar lógica adicional si es necesario
      },
    });
  }
}