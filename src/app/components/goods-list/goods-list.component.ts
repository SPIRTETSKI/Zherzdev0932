import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Good } from 'src/app/interfaces/goods';
import { HttpGoodsService } from 'src/app/services/http-goods.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {

  constructor(private HttpGoodsService: HttpGoodsService, private fb: FormBuilder, private router: Router) { }
  goods!: Good[];
  categories!: Category[];
  goodsForm!: FormGroup;
  id?: number | null = null;
  StateCheck=false;
  quantityCheck = false;
  ngOnInit(): void {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      article: [null, [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.maxLength(100)]],
      manufacturer: [null, [Validators.maxLength(100)]],
      category: [null, [Validators.required, Validators.maxLength(100)]],
      weight: [null, [Validators.required, Validators.maxLength(100)]],
      quantity: [null, [Validators.required, Validators.maxLength(100)]]
    }
    this.goodsForm = this.fb.group(controls);
    this.getGoods();
    this.getCategories();
  }
  async getGoods() {
    try {
      this.goods = await this.HttpGoodsService.getGoods();
    } catch (error) {
      console.log(error)
    }
  }
  async getCategories() {
    try {
      this.categories = await this.HttpGoodsService.getCategories();
    } catch (error) {
      console.log(error)
    }
  }
  getCategoryName(id: number) {
    let category = this.categories?.find(x => x.id == id);
    return (category?.name);
  }
  linkToItem(id?: number) {
    if (id) {
      this.router.navigate(["goods-edit", id]);
    } else {
      this.router.navigate(["goods-edit"]);
    }
  }
  async addQuantity(id?: number) {
      if (id) {
        try {
        let currentGood = await this.HttpGoodsService.getGood(id)
        currentGood.quantity++;       
        await this.HttpGoodsService.updateGood(id, currentGood)        
        } catch (error) {
        console.log(error)
        }       
        this.getGoods();
  }
}

  async reduceQuantity(id?: number) {
    if (id) {
      try {
      let currentGood = await this.HttpGoodsService.getGood(id)       
      currentGood.quantity--;
      if(currentGood.quantity>=0){
        await this.HttpGoodsService.updateGood(id, currentGood)
        }
      } catch (error) {
      console.log(error)
      }       
      this.getGoods();
    }
  }
  // getQuantity(id: number) {
  //   let good = this.goods?.find(x => x.id == id);
  //   return (good?.name);
  // }
  sortByQuantity(){
    if(this.StateCheck==false)
    {
    this.goods.sort((a,b)=>{
      return a.quantity-b.quantity
    }
    )
    this.StateCheck = true;}
    else{
      this.goods.sort((a,b)=>{
        return b.quantity-a.quantity
      })
    this.StateCheck = false;
  }
}
  sortByPrice(){
    if(this.StateCheck==false)
    {
    this.goods.sort((a,b)=>{
      return a.price-b.price
    
    }
    )
    this.StateCheck = true;}
    else{
      this.goods.sort((a,b)=>{
        return b.price-a.price
      })
    this.StateCheck = false;
  }
}
async ApplyFilter(){
  await this.getGoods();
  let categoryID = this.goodsForm.controls['category'].value;
  if(categoryID != null)
  this.goods = this.goods.filter(x=> {return x.category == categoryID})
  if(this.quantityCheck==true)
   this.goods = this.goods.filter(x=> {return x.quantity != 0})
}
async Reset(){
this.goodsForm.controls['category'].setValue(null);
this.quantityCheck = false;
  await this.getGoods();
}
}

