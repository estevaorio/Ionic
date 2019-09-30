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

  save(player) {
    return this.fire.collection("players")
      .add({
        nome: player.nome,
        nickname: player.nickname,
        email: player.email,
        pws: player.pws,
        ativo: true
      });
  }

  getAll() {
    return this.fire.collection("players").snapshotChanges().pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
      )
    )
  }

  get(id) {
    return this.fire.collection("players").doc<Player>(id).valueChanges();
  }

  update(player: Player, id: string){
     return this.fire.collection("players").doc<Player>(id).update(player);
  }

  remove(player: any){
    return this.fire.collection("players").doc(player.key).delete();
  }
}
