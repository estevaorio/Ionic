import { map } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Game } from './../../model/game';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerCluster,
  MyLocation,
  LocationService
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  protected game:Game = new Game;
  protected id: any = null;
  protected preview: any = null;
  protected posLat: number = 0;
  protected posLng: number = 0;

  protected map: GoogleMap;

  constructor(
    protected gameService:GameService,
    protected alertController: AlertController,
    protected router:Router,    
    protected activedRoute: ActivatedRoute,
    private camera: Camera,
    private geolocation: Geolocation,
    private platform: Platform
  ) { }

  async ngOnInit() {
    //Localização atual
    this.atualLocal();
    //Plataforma e GoogleMaps
    await this.platform.ready();
    await this.loadMap();

    //Pega Id para autilaização dos dados do Player
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.gameService.get(this.id).subscribe(
        res => {
          this.game = res
          this.preview = this.game.fotos
        },
        //erro => this.id = null
      )
    }
  }


  onsubmit(form){
    if (!this.preview) {
      this.presentAlert("Erro", "Deve inserir uma foto do perfil!");
    } else {
      this.game.fotos = this.preview;
      this.game.lat = this.posLat;
      this.game.lng = this.posLng;

      if (!this.id) {
        this.gameService.save(this.game).then(
          res => {
            form.reset();
            this.game = new Game;
            //console.log("Cadastrado!");
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/', res.id]);
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
            this.router.navigate(['/tabs/perfilGame', this.id]);
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

  atualLocal() {
    this.geolocation.getCurrentPosition().then(
      resp => {
        this.posLat = resp.coords.latitude;
        this.posLng = resp.coords.longitude;
      }).catch(
        error => {
          console.log('Não foi possivel pegar sua localização!', error);
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

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      'camera': {
        'target': {
          "lat": this.posLat,
          "lng": this.posLng
        },
        'zoom': 15
      }
    });
    //this.addCluster(this.dummyData());
     this.Localizacao()

  }
  Localizacao(){
    LocationService.getMyLocation().then(
      (myLocation: MyLocation) =>{
        this.map.setOptions({
          camera:{
            target: myLocation.latLng
          }
        })

        let marker: Marker = this.map.addMarkerSync({
          position: {
            lat: myLocation.latLng.lat,
            lng: myLocation.latLng.lng
          },
          icon: "#2fff00",
          title: "Estevão",
          snippet: "Estou aqui"
        })

        this.map.on(GoogleMapsEvent.MARKER_CLICK).subscribe(
          res=>{
            marker.setTitle(this.game.nome)
            marker.setSnippet(this.game.console)
            marker.showInfoWindow()
          }
          
        )

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
          res=>{
            console.log(res)
            //this.map.addMarker({
             // position:{
              //  lat:res[0].lat,
               // lng:res[0].lng
            //}
         // })
            marker.setPosition(res[0])

          }
        )
          

      }
    )
  }

}


