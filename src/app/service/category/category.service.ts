import { Injectable } from '@angular/core';
import { Category } from '../category/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getParentCategory(categoryId: Number): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${categoryId}/parent`);
  }

}
