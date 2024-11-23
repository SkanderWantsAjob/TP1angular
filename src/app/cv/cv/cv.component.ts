import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, of } from "rxjs";
import { LoggerService } from "../../services/logger.service";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"]
})
export class CvComponent {
  allcv$: Observable<Cv[]>;
  juniorvc$: Observable<Cv[]> = new Observable<Cv[]>();
  serniorcv$: Observable<Cv[]>  = new Observable<Cv[]>();
  selectedCv$: Observable<Cv>;
  date = new Date();
  currentTab: 'junior' | 'senior' = 'junior';

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {this.allcv$ = this.cvService.getCvs().pipe(catchError(() => {
    this.toastr.error(`
              Attention!! Les données sont fictives, problème avec le serveur.
              Veuillez contacter l'admin.`);
    return of(this.cvService.getFakeCvs());
  }));
  this.allcv$.subscribe(cvs => {
    this.juniorvc$ = of(cvs.filter(cv => cv.age < 40));
    this.serniorcv$ = of(cvs.filter(cv => cv.age >= 40));
  });
  this.selectedCv$ = this.cvService.selectCv$;
  }
  change(tab: 'junior' | 'senior'): void {
    this.currentTab = tab;
  }

}