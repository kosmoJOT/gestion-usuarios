import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //Modulos
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Material
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule
  ],
  exports: [
    //Modulos
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Material
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class SharedModule { }
