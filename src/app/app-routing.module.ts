import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { VentanaPrincipalComponent } from './components/ventana-principal/ventana-principal.component';
import { LoginComponent } from './components/login/login/login.component';
import { CrearUsuarioComponent } from './components/operaciones/crear-usuario/crear-usuario.component';
import { EliminarUsuarioComponent } from './components/operaciones/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from './components/operaciones/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'gestion-usuarios', component: VentanaPrincipalComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
