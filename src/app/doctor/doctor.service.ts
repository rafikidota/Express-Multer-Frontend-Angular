import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Doctor, DoctorResponse } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  // create(doctor: Doctor) {
  //   const url = `${this.base_url}/doctor`;
  //   return this.http.post<DoctorResponse>(url, doctor);
  // }

  create(doctor: Doctor, file: File) {
    const url = `${this.base_url}/doctor/`;
    // const data = { name: 'chiri moya', email: 'chirimoya@gmail.com' }
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('data', JSON.stringify(doctor));
    return this.http.post<DoctorResponse>(url, formData);
  }
}
