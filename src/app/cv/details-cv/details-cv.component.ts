import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable } from 'rxjs';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$ : Observable<Cv> | undefined
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    // this.cvService.getCvById(+id).subscribe({
    //     next: (cv) => {
    //       this.cv = cv;
    //     },
    //     error: (e) => {
    //       this.router.navigate([APP_ROUTES.cv]);
    //     },
    //   });
    this.cv$ = this.cvService.getCvById(+id).pipe(
      catchError(()=> {
        this.toastr.error(`
        error or something idk`)
        this.router.navigate([APP_ROUTES.cv])
          return EMPTY
      })
    )
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
