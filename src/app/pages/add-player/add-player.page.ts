import { Player } from './../../model/player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  protected player:Player = new Player;

  constructor() { }

  ngOnInit() {
  }

}
