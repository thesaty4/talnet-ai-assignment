// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import environment from '../../../environments/environment';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';

  // TODO: Replace this token with your own token
  constructor() {
    this.setToken(environment.keyClockToken);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
  }
}
