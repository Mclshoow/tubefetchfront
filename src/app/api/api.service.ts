import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) { }

  getDadosApi(): Observable<any> {
    console.log("passei aqui");
    return this.http.get<any>(`${this.apiUrl}/v1/todos`);
  }
}

