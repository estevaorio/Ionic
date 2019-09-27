import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.page.html',
  styleUrls: ['./list-game.page.scss'],
})
export class ListGamePage implements OnInit {

  protected game: any;

  constructor(
    protected gameService:GameService
  ) { }

  ngOnInit() {
    this.gameService.getAll().subscribe(
      res=>{
        this.game = res
      }
    )
  }

doRefresh(event){
  console.log('Begin async operation');
  this.gameService.getAll().subscribe(
    res =>{
      this.game = res

     setTimeout(() => {
       console.log('Async operation has ended');
       event.target.complete();
      },0);
     }
    );
  }
}
