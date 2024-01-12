import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `http://localhost:8080/products`;
  byParams = `/byParams`;

  constructor(private http: HttpClient) { }

  public getAllProductsByParams(queryParams: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + this.byParams, { params: queryParams });
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  public getProductsByCategory(categoryId: number, queryParams: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`, { params: queryParams });
  }

  public getAllMaleProducts(queryParams: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/male`, { params: queryParams });
  }

  public getAllFemaleProducts(queryParams: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/female`, { params: queryParams });
  }

  public getAllChildrenProducts(queryParams: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/name/children`, { params: queryParams });
  }

  public getAvailableQuantityBySize(product: Product, size: string) {
    return product.productStocks.find(stock => stock.size == size)?.quantity;
  }
}
