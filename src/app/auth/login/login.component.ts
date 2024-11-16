import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';
import { APP_ROUTES } from '../../../config/routes.config';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private login$=new Observable<LoginResponseDto | null>()

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
  login(credentials: CredentialsDto) {
    this.login$=this.authService.login(credentials).pipe(
    tap(()=>{
          this.toastr.success(`Bienvenu chez vous :)`);
          this.router.navigate([APP_ROUTES.cv]);
    }),
    catchError(()=>{
          this.toastr.error('Veuillez vérifier vos credentials');
          return of(null)
    })
  )
  this.login$.subscribe()
  }
}
