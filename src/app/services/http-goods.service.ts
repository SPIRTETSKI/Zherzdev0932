import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../interfaces/goods';
@Injectable({
  providedIn: 'root'
})
export class HttpGoodsService {
  goodsAPI = 'http://localhost:3000/goods';
  categoriesAPI = 'http://localhost:3000/categories';


  constructor(private http: HttpClient) {}

  getGoods():Promise<any>{
    return this.http.get(this.goodsAPI).toPromise();
  }
  postGood(data: Good){   
    return this.http.post(this.goodsAPI, data).toPromise();
  }
  getGood(id:number):Promise<any>{
    return this.http.get(this.goodsAPI+`/${id}`).toPromise();
  }
  deleteGood(id: number){
    return this.http.delete(this.goodsAPI+`/${id}`).toPromise();
  }
  updateGood(id: number, good:any){
    return this.http.patch(this.goodsAPI +`/${id}`,good).toPromise();
  }
  getCategories():Promise<any>{
    return this.http.get(this.categoriesAPI).toPromise();
  }
}
