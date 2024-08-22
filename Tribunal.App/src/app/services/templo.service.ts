import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class TemploService {
  constructor(private http: HttpClient, private utilService: UtilService) { }
  
  listar(request:any) {
    
    let sort = request.sort; //ordenar por qual campo
    let limit = request.limit; //limitar por x registros
    let offset = request.offset; //pular x registros
    let nome  = request.nome;
    let isTemploIptm = request.isTemploIptm;
    let status = request.status;

    let url = this.utilService.obterUrlApi() + 'Templos/?sort=' + sort + '&limit='+ limit +'&Offset=' + offset + '&nome=' + nome + '&isTemploIptm=' + isTemploIptm + '&status=' + status;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  obterPorId(idTemplo) {
    let url = this.utilService.obterUrlApi() + 'Templos/' + idTemplo;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  salvar(form: any) {
    let url = this.utilService.obterUrlApi() + 'Templos';
    var header = this.utilService.obterHeaderApi();

    let token = localStorage.getItem('token');
    var header = {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('enctype', 'multipart/form-data')
      .set('Accept', 'application/json')
    }

    return this.http.post(url, form, header).toPromise();
  }

  excluir(id: any) {
    let url = this.utilService.obterUrlApi() + 'Templos/' + id;
    var header = this.utilService.obterHeaderApi();
    
    return this.http.delete(url, header).toPromise();
  }
}
