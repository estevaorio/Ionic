import { AlertController } from '@ionic/angular';
import { Key } from 'protractor';
import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.page.html',
  styleUrls: ['./list-player.page.scss'],
})
export class ListPlayerPage implements OnInit {

  protected players: any;

  constructor(
    protected playerService: PlayerService,
    private router: Router,
    protected alertController: AlertController

  ) { }

  ngOnInit() {
    this.refreshPlayers();
  }


  apagar(player) {
    this.presentAlertConfirm(player);

  }


  editar(player) {
    this.router.navigate(['/tabs/addPlayer/' + player.key])
  }




  doRefresh(event) {
    console.log('Begin async operation');
    this.playerService.getAll().subscribe(
      res => {
        this.players = res

        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 0);
      }
    );
  }


  refreshPlayers() {
    this.playerService.getAll().subscribe(
      res => {
        this.players = res;

      }
    )
  }
  //Alerts-------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertConfirm(player) {
    const alert = await this.alertController.create({
      header: 'Apagar dados!',
      message: 'Apagar todos os dados do Player',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.playerService.remove(player).then(
              res => {
                this.presentAlert("Aviso", "Apagado com sucesso!");
                this.refreshPlayers();

              },
              erro => {
                this.presentAlert("Erro", "Ao apagar o item!");
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }
}



