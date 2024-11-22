import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TTCComponent {
  quantity =signal( 1)
  TVA = signal (18)
  prix= signal(0)
  // reduction = signal("")

  

  reduction = computed(()=>{
    if (this.quantity()>15 ){
      
      return 0.3
    }
    if (this.quantity() > 10 ){
      return 0.2
    }
    return 0
  })
  calculerPrix (quantite:number, prix:number, tva:number){

    return quantite*prix*(1-this.reduction())*(1+tva/100)
  }

  finalprice = computed(()=> {
    return this.calculerPrix(this.quantity(), this.prix(), this.TVA())
  })


}
