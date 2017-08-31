import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class ApiService {
    private headers: Headers;

    constructor(private http: Http, private oidcSecurityService: OidcSecurityService) {
    }

    public callApi = (): Observable<any> => {
        this.setHeaders();
        return this.http.get('http://localhost:5000/api/values/1234', {
          headers: this.headers
        }).map(res => res.json());
    }

    private setHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        const token = this.oidcSecurityService.getToken();
        if (token !== '') {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
    }
}
