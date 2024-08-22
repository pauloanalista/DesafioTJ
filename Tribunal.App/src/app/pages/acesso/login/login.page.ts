import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  login = { email: 'admin@tj.com.br', senha: '123456' };
  constructor(public menuCtrl: MenuController, private navCtrl: NavController, private usuarioService: UsuarioService, private utilService: UtilService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);

  }

  autenticar() {
    this.loading = true;
    //this.navCtrl.navigateRoot('home');

    this.usuarioService.autenticar(this.login)
      .then((response: any) => {
        this.loading = false;

        if (response.autenticado == false) {

          this.utilService.showAlert(response.mensagem);
          return;
        }

        
        let boasvindas = 'Olá ' + response.nome + ' seja bem vindo(a).';
        localStorage.setItem('token', response.token);
        
        //this.utilService.publishEvent("menu",response);

        this.utilService.showAlert(boasvindas, () => {
          this.menuCtrl.enable(true);
          this.menuCtrl.swipeGesture(true);
          this.navCtrl.navigateRoot('usuarios');

          //this.navCtrl.pop();
        });
      })
      .catch((erro) => {
        this.loading = false;
        this.utilService.showAlert('Operação falhou, tente novamente mais tarde!');
      });
  }
  openNovoUsuario() {
    this.navCtrl.navigateForward('usuario-novo');
  }

  openLembrarSenha() {
    this.navCtrl.navigateForward('lembrar-senha');
  }

  voltar(){
    this.navCtrl.navigateRoot('');
  }
}
