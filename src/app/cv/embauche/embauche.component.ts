import { Component, inject } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';
import { NgIf, NgFor } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-embauche',
    templateUrl: './embauche.component.html',
    styleUrls: ['./embauche.component.css'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ItemComponent,
    ],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  public embauchees: Cv[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.embauchees = this.embaucheService.getEmbauchees();
  }
}
