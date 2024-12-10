import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrl: './master-detail.component.css'
})
export class MasterDetailComponent {
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Cv[] = [];
  constructor(private router: Router){
    this.cvService.selectCv$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: cv =>  this.router.navigate([cv.id],{ relativeTo: this.router.routerState.root.firstChild })
    })
  }
  cvs$ = this.cvService.getCvs().pipe(
    catchError(()=>{
      this.toastr.error('Attention!! Les données sont fictives, problème avec le serveur.Veuillez contacter l admin.')
      return of(this.cvService.getFakeCvs());
    })
  );

} 
