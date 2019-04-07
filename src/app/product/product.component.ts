import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../world';

declare var require;
const ProgressBar = require("progressbar.js");


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
  @ViewChild('bar') progressBarItem;
  progressbar: any;
  product: Product;
  lock: boolean = false;
  money: number ;
  cout: number;
  prodboutonactuel: number;
  quantiteachat:number;
  quantite: number=0;
  vit: number=1;


  @Output() notifyProduction: EventEmitter<Product> = new
  EventEmitter<Product>();
  @Output() notifyBuy: EventEmitter<[number,number,Product]> = new EventEmitter<[number,number,Product]>();

  @Input()
  set prod(value: Product){
    this.product = value;
  }
  @Input()
  set prodmoney(value: number){
    this.money = value;
  }
  @Input()
  set bouton(value: number){
    this.prodboutonactuel = value;
  }
  @Input()
  set vitesse(value: number){
    this.vit = value;
  }


  RessourcesImages: string = "http://localhost:8080/logo/";
  cheminimage: string = this.RessourcesImages;
  ngOnInit() {
    this.progressbar = new
    ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 10, color: '#00ff00' });
    setInterval(() => { this.autoFabrication();this.calcScore(); this.calcachat()}, 500);
  }

  calcScore(){
    while(this.quantite>0){
    this.quantite=this.quantite-1;
    this.notifyProduction.emit(this.product);
    }
  }
  achatposs(){
    return((this.money>=this.cout)&&(this.quantiteachat!=0))
  }

autoFabrication(){
  if(this.product.managerUnlocked){
    this.startFabrication();}
  
}

   startFabrication(){
     if(this.product.quantite>0){
      if (this.lock == false){
        this.progressbar.animate(1, { duration : this.product.vitesse*this.vit });
        this.lock = true
        setTimeout( () => { this.lock = false;
          this.progressbar.set(0);
          this.quantite=this.quantite+1;
        }, this.product.vitesse*this.vit);
       }
   }
  }
   calcachat(){
    if (this.prodboutonactuel==0){
    this.quantiteachat=1;
    this.cout=this.product.cout*this.suitegeo(this.product.croissance,this.product.quantite);
    }
    if (this.prodboutonactuel==1){
    this.quantiteachat=10;
    this.cout=0;
    for(var i=0; i<10; i++){
      this.cout=this.cout+this.product.cout*this.suitegeo(this.product.croissance,this.product.quantite+i)  	
    }
    }
    if (this.prodboutonactuel==2){
    this.quantiteachat=100;
    this.cout=0;
    for(var i=0; i<100; i++){
      this.cout=this.cout+this.product.cout*this.suitegeo(this.product.croissance,this.product.quantite+i)
  
    }
    }
    if (this.prodboutonactuel==3){
    this.quantiteachat=0;
    this.cout=0;
    var moneyloc=this.money;
    while(moneyloc>this.cout) {
      this.cout=this.cout+this.product.cout*this.suitegeo(this.product.croissance,this.product.quantite+this.quantiteachat);
      this.quantiteachat=this.quantiteachat+1
    }
    if (this.cout>this.money){
      this.quantiteachat=this.quantiteachat-1
      this.cout=this.cout-this.product.cout*this.suitegeo(this.product.croissance,this.product.quantite+this.quantiteachat);	
    }
  }}
  suitegeo(croissance: number, exposant: number): number {
    var res=1;
    for(var j=0;j<exposant;j++){
      res=croissance*res;
    }
  return(res)}
  
}
