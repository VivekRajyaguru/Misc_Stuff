import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ServerService {

    constructor(private http: Http) { }

    storeServers(servers: any[]) {
        /* return this.http.post('https://myproject-app-7fa35.firebaseio.com/data.json', servers); */
        return this.http.put('https://myproject-app-7fa35.firebaseio.com/data.json', servers);
    }

    getServer() {
        return this.http.get('https://myproject-app-7fa35.firebaseio.com/data.json')
        .map(
            (response) => {
                const data = response.json();
                return data;
            }
        ).catch(
            (error) => {
                console.log(error);
                return error;
            }
        );
    }

    getAppName() {
        return this.http.get('https://myproject-app-7fa35.firebaseio.com/appName.json')
        .map(
            (response) => {
                return response.json()
            }
        ).catch(
            (error) =>{
                return error;
            }
        )
    }
}