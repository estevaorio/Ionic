import { Player } from './../model/player';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(player){
    return this.fire.collection("players")
    .add({
      nome:player.nome,
      nickname:player.nickname,
      email:player.email,
      pws:player.pws,
      ativo:true
    });
 }

 getAll(){
   return this.fire.collection("players").snapshotChanges().pipe(
     map(dados =>
       dados.map(d=>({Key:d.payload.doc.id, ...d.payload.doc.data()}))
     )
   )
 }
}
