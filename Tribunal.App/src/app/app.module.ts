import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { UtilService } from './services/util.service';
import { TemploService } from './services/templo.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(
      { mode: 'md' }
    ),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })],
  providers: [
    //{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UtilService,
    //UsuarioService,
    //TemploService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
