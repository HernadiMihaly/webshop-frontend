import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `http://localhost:8080/products`

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  public getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`);
  }

  public getAllMaleProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/male`);
  }

  public getAllFemaleProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/female`);
  }

  public getAllChildrenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/children`);
  }

}
