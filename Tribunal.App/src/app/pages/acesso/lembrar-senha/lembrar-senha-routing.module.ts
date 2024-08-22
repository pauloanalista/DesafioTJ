import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LembrarSenhaPage } from './lembrar-senha.page';

const routes: Routes = [
  {
    path: '',
    component: LembrarSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LembrarSenhaPageRoutingModule {}
