import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Game } from './../../model/game';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  protected game:Game = new Game;

  constructor(
    protected gameService:GameService,
    protected alertController: AlertController,
    protected router:Router
  ) { }

  ngOnInit() {
  }


  onsubmit(form){
    this.gameService.save(this.game).then(
      res=>{
        form.reset();
        this.game = new Game;
        //+console.log("Cadastrado");
        this.presentAlert("Aviso", "Cadastrado!")
        this.router.navigate(['/tabs/listPlayer']);
      },
      erro=>{
        console.log("Erro: " + erro);
        this.presentAlert("Erro:", "Não foi possível cadastrar!")
      }
    )

  }

  //Alerts-----------------------

  async presentAlert(tipo:string, texto:string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}


