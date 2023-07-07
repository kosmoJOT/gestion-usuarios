import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { VentanaPrincipalComponent } from './components/ventana-principal/ventana-principal.component';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gestion-usuarios', component: VentanaPrincipalComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
