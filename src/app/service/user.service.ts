import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscribedUser } from './subscribeduser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:8080/identity';
  
  constructor(private http: HttpClient) { }

  public addSubscription(user: SubscribedUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subscribe`, user);
  }
  
}
