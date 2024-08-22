import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class TestemunhoService {
  constructor(private http: HttpClient, private utilService: UtilService) { }
  
  
  listarEnumComoRecebeu() {

    let url = this.utilService.obterUrlApi() + 'Testemunhos/EnumComoRecebeu';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }
  
  listarEnumTipoTestemunho() {

    let url = this.utilService.obterUrlApi() + 'Testemunhos/EnumTipoTestemunho';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  listarEnumStatus() {

    let url = this.utilService.obterUrlApi() + 'Testemunhos/EnumStatus';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  
  listar(request:any) {
    
    let sort = request.sort; //ordenar por qual campo
    let limit = request.limit; //limitar por x registros
    let offset = request.offset; //pular x registros
    let nome  = request.nome;
    let status = request.status;

    let url = this.utilService.obterUrlApi() + 'Testemunhos/?sort=' + sort + '&limit='+ limit +'&Offset=' + offset + '&nome=' + nome + '&status='+status;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  listarConsolidado() {
    
    
    let url = this.utilService.obterUrlApi() + 'Testemunhos/Consolidado';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  // obterPorId(idTemplo) {
  //   let url = this.utilService.obterUrlApi() + 'Agendas/' + idTemplo;
  //   var header = this.utilService.obterHeaderApi();

  //   return this.http.get(url, header).toPromise();
  // }

  salvar(form: any) {
    let url = this.utilService.obterUrlApi() + 'Testemunhos';
    var header = this.utilService.obterHeaderApi();

    return this.http.post(url, form, header).toPromise();
  }

  salvarStatus(id, status) {
    let url = this.utilService.obterUrlApi() + 'Testemunhos/Status';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, {id:id, status : status}, header).toPromise();
  }
  // excluir(id: any) {
  //   let url = this.utilService.obterUrlApi() + 'Agendas/' + id;
  //   var header = this.utilService.obterHeaderApi();
    
  //   return this.http.delete(url, header).toPromise();
  // }
}
