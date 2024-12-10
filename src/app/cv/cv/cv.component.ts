import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { map, Observable, of, share } from "rxjs";
import { LoggerService } from "../../services/logger.service";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"]
})
export class CvComponent implements OnInit {
  allcv$: Observable<Cv[]> = new Observable<Cv[]>();
  juniorvc$: Observable<Cv[]> = new Observable<Cv[]>();
  serniorcv$: Observable<Cv[]>  = new Observable<Cv[]>();
  selectedCv$: Observable<Cv> = new Observable<Cv>;
  date = new Date();
  currentTab: 'junior' | 'senior' = 'junior';

  constructor(
    private activatedRoute: ActivatedRoute,
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
  
  }
  ngOnInit(): void {
    this.allcv$ = this.cvService.getCvs().pipe(share())
    


    this.juniorvc$ = this.allcv$.pipe(
      map(cvs => cvs.filter(cv => cv.age < 40))
    );
    this.serniorcv$ = this.allcv$.pipe(
      map(cvs => cvs.filter(cv => cv.age >= 40))
    );
    this.selectedCv$ = this.cvService.selectCv$;
  }
  change(tab: 'junior' | 'senior'): void {
    this.currentTab = tab;
  }

  onCvSelected(cv: Cv): void {
    this.selectedCv$ =of( cv);
  }

}