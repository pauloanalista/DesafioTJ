import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  public usuarioCollection: any[] = [];
  public collection: any[] = [];
  loading: boolean = false;

  filtro: string;
  constructor(
    private usuarioService: UsuarioService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loading = true;
    this.usuarioService.listar()
      .then((response: any) => {
        this.collection = response.data;
        this.usuarioCollection = this.collection;
      })
      .catch(error => {
        this.utilService.showError(error);
      }).finally(() => {
        this.loading = false;
      });
  }

  showMap(url) {
    window.open(url);
    // const browser = this.iab.create(url);
    // browser.show();
  }

  filtrarUsuario(event: CustomEvent) {
    this.filtro = event.detail.value;
    if (this.filtro == 'all') {
      return this.usuarioCollection = this.collection;
    }
    this.usuarioCollection = this.collection.filter(x => { return x.status == this.filtro });
  }
}
