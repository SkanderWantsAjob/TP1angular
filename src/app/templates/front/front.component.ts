import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RainbowInputDirective } from 'src/app/rainbow-input.directive';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrls: ['./front.component.css'],
    standalone: true,
    imports: [RouterOutlet, RainbowInputDirective]
})
export class FrontComponent {

}
