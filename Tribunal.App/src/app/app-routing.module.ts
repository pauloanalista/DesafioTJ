import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './guards/authorize.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/acesso/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lembrar-senha',
    loadChildren: () => import('./pages/acesso/lembrar-senha/lembrar-senha.module').then( m => m.LembrarSenhaPageModule)
  },
  {
    path: 'usuario-novo',
    loadChildren: () => import('./pages/acesso/usuario-novo/usuario-novo.module').then( m => m.UsuarioNovoPageModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthorizeGuard],
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
