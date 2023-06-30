import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { VentanaPrincipalComponent } from './components/ventana-principal/ventana-principal.component';

const routes: Routes = [
  {path: '**', component: VentanaPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
