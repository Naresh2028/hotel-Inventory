import { style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hinvHover]',
})
export class HoverDirective implements OnInit {
  @Input() hinvHover: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(element.nativeElement);
  }

  ngOnInit() {
    //this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.hinvHover
    );

  }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'yellow'
    );
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'blue'
    );
  }


}
