import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ApiService } from '../api.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {

    message: string;
    name = 'none';
    email = 'none';
    userDataSubscription: Subscription;
    userData: boolean;
    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;

    constructor(public oidcSecurityService: OidcSecurityService, private apiService: ApiService) {
    }

    callAPI() {
      this.apiService.callApi()
                      .subscribe(
                          values => this.message = this.message + ' ' + values,
                           err => {
                               // Log errors if any
                               console.log('error', err);
                           });

    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });

        this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
            (userData: any) => {
                if (userData && userData != '') {
                    this.name = userData.preferred_username;
                    this.email = userData.email;
                }
            });
    }

    ngOnDestroy(): void {
        this.userDataSubscription.unsubscribe();
        this.isAuthorizedSubscription.unsubscribe();
    }
}
