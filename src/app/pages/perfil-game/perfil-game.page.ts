import { ActivatedRoute } from '@angular/router';
import { Game } from './../../model/game';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-game',
  templateUrl: './perfil-game.page.html',
  styleUrls: ['./perfil-game.page.scss'],
})
export class PerfilGamePage implements OnInit {

  protected game:Game = new Game;
  private id:string = null;

  constructor(
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id){
      this.gameService.get(this.id).subscribe(
        res=>{
          this.game = res
   }
  )
  }
 }
}
