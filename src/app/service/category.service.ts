import { Injectable, OnInit } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getSubCategories(category: Category): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}/subcategories/${category.id}`);
  }

}
