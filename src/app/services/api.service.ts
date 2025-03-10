import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/api/show';

  constructor(private http: HttpClient) {}

  getShows(
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

  getShowById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
