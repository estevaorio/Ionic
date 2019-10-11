import { AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    protected alertController: AlertController,
    protected loadingController: LoadingController
  ) { }
}


async presentAlert(tipo: string, texto: string) {
  const alert = await this.alertController.create({
    header: tipo,
    //subHeader: 'Subtitle',
    message: texto,
    buttons: ['OK']
  });
  await alert.present();
}

//Loading---------------------
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Carregando...',
    //duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();

  console.log();
}

async dismissLoading(){
    this.loadingController.dismiss();
 }
}


