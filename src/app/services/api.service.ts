import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/show';

  constructor(private http: HttpClient) {}

  getPosts(
    page: number,
    limit: number,
    type: string | undefined,
    searchKey: string | undefined
  ): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (type) {
      url += `&type=${type}`;
    }
    if (searchKey) {
      url += `&searchKey=${searchKey}`;
    }
    return this.http.get<any>(url);
  }
}
