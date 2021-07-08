import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsEditComponent } from './components/goods-edit/goods-edit.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path:"",
    component: LayoutComponent,
    children:[
      {
        path:"",
        component: MainComponent,
      },
      {
        path:"goods-list",
        component: GoodsListComponent,
      },
      {
        path:"goods-edit",
        component: GoodsEditComponent,
      },
      {
        path:"goods-edit/:id",
        component: GoodsEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
