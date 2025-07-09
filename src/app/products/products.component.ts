import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

   products: Array<Product> = []
    //products$!: Observable<Array<Product>>;
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
      /*this.http.get<Array<any>>("http://localhost:8089/products").subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      })*/

     this.getProducts();
  }

  getProducts(){

    this.productService.getProducts()
    .subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      })
     //this.products$ = this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
    .subscribe({
        next: updateProduct => {
        product.checked = !product.checked;
        //this.getProducts();
        }
      })
  }

  handleDelete(product: Product) {
    if(!confirm("Are you sure you want to delete this product?"))
      return;
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.products = this.products.filter(p=>p.id != product.id);
      }
    })
}

}

