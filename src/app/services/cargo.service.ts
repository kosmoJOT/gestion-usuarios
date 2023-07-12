import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RUTA } from '../interfaces/Ruta';
import { Cargo, ListaCargos } from '../interfaces/Cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  getAllCargos(){
    return this.http.get<ListaCargos>(`${RUTA}/getPositionList`);
  }

  obtenerIdCargo(str: string, listadoCargos: Cargo[]): number{
    //const id = str.split('-')[0];
    var id = 0;
    listadoCargos.forEach( (cargo: Cargo) => {
      if(str===cargo.CARGO){
        id = cargo.ID_CARGO;
      }
    });
    return id;
    //return Number(id);
  }

  obtenerNombreCargo(id: number, listadoCargos: Cargo[]): string {
    var str = '';
    listadoCargos.forEach( (cargo: Cargo) => {
      if(id===cargo.ID_CARGO){
        str = cargo.CARGO;
      }
    });
    //const cargo = (id).toString()+'-'+str;
    return str;
  }
}
