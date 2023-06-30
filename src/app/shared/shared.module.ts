import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //Modulos
    FormsModule,
    ReactiveFormsModule,
    //Material
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule
  ],
  exports: [
    //Modulos
    FormsModule,
    ReactiveFormsModule,
    //Material
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule
  ]
})
export class SharedModule { }
