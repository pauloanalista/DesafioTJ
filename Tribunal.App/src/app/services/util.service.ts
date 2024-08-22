import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public load: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, private http: HttpClient) { }

  obterUrlApi() {
    return "https://localhost:44358/api/";
  }

  obterHeaderApi() {
    let token = localStorage.getItem('token');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
    }
    return header;
  }

  isLogado() {
    let token = localStorage.getItem('token');

    if (token == null || token == undefined) {
      return false;
    }

    return true;
  }

  // obterUrlDoSignalR() {
  //   //return 'https://suporte.api.qsti.com.br/hub';
  //   //return "https://localhost:44346/hub";
  //   //return "http://192.168.1.4:8181/api/";
  // }

  async showLoading(message = 'Processando') {
    this.load = await this.loadingCtrl.create({ message: message });
    this.load.present();
  }


  hideLoading() {
    if (this.load != undefined && this.load != null) {
      this.load.dismiss();
    }
    else {
      setTimeout(() => {
        this.hideLoading();
      }, 1000);
    }
  }


  async showAlert(message: string, callback: any = null) {

    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: message,
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Ok',

          handler: () => {
            if (callback != null) {
              callback();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlertConfirm(message: string, header: string = 'Atenção', callback: any = null) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message: string, duration: number = 2000, position: any = 'middle') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: 'animated bounceInRight',
      color: 'secondary',
      position: position
    });
    toast.present();
  }


  async showError(response: any) {
    //debugger;
    if (response.status == 0) {
      //this.showAlert("Verifique sua Internet");
      alert('Serviço Indisponível');
      //this.showToast("Verifique sua Internet");
      return;
    }

    if (response.status == 401 || response.status == 405) {
      this.showAlert("Acesso Expirado!");
      localStorage.removeItem('token');
      return;
    }

    if (response.error == undefined) {
      this.showAlert("Operação falhou!");
      return;
    }
    let notifications = response.error.notifications;

    if (response.status != 400 || notifications == undefined) {
      this.showAlert("Operação falhou!");
      return;
    }




    let html: string = '<ion-list no-lines>';
    (notifications as any[]).forEach(notification => {
      //console.log(notification.message);

      let ionItem: string = '<ion-item>' + notification + '</ion-item>';
      html += ionItem;
      //this.showToast(notification.message);
    });

    html += '</ion-list>';

    //this.showToast(html, 5000);
    this.showAlert(html);
  }

  sendMessageSlack(message: string) {
    let url = 'https://hooks.slack.com/services/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';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
    }

    var param = { "text": message }
    return this.http.post(url, param, header).toPromise();


    //$.post('https://hooks.slack.com/services/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',JSON.stringify({"text":"Respeita o mosso!"}),function(data){console.log(data)});
  }

  private eventSubject = new Subject<any>();

  publishEvent(key: any, value: any) {
    let data = { key: key, value: value }
    this.eventSubject.next(data);
  }

  getEvent(): Subject<any> {
    return this.eventSubject;
  }

  enviarPush(form: any) {
    let url = this.obterUrlApi() + 'Util/EnviarAvisoPush';

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
      //.set('enctype', 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA')
      //.set('Content-Type', 'application/x-www-form-urlencoded')
      //.set('enctype','multipart/form-data')
      //.set('Accept', 'application/json')
    }

    return this.http.post(url, form, header).toPromise();
  }

  
}
