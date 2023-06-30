import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent implements OnInit, AfterViewInit{

  usuarios: Usuario[];
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _serviceUsuarios: UsuarioService){
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsuarios(): void {
    /*this._serviceUsuarios.getUserList().subscribe( (data) => {
      console.log(data)
    });*/
    this.usuarios = this._serviceUsuarios.getUserList();
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.ngAfterViewInit();
  }

}
