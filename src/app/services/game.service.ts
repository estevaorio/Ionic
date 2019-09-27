import { map } from 'rxjs/operators';
import { Key } from 'protractor';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from './../model/game';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(game) {
    return this.fire.collection("game")
      .add({
        nome: game.nome,
        categoria: game.categoria,
        console: game.console,
        descricao: game.descricao,
        quantidade: game.quantidade,
        valor: game.valor,
        ativo: true
      });
  }

  getAll() {
    return this.fire.collection("game").snapshotChanges().pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
      )
    )
  }

  get(id) {
    return this.fire.collection("game").doc<Game>(id).valueChanges();
  }
}

