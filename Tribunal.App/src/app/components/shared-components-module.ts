import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NaoHaDadosComponent } from './nao-ha-dados/nao-ha-dados.component';
import { FooterLoadingComponent } from './footer-loading/footer-loading.component';
import { TimeComponent } from './time/time.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [
    NaoHaDadosComponent,
    FooterLoadingComponent,
    TimeComponent,
  ],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    BrMaskerModule
    
  ],
  exports: [
    NaoHaDadosComponent,
    FooterLoadingComponent,
    TimeComponent,
  ]
})
export class SharedComponentsModule { }
