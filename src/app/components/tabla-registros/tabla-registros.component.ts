import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EditarUsuarioComponent } from '../operaciones/editar-usuario/editar-usuario.component';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/interfaces/Cargo';
import { EliminarUsuarioComponent } from '../operaciones/eliminar-usuario/eliminar-usuario.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent implements OnInit, OnChanges/*, AfterViewInit*/ {

  @Input() usuarios: any;
  @Output() operacionEnTabla = new EventEmitter<boolean>();
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;

  editarFila?: number;
  cargos: Cargo[];
  usuarioEditar: Usuario;
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'FECHA_NACIMIENTO', 'EMAIL', 'ID_CARGO', 'PASSWORD', 'ACCIONES'];
  toolTipPosition: TooltipPosition = 'above';

  form: FormGroup;

  constructor(
    private _serviceUsuarios: UsuarioService,
    private _serviceCargos: CargoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog)
  {
    this.cargos = [];
    //this.usuarios = [];
    this.form = this.formBuilder.group({
      NOMBRE: [''],
      APELLIDO: [''],
      FECHA_NACIMIENTO: [''],
      EMAIL: [''],
      ID_CARGO: [''],
      PASSWORD: ['']
    });
    this.usuarioEditar = {
      NOMBRE: '',
      APELLIDO: '',
      FECHA_NACIMIENTO: new Date(),
      EMAIL: '',
      ID_CARGO: 0,
      PASSWORD: ''
    }
  }

  ngOnInit(): void {
    this.getCargos();
  }

  ngOnChanges(): void {
    this.getUsuarios();
  }

  //ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  //}

  getUsuarios(): void {
    this.dataSource = new MatTableDataSource(this.usuarios);
    console.log(this.usuarios);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getCargos(): void {
    this._serviceCargos.getAllCargos().subscribe((data) => {
      this.cargos = data.data;
    });
  }

  obtenerCargo(id:number): string {
    return this._serviceCargos.obtenerNombreCargo(id, this.cargos);
  }

  editarUsuario(index: number) {
    this.editarFila = index;
    this.usuarioEditar = this.usuarios[index];
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: { usuario: this.usuarioEditar, listadoCargos: this.cargos }
    });
    dialogRef.afterClosed().subscribe( (res) => {
      this._serviceUsuarios.updateUser(res).subscribe((data) => {
        this.operacionEnTabla.emit(true);
      });
    });
  }

  eliminarUsuario(index: number) {
    this.editarFila = index;
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      data: { email: this.usuarios[index].EMAIL }
    });
    dialogRef.afterClosed().subscribe( (res) => {
      this._serviceUsuarios.deleteUser(res).subscribe((data) => {
        this.operacionEnTabla.emit(true);
      });
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
