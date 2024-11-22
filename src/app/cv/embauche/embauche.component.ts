import { Component, inject, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';

import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-embauche',
    templateUrl: './embauche.component.html',
    styleUrls: ['./embauche.component.css'],
    standalone: true,
    imports: [
    ItemComponent
],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  public embauchees= signal<Cv[]>([])

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.embauchees.set(this.embaucheService.getEmbauchees());
  }
}
