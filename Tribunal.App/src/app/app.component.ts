import { Component, OnInit, Renderer2 } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { UsuarioService } from './services/usuario.service';
import { UtilService } from './services/util.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public menuPrincipalCollection = [

  ];

  menuAdminCollection = [];
  private promptInstallEvent;
  private toast: HTMLIonToastElement;
  constructor(
    private renderer: Renderer2, 
    private navCtrl: NavController, 
    private usuarioService: UsuarioService, 
    public utilService: UtilService, 
    private platform : Platform,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    ) {
    //Seta o tema dark como padrão
    this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    //this.renderer.setAttribute(document.body, 'color-theme', '');

    this.utilService.getEvent().subscribe(data => {
      //console.log(data);
      // if (data.key == 'menu') { //Carrega após logar
      //   //this.carregarMenuAdministrativo();
      // }
    });

    

    if (localStorage.getItem('token') == null) {
      this.menuPrincipalCollection
    }

    this.menuPrincipalCollection = [
      { title: 'Usuários', url: 'usuarios', icon: 'people' },
    ];

    this.platform.ready().then(async () => {
      setTimeout(()=>{
         SplashScreen.hide({
           //fadeOutDuration: 1000,
         });
       }, 2000)
 });
  }

  async ngOnInit() {
    console.log(`Runing app ${this.isPWAInstalled ? 'standalone' : 'in browser'}`);

    this.swUpdate.available.subscribe(async event => {

      console.log('current version is', event.current);
      console.log('available version is', event.available);

      if (event.current !== event.available) {
        const alert = await this.alertCtrl.create({
          header: 'Oba, Temos Novidades!',
          subHeader: 'Há uma nova versão disponível da aplicação.',
          message: 'Deseja atualizar agora?',
          buttons: [
            {
              text: 'Instalar',
              handler: () => { this.swUpdate.activateUpdate(); }
            },
            'Mais tarde'
          ]
        });
        alert.present();
      }
    });

    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    await this.platform.ready();

    if (!this.isMobile) {
      this.checkForUpdate();
      if (!this.isPWAInstalled) {
        this.listenForInstallEvent();
      }
    }

    console.log('swUpdate.isEnabled: ' + this.swUpdate.isEnabled);
    //this.swUpdate.checkForUpdate();


    //firebase.initializeApp(environment.firebaseConfig);
    //await this.notificationService.init();



  }

  private listenForInstallEvent() {
    window.addEventListener('beforeinstallprompt', async (e) => {
      e.preventDefault();
      this.promptInstallEvent = e;

      setTimeout(() => {
        this.suggestInstall();
      }, 5000);
    });
  }
  private async suggestInstall() {
    this.toast = await this.toastCtrl.create({
      message: 'Você pode usar este aplicativo offline',
      buttons: [{
        text: 'Baixar',
        handler: () => { this.installPWA(); },
      }, {
        text: '',
        icon: 'close'
      }],
      duration: 0,
    });
    this.toast.present();
  }

  private installPWA() {
    this.toast.dismiss();
    // Show the prompt
    this.promptInstallEvent.prompt();
    // Wait for the user to respond to the prompt
    this.promptInstallEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.promptInstallEvent = null;
      });
  }

  get isMobile() {
    return this.platform.is('mobile');
  }
  get isPWAInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
  }

  async checkForUpdate() {
    console.log('Check for updates');
    try {
      await this.swUpdate.checkForUpdate();
    } catch (e) {
      console.debug('service worker not available');
    }
  }


  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:44346/hub')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

  async ngAfterViewInit() {
    
    // setTimeout(async () => {
    //   await this.notificationService.requestPermission();
    // }, 1000);
    
  }

  carregarMenuAdministrativo() {
    this.usuarioService.listarMenu()
      .then((response: any) => {
        this.menuAdminCollection = response;

        if (this.utilService.isLogado() == false) {
          this.menuPrincipalCollection.push({ title: 'Entrar', url: 'login', icon: 'people' });
        }
        else {
          this.menuPrincipalCollection = this.menuPrincipalCollection.filter(x => x.title != 'Entrar');
        }
      })
      .catch(erro => {
        this.utilService.showToast("Desculpe, houve um problema ao carregar o menu administrativo.")
      });
  }
  showPage(url) {
    this.navCtrl.navigateForward(url);
  }

  sair() {
    localStorage.clear();

    this.utilService.publishEvent('menu', 'limpar');
  }


}
