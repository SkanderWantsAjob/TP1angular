import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent{
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  cv: Cv | null = null;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  //id = this.activatedRoute.snapshot.params['id']; //activatedRoute.snapshot gives a frozen copy so it doesnt
  //update when the route changes snapshot approach is static
  
  cvById$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const id = +params['id']; // used switchMap to extract id dynamically and trigger getCvById whenever id changes
      return this.cvService.getCvById(id).pipe(
        catchError(() => {
          this.toastr.error(
            'Attention!! Les données sont fictives, problème avec le serveur.Veuillez contacter l admin.'
          );
          this.router.navigate([APP_ROUTES.cv]);
          return of(null);
        })
      );
    })
  );

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