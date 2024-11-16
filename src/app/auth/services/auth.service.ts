import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SESSION_KEYS } from 'src/config/sessionKeys';
import { API } from '../../../config/api.config';
import { AuthStatus } from '../authStatus';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = signal<AuthStatus>({
    email: localStorage.getItem(SESSION_KEYS.email),
    userId: localStorage.getItem(SESSION_KEYS.userId),
    isAuthenticated: !!localStorage.getItem(SESSION_KEYS.token),
    token: localStorage.getItem(SESSION_KEYS.token),
  });
  stateIsAuthenticated = computed(() => this.authState().isAuthenticated);
  private http = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
    tap((response) => {
      this.authState.set({
        email: credentials.email,
        userId: response.userId.toString(),
        isAuthenticated: true,
        token: response.id,
      });
      
      localStorage.setItem(SESSION_KEYS.token, response.id);
      localStorage.setItem(SESSION_KEYS.email, credentials.email);
      localStorage.setItem(SESSION_KEYS.userId, response.userId.toString());
    })
  );
  }

  

  logout() {
    localStorage.removeItem(SESSION_KEYS.token);
    localStorage.removeItem(SESSION_KEYS.email);
    localStorage.removeItem(SESSION_KEYS.userId);
    
    this.authState.set({
      email: null,
      userId: null,
      isAuthenticated: false,
      token: null,
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(SESSION_KEYS.token);
  }
}
