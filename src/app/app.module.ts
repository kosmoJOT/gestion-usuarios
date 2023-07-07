//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
//Componentes
import { VentanaPrincipalComponent } from './components/ventana-principal/ventana-principal.component';
import { TablaRegistrosComponent } from './components/tabla-registros/tabla-registros.component';
import { VentanaModalComponent } from './components/ventana-modal/ventana-modal.component';
import { LoginComponent } from './components/login/login/login.component';
import { CrearUsuarioComponent } from './components/operaciones/crear-usuario/crear-usuario.component';
//Servicios
import { UsuarioService } from './services/usuario.service';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { EliminarUsuarioComponent } from './components/operaciones/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from './components/operaciones/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    //Componentes
    VentanaPrincipalComponent,
    TablaRegistrosComponent,
    VentanaModalComponent,
    ModalEliminarComponent,
    LoginComponent,
    CrearUsuarioComponent,
    EliminarUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Modulos
    SharedModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
