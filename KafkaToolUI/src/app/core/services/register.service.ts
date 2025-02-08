import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private brokerServiceUrl = 'localhost:1111/kafka-api/broker/register';

  constructor(private http: HttpClient) { }

  
  
}
