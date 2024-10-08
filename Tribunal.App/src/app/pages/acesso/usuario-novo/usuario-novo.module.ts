import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioNovoPageRoutingModule } from './usuario-novo-routing.module';

import { UsuarioNovoPage } from './usuario-novo.page';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    UsuarioNovoPageRoutingModule
  ],
  declarations: [UsuarioNovoPage]
})
export class UsuarioNovoPageModule { }
