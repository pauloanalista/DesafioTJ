import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-lembrar-senha',
  templateUrl: './lembrar-senha.page.html',
  styleUrls: ['./lembrar-senha.page.scss'],
})
export class LembrarSenhaPage implements OnInit {
  public formGroup: FormGroup;
  
  emailEnviado : boolean=false;
  loading: boolean = false;
  
  constructor(public formBuilder: FormBuilder, private usuarioService : UsuarioService, private utilService : UtilService, private navCtrl : NavController, public menuCtrl: MenuController) { 
    
    this.formGroup = formBuilder.group({

      email: new FormControl('', Validators.email),
      token: new FormControl('', Validators.compose([
        //Validators.required,
        Validators.minLength(36),
      ])),
      senha: new FormControl('', Validators.compose([
        //Validators.required,
        Validators.maxLength(32),
        Validators.minLength(3),
      ])),

    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }
  openLogin(){
    this.navCtrl.navigateRoot('qsti/login');
  }
  enviarEmail(){
    this.emailEnviado = false;

    this.utilService.showLoading();
    this.usuarioService.resetarSenha({email : this.formGroup.value.email})
    .then((response: any) => {
        this.utilService.showAlert(response.data.message, ()=>{
          // document.getElementById('btnConfirmar').classList.add('animated');
          // document.getElementById('btnConfirmar').classList.add('flipOutX');
          
          // setTimeout(()=>{
            this.emailEnviado = true;
          // },2000);
        });
    })
    .catch((error) => {
      console.error(error);
      this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
    }).finally(() => {
      this.utilService.hideLoading();
    });
  }

  alterarSenha(){
    this.utilService.showLoading();
    this.usuarioService.alterarSenha({email : this.formGroup.value.email, token: this.formGroup.value.token, novaSenha : this.formGroup.value.senha})
    .then((response: any) => {
      
        this.utilService.showAlert('Operação realizada com sucesso!', ()=>{
          this.navCtrl.navigateRoot('login');
        });
    })
    .catch((error) => {
      this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
    }).finally(() => {
      this.utilService.hideLoading();
    });
  }
}
