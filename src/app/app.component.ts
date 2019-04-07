import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project-Moulard';
  world : World = new World();
  server: string;
  button=[1,2,3,0];
  buttonactuel=0;
  toasterService: ToasterService;
  username:string="coucou";
  upgradevit: number[]=[1,1,1,1,1,1];
  upgraderev: number[]=[1,1,1,1,1,1];
  managaffich: boolean=true;
  
  constructor (private service: RestserviceService,toasterService: ToasterService) {
    this.server = service.server;
    this.username=service.user;
    service.getWorld().then(world => {
      console.log(world)
      this.world = world;
      this.toasterService = toasterService;    
      
    })
  }
  
  ngOnInit() {
    this.username=localStorage.getItem("username");
    setInterval(() => { this.newmanag();this.verifseuil()}, 100);
  }

  verifseuil(){
    for(let prod of this.world.products.product){
      var quantite=prod.quantite;
      for(let pall of prod.palliers.pallier){
        if((pall.seuil<quantite)&&(!pall.unlocked)){
          pall.unlocked=true;
          this.toasterService.pop('success', 'Seuil atteint ! ', pall.name);
          if(pall.typeratio=="vitesse"){
            if(pall.idcible==0){
              for(let proda of this.world.products.product){
                this.upgradevit[proda.id-1]=this.upgradevit[proda.id-1]*pall.ratio;
              }
            }
            else{
              this.upgradevit[prod.id-1]=this.upgradevit[prod.id-1]*pall.ratio;
            }      	
          }
          else{
            if(pall.idcible==0){
              for(let proda of this.world.products.product){
                this.upgraderev[proda.id-1]=this.upgraderev[proda.id-1]*pall.ratio;
              }
            }
            else{
              this.upgraderev[prod.id-1]=this.upgraderev[prod.id-1]*pall.ratio;
            }
          }
        }
    }
    }}
  
  
  newmanag():boolean{
    var res=false;
    for(let manag of this.world.managers.pallier){
      if((manag.seuil<=this.world.money)&&(!manag.unlocked)){
        res=true;
      }
    }
    return res;
  }
  onProductionDone(prod : Product){
    this.world.money=prod.quantite*prod.revenu*this.upgraderev[prod.id-1]+this.world.money
  }

  onBuy(coutquantiteprod: [number,number,Product]){
      coutquantiteprod[2].quantite= coutquantiteprod[2].quantite+coutquantiteprod[1];
      this.world.money=this.world.money-coutquantiteprod[0];
  }

  increment(){
    this.buttonactuel=this.button[this.buttonactuel];
  }
  updateusername(){
    localStorage.setItem("username",this.username)
    console.log(this.username)

  }
  achatmanag(manag:Pallier){
    this.toasterService.pop('success', 'Manager hired ! ', manag.name);
    manag.unlocked=true;
    var id=manag.idcible-1;
    this.world.money = this.world.money-manag.seuil;
    this.world.products.product[id].managerUnlocked=true;}
}
