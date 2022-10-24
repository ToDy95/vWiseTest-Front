import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private  httpClient: HttpClient) { }

  getTag(){
    return this.httpClient.get('http://localhost:3005/tag');
  }
  getPhoto(){
    return this.httpClient.get('http://localhost:3005/photo');
  }
  // getSinglePhoto(id:string){
  //   return this.httpClient.get('http://localhost:3005/photo/:id')
  // }
}

