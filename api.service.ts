import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(path: string, body: any): Promise<any> {
    return this.http.post<any>(path, body).toPromise();
  }

  get(path: string): Promise<any> {
    return this.http.get<any>(path).toPromise();
  }
}
