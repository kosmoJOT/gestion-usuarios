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
import { LoginComponent } from './components/login/login/login.component';
import { CrearUsuarioComponent } from './components/operaciones/crear-usuario/crear-usuario.component';
import { EliminarUsuarioComponent } from './components/operaciones/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from './components/operaciones/editar-usuario/editar-usuario.component';
import { RegistrarUsuarioComponent } from './components/login/registrar-usuario/registrar-usuario.component';
import { ErrorComponent } from './components/helpers/error/error.component';
import { AvisoComponent } from './components/helpers/aviso/aviso.component';
//Servicios
import { UsuarioService } from './services/usuario.service';
import { InterceptorService } from './services/interceptor.service';
//Providers
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt'
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    //Componentes
    VentanaPrincipalComponent,
    TablaRegistrosComponent,
    LoginComponent,
    CrearUsuarioComponent,
    EliminarUsuarioComponent,
    EditarUsuarioComponent,
    RegistrarUsuarioComponent,
    ErrorComponent,
    AvisoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Modulos
    SharedModule
  ],
  providers: [
    UsuarioService,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
