import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}  from '@angular/common/http';
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'
})

export class RestserviceService {
  
  server = "http://localhost:8080/"
  user :string;
  constructor(private http : HttpClient) {}
  
  private setHeaders(user : string):HttpHeaders{
    var headers = new HttpHeaders();
    headers.append("X-user",user);
    return headers;
  }

  private handleError(error : any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getWorld(): Promise<World> {
    return this.http.get(this.server + "adventurecommunisme/generic/world",
    {headers: this.setHeaders(this.user)})
      .toPromise().catch(this.handleError);
  }

  saveWorld(world : World): Promise<Object>{
    return this.http.put(this.server+"adventurecommunisme/generic/save",world,
    {headers: this.setHeaders(this.user)})
    .toPromise();
  }

}
