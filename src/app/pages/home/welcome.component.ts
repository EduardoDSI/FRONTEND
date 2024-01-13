import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {}
// implements AfterViewInit {
//   @ViewChild('carousel')
//   carousel!: ElementRef;

//   ngAfterViewInit() {
//     this.iniciarCambioAutomatico();
//   }

//   iniciarCambioAutomatico() {
//     setInterval(() => {
//       this.carousel.nativeElement.carousel('next');
//     }, 300);
//   }
// }