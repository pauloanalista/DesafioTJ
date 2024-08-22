import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  constructor(private http: HttpClient, private utilService: UtilService) { }
  
  listarEnumDiaDaSemana() {

    let url = this.utilService.obterUrlApi() + 'Agendas/EnumDiaDaSemana';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  listar(request:any) {
    
    let sort = request.sort; //ordenar por qual campo
    let limit = request.limit; //limitar por x registros
    let offset = request.offset; //pular x registros
    let nome  = request.nome;
    let idTemplo = request.idTemplo;
    let status = request.status;
    let exibirAgendaVencida = request.exibirAgendaVencida;
   

    let url = this.utilService.obterUrlApi() + 'Agendas/?sort=' + sort + '&limit='+ limit +'&Offset=' + offset + '&nome=' + nome + '&idTemplo=' + idTemplo + '&status=' + status + '&exibirAgendaVencida=' + exibirAgendaVencida;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  obterPorId(idTemplo) {
    let url = this.utilService.obterUrlApi() + 'Agendas/' + idTemplo;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  salvar(form: any) {
    let url = this.utilService.obterUrlApi() + 'Agendas';
    var header = this.utilService.obterHeaderApi();

    let token = localStorage.getItem('token');
    var header = this.utilService.obterHeaderApi();

    return this.http.post(url, form, header).toPromise();
  }

  excluir(id: any) {
    let url = this.utilService.obterUrlApi() + 'Agendas/' + id;
    var header = this.utilService.obterHeaderApi();
    
    return this.http.delete(url, header).toPromise();
  }
}
