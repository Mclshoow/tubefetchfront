import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  getDadosApi(): Promise<any> {
    console.log("passei aqui");
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.apiUrl}/v1/todos`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          console.error('Erro na chamada da API:', error);
          reject(error); // Você pode manipular o erro de acordo com suas necessidades
        }
      );
    });
  }
}

