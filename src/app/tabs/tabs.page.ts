import { PlayerService } from './../services/player.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected quantPlayer:number = 0;

  constructor(
    protected playerService: PlayerService,
  ) {
    this.playerService.getAll().subscribe(
       res =>{
         this.quantPlayer = res.length
       }
    )
  }

}
