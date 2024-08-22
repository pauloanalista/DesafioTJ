import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.page.html',
  styleUrls: ['./usuario-novo.page.scss'],
})
export class UsuarioNovoPage {
  public formGroup: FormGroup;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private usuarioService: UsuarioService, private utilService: UtilService) {
    this.formGroup = formBuilder.group({

      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(3),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(7),
      ])),
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(1),
      ])),
      celular: new FormControl('', Validators.compose([
        //Validators.required, //Apple disse q nao pode ser obrigatorio
        Validators.maxLength(25),
        Validators.minLength(1),
      ])),
      cidade: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ])),
      bairro: new FormControl('', Validators.compose([
        //Validators.required, //Apple disse q nao pode ser obrigatorio
        Validators.minLength(1),
        Validators.maxLength(100),
      ])),
      estado: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ])),
      pais: new FormControl('Brasil', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ])),
    });
  }
  adicionar() {
    this.loading = true;
    this.usuarioService.adicionar(this.formGroup.value)
      .then((response: any) => {
        this.loading = false;
          this.utilService.showAlert("Operação realizada com sucesso!", () => {
            this.navCtrl.pop();
          });
      })
      .catch((error) => {
        this.loading = false;

        this.utilService.showError(error);
      });
  }


}
