import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly serverURL = "http://localhost:3000/produtoLista/";

  constructor(private http:HttpClient) { }

  postProduto(data: any){
    return this.http.post<any>(this.serverURL, data);
  }

  getProduto() {
    return this.http.get<any>(this.serverURL);
  }
  putProduto(data: any, id: number) {
    return this.http.put<any>(this.serverURL+id, data);
  }
  deleteProduto(id: number) {
    return this.http.delete<any>(this.serverURL+id);
  }
}
