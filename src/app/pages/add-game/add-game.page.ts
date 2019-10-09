import { AlertController } from '@ionic/angular';
import { Game } from './../../model/game';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  protected game:Game = new Game;
  protected id: any = null;
  protected preview: any = null;

  constructor(
    protected gameService:GameService,
    protected alertController: AlertController,
    protected router:Router,    
    protected activedRoute: ActivatedRoute,
    private camera: Camera,
  ) { }

  ngOnInit() {
  }


  onsubmit(form){
    if (!this.preview) {
      this.presentAlert("Erro", "Deve inserir uma foto do perfil!");
    } else {
      this.game.fotos = this.preview;

      if (!this.id) {
        this.gameService.save(this.game).then(
          res => {
            form.reset();
            this.game = new Game;
            //console.log("Cadastrado!");
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/tabs/perfilGame', res.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel cadastrar!")
          }
        )
      } else {
        this.gameService.update(this.game, this.id).then(
          res => {
            form.reset();
            this.game = new Game;
            this.presentAlert("Aviso", "Atualizado!")
            this.router.navigate(['/tabs/perfilPlayer', this.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel atualizar!")
          }
        )
      }
    }
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  //Alerts-----------------------

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}


