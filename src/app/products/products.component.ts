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


   public products: Array<Product> = [];
    //products$!: Observable<Array<Product>>;
    public keyword: string = "";
    totalPages: number = 0;
    pageSize: number = 3;
    currentPage: number = 1;
  constructor(private productService:ProductService, private http: HttpClient) {

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

    this.productService.getProducts(this.currentPage, this.pageSize)
    .subscribe({
        next: (resp) => {
          this.products = resp.body as Array<Product>;
          let totalProducts:number = parseInt(resp.headers.get("X-Total-Count")!);
          this.totalPages = Math.ceil(totalProducts / this.pageSize);
          if(totalProducts % this.pageSize != 0)
            this.totalPages++;
          console.log("Total Pages: " + this.totalPages);




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
        this.products = this.products.filter(p=>p.id!= product.id);
      }
    })
}

  /*searchProducts() {
    this.productService.searchProducts(this.keyword)
      .subscribe({
        next: value => {
          this.products = value;
        }
      });
  }*/

      searchProducts() {
  const keywordLower = this.keyword.toLowerCase();
  this.products = this.products.filter(product =>
    product.name.toLowerCase().includes(keywordLower)
  );
}

}

