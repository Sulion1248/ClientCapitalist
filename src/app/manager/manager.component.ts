import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pallier, Product } from '../world';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
    manag: Pallier;
    money: number;
    RessourcesImages: string = "http://localhost:8080/logo/";
    cheminimage: string = this.RessourcesImages;
  @Input()
  set setmanag(value: Pallier){
    this.manag = value;
  } 
  
  @Input()
  set setmoney(value: number){
    this.money = value;
  } 

  @Output() notifymanag: EventEmitter<Pallier> = new EventEmitter<Pallier>();

  EstAchetable():boolean{
    return((this.manag.seuil<this.money)&&!this.manag.unlocked)
  }
  Achete(){
    this.manag.unlocked=true;

  }
  ngOnInit() {
  }

}
