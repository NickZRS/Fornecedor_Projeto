import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suppliers } from './form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  url = "http://localhost:3000/suppliers";

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Suppliers[]>{


    return this.http.get<Suppliers[]>(this.url);

  }

  save(supplier: Suppliers): Observable<Suppliers>{
    return this.http.post<Suppliers>(this.url, supplier);

  }

  remove(supplier: Suppliers): Observable<void>{
    return this.http.delete<void>(`${this.url}/${supplier.id}`);

  }
  update(supplier: Suppliers): Observable<Suppliers>{
    return this.http.put<Suppliers>(`${this.url}/${supplier.id}`, supplier);

  }
}
