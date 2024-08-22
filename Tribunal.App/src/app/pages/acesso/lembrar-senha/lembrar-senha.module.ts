import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LembrarSenhaPageRoutingModule } from './lembrar-senha-routing.module';

import { LembrarSenhaPage } from './lembrar-senha.page';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    LembrarSenhaPageRoutingModule
  ],
  declarations: [LembrarSenhaPage]
})
export class LembrarSenhaPageModule {}
