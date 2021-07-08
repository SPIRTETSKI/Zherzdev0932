import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Good } from 'src/app/interfaces/goods';
import { HttpGoodsService } from 'src/app/services/http-goods.service';

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.css']
})
export class GoodsEditComponent implements OnInit {

  constructor(
    private HttpGoodsService: HttpGoodsService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute
  ) { }
  goods!:Good[];
  categories!: Category[];
  goodsForm!: FormGroup;
  id?: number | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;     
      })   
    this.getGoods();
    this.getCategories();  
    }
    async getGoods(){
      const controls = {
        name: [null, [Validators.required, Validators.maxLength(100)]],
        article: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[0-9]+$')]],
        price: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[0-9]+$')]],
        manufacturer: [null, [ Validators.maxLength(100)]],
        category: [null, [Validators.required, Validators.maxLength(100)]],
        weight: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[0-9]+$')]],
        quantity: [null, [Validators.required, Validators.maxLength(100),  Validators.pattern('[0-9]+$')]]      
      }
      this.goodsForm = this.fb.group(controls);
      if (this.id) {
        try {
          this.goods = await this.HttpGoodsService.getGood(this.id)
          this.goodsForm.patchValue(this.goods)
          // console.log(this.goods)
        } catch (error) {
        console.log(error)
        }
        
      }
    }
    async getCategories(){
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
    async onAddGood(){
      if (this.id) {
        this.goodsForm.controls['article'].value;
        this.goodsForm.controls['price'].value;
        this.goodsForm.controls['manufacturer'].value;
        this.goodsForm.controls['category'].value;
        this.goodsForm.controls['weight'].value;
        this.goodsForm.controls['quantity'].value;
        const goods = this.goodsForm.value;
        const checkvalid = await this.HttpGoodsService.getGood(this.id)
        if (checkvalid.name == goods.name && checkvalid.article == goods.article && checkvalid.price == goods.price && checkvalid.manufacturer == goods.manufacturer && checkvalid.category == goods.category
          && checkvalid.weight == goods.weight && checkvalid.quantity == goods.quantity) {  
          this.router.navigate(['/goods-list']);
        }
        else {
          try {
            await this.HttpGoodsService.updateGood(this.id, goods)
            this.router.navigate(['/goods-list']);
          } catch (error) {
    
          }
        }
      }
      else {
        this.goodsForm.controls['article'].value;
        this.goodsForm.controls['price'].value;
        this.goodsForm.controls['manufacturer'].value;
        this.goodsForm.controls['category'].value;
        this.goodsForm.controls['weight'].value;
        this.goodsForm.controls['quantity'].value;
        this.goods = this.goodsForm.value;
        this.goodsForm.patchValue(this.goods);
        try {
          await this.HttpGoodsService.postGood(this.goodsForm.value);
          this.router.navigate(['/goods-list']);
        } catch (err) {
          console.log(err);
        }
      }
    }
    async onDeleteGood(){
      if (this.id)
      try {
        await this.HttpGoodsService.deleteGood(this.id)
        this.router.navigate(['/goods-list']);
      } catch (error) {
    
      }
    this.router.navigate(['/goods-list'])
    } 

  }


