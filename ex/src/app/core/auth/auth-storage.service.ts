import { Injectable } from '@angular/core'
import { AbstractSecurityStorage } from 'angular-auth-oidc-client'

@Injectable()
export class AuthStorageService implements AbstractSecurityStorage {
  /**
   * Get local storage item
   * @param {string} key
   * @returns {string | null}
   */
  public read(key: string): string | null {
    return localStorage.getItem(key)
  }

  /**
   * Set local storage item
   * @param {string} key
   * @param {any} value
   */
  public write(key: string, value: any): void {
    localStorage.setItem(key, value)
  }

  /**
   * Remove local storage item
   * @param {string} key
   */
  public remove(key: string): void {
    localStorage.removeItem(key)
  }

  /**
   * Clear local storage
   */
  public clear(): void {
    localStorage.clear()
  }
}
