import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

@Injectable({
  providedIn: 'root'
})
export class CvResolver implements Resolve<Cv[]> {
  constructor(private cvService: CvService) {}

  resolve(): Observable<Cv[]> {
    return this.cvService.getCvs(); 
  }
}
