import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito-list',
  templateUrl: './carrito-list.component.html',
  styleUrls: ['./carrito-list.component.scss']
})
export class CarritoListComponent {}
// export class CarritoListComponent implements OnInit {
//   carritoVisible = false;
//   carritoItems = [];

//   ngOnInit() {
//     // Esperamos a que todos los elementos de la página carguen para ejecutar el script
//     if (document.readyState === 'loading') {
//       document.addEventListener('DOMContentLoaded', () => this.ready());
//     } else {
//       this.ready();
//     }
//   }

//   ready() {
//     // Agrega funcionalidad a los botones eliminar del carrito
//     const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
//     for (let i = 0; i < botonesEliminarItem.length; i++) {
//       const button = botonesEliminarItem[i];
//       button.addEventListener('click', (event) => this.eliminarItemCarrito(event));
//     }

//     // Agrega funcionalidad al botón sumar cantidad
//     const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
//     for (let i = 0; i < botonesSumarCantidad.length; i++) {
//       const button = botonesSumarCantidad[i];
//       button.addEventListener('click', (event) => this.sumarCantidad(event));
//     }

//     // Agrega funcionalidad al botón restar cantidad
//     const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
//     for (let i = 0; i < botonesRestarCantidad.length; i++) {
//       const button = botonesRestarCantidad[i];
//       button.addEventListener('click', (event) => this.restarCantidad(event));
//     }

//     // Agrega funcionalidad al botón Agregar al carrito
//     const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
//     for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
//       const button = botonesAgregarAlCarrito[i];
//       button.addEventListener('click', (event) => this.agregarAlCarritoClicked(event));
//     }

//     // Agrega funcionalidad al botón comprar
//     document.getElementsByClassName('btn-pagar')[0].addEventListener('click', () => this.pagarClicked());
//   }

//   pagarClicked() {
//     alert('Gracias por la compra');
//     this.carritoItems = [];
//     this.actualizarTotalCarrito();
//     this.ocultarCarrito();
//   }

//   agregarAlCarritoClicked(event) {
//     const button = event.target;
//     const item = button.parentElement;
//     const titulo = item.querySelector('.titulo-item').textContent;
//     const precio = item.querySelector('.precio-item').textContent;
//     const imagenSrc = item.querySelector('.img-item').getAttribute('src');

//     this.agregarItemAlCarrito(titulo, precio, imagenSrc);
//     this.hacerVisibleCarrito();
//   }

//   hacerVisibleCarrito() {
//     this.carritoVisible = true;
//     const carrito = document.querySelector('.carrito');
//     carrito.style.marginRight = '0';
//     carrito.style.opacity = '1';

//     const items = document.querySelector('.contenedor-items');
//     items.style.width = '60%';
//   }

//   agregarItemAlCarrito(titulo, precio, imagenSrc) {
//     const item = {
//       titulo: titulo,
//       precio: precio,
//       imagenSrc: imagenSrc,
//       cantidad: 1
//     };

//     // Controla si el item ya se encuentra en el carrito
//     const encontrado = this.carritoItems.find(carritoItem => carritoItem.titulo === titulo);
//     if (encontrado) {
//       alert('El item ya se encuentra en el carrito');
//       return;
//     }

//     this.carritoItems.push(item);
//     this.actualizarTotalCarrito();
//   }

//   sumarCantidad(event) {
//     const buttonClicked = event.target;
//     const selector = buttonClicked.parentElement;
//     const cantidadActual = selector.querySelector('.carrito-item-cantidad').value;
//     const index = this.findIndexInItems(selector);
    
//     this.carritoItems[index].cantidad++;
//     this.actualizarTotalCarrito();
//   }

//   restarCantidad(event) {
//     const buttonClicked = event.target;
//     const selector = buttonClicked.parentElement;
//     const cantidadActual = selector.querySelector('.carrito-item-cantidad').value;
//     const index = this.findIndexInItems(selector);
    
//     if (cantidadActual > 1) {
//       this.carritoItems[index].cantidad--;
//       this.actualizarTotalCarrito();
//     }
//   }

//   eliminarItemCarrito(event) {
//     const buttonClicked = event.target;
//     const selector = buttonClicked.parentElement.parentElement;
//     const index = this.findIndexInItems(selector);

//     this.carritoItems.splice(index, 1);
//     this.actualizarTotalCarrito();
//     this.ocultarCarrito();
//   }

//   ocultarCarrito() {
//     if (this.carritoItems.length === 0) {
//       this.carritoVisible = false;
//       const carrito = document.querySelector('.carrito');
//       carrito.style.marginRight = '-100%';
//       carrito.style.opacity = '0';

//       const items = document.querySelector('.contenedor-items');
//       items.style.width = '100%';
//     }
//   }

//   actualizarTotalCarrito() {
//     let total = 0;

//     for (const item of this.carritoItems) {
//       const precio = parseFloat(item.precio.replace('$', '').replace('.', ''));
//       total += precio * item.cantidad;
//     }

//     total = Math.round(total * 100) / 100;

//     document.querySelector('.carrito-precio-total').textContent = '$' + total.toLocaleString('es') + ',00';
//   }

//   private findIndexInItems(selector): number {
//     const titulo = selector.querySelector('.carrito-item-titulo').textContent;
//     return this.carritoItems.findIndex(carritoItem => carritoItem.titulo === titulo);
//   }
// }