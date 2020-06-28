import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FinanzaService {
  constructor(private httpClient: HttpClient) {}

  // async authentication(user: User) {
  //   return await this.httpClient
  //     .get<User>(`${environment.api}/tasas-nominales`, )
  //     .toPromise();
  // }
}
