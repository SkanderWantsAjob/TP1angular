import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbowInput],[typetext]',
  standalone: true
})
export class RainbowInputDirective {
 private colors : string[] = ['red', 'blue', 'orange' , 'purple', 'yellow', 'pink']
 @HostBinding('style.color') textColor:string= '';
 @HostBinding('style.borderColor') borderColor: string ='';
  constructor() { }
  @HostListener('keyup') onKeyUp(){
    const color=this.colors[Math.floor(Math.random()* this.colors.length)];
    this.textColor = color
    this.borderColor = color
  }

}
