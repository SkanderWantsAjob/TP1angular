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
  cvs$: Observable<Cv[]>;
  selectedCv$: Observable<Cv>;
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {this.cvs$ = this.cvService.getCvs().pipe(catchError(() => {
    this.toastr.error(`
              Attention!! Les données sont fictives, problème avec le serveur.
              Veuillez contacter l'admin.`);
    return of(this.cvService.getFakeCvs());
  }));
  this.selectedCv$ = this.cvService.selectCv$;
}
}