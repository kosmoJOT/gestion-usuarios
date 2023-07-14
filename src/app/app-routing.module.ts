import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { VentanaPrincipalComponent } from './components/ventana-principal/ventana-principal.component';
import { LoginComponent } from './components/login/login/login.component';
import { CrearUsuarioComponent } from './components/operaciones/crear-usuario/crear-usuario.component';
import { EliminarUsuarioComponent } from './components/operaciones/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from './components/operaciones/editar-usuario/editar-usuario.component';
import { RegistrarUsuarioComponent } from './components/login/registrar-usuario/registrar-usuario.component';
import { ErrorComponent } from './components/helpers/error/error.component';
//Guards
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [loginGuard] },
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent, canActivate: [loginGuard] },
  { path: 'editar-usuario', component: EditarUsuarioComponent, canActivate: [loginGuard] },
  { path: 'gestion-usuarios', component: VentanaPrincipalComponent, canActivate: [loginGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
