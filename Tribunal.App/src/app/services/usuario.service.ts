import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private utilService: UtilService) { }

  autenticar(request: any) {
    let url = this.utilService.obterUrlApi() + 'usuario/Autenticar';
    let headers = this.utilService.obterHeaderApi();
    //let headers: any = new Headers();
    //headers.append('Content-Type', 'application/json');
    return this.http.post(url, request, headers).toPromise();
  }

  adicionar(form: any) {
    let url = this.utilService.obterUrlApi() + 'usuario/Adicionar';

    let headers = this.utilService.obterHeaderApi();

    return this.http.post(url, form, headers).toPromise();
  }

  listar() {
    let url = this.utilService.obterUrlApi() + 'usuario/listar/';

    let token = sessionStorage.getItem('token');

    let headers = this.utilService.obterHeaderApi();

    return this.http.get(url, headers).toPromise();
  }

  listarMenu() {
    let url = this.utilService.obterUrlApi() + 'usuario/menu';

    let token = sessionStorage.getItem('token');

    let headers = this.utilService.obterHeaderApi();

    return this.http.get(url, headers).toPromise();
  }

  resetarSenha(form: any) {
    let url = this.utilService.obterUrlApi() + 'usuario/ResetarSenha';

    //    let token = atob(sessionStorage.getItem('token'));

    let headers = this.utilService.obterHeaderApi();

    return this.http.post(url, form, headers).toPromise();
  }


  alterarSenha(form: any) {
    let url = this.utilService.obterUrlApi() + 'usuario/AlterarSenha';

    //    let token = atob(sessionStorage.getItem('token'));

    let headers = this.utilService.obterHeaderApi();

    return this.http.put(url, form, headers).toPromise();
  }

  mudarStatus(form: any) {
    let url = this.utilService.obterUrlApi() + 'usuario/mudarStatus';
    let headers = this.utilService.obterHeaderApi();

    return this.http.put(url, form, headers).toPromise();
  }
}
