import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    HomeComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    AuthModule.forRoot()
  ],
  providers: [
    OidcSecurityService,
    ApiService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(public oidcSecurityService: OidcSecurityService) {
    let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = 'http://localhost:8080/auth/realms/demo';
    openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:4200';
    openIDImplicitFlowConfiguration.client_id = 'oidc-app';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid email profile';
    openIDImplicitFlowConfiguration.startup_route = '/';
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:4200';
    openIDImplicitFlowConfiguration.auto_userinfo = true;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = false;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
    openIDImplicitFlowConfiguration.override_well_known_configuration = false;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'http://localhost:4200/wellknownconfiguration.json';
    // openIDImplicitFlowConfiguration.storage = localStorage;

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}
