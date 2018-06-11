import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromAuth from '../auth/store/auth.reducers';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class AuthService {

    token: string;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {

    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            data => {
                this.store.dispatch(new AuthActions.Signup());
                firebase.auth().currentUser.getIdToken().then(
                    token => {
                        this.token = token;
                        this.store.dispatch(new AuthActions.SetToken(token));
                }
                ).catch(error => console.log(error));
                this.router.navigate(['/signin']);
            }
        ).catch(
            error => console.log(error)
        );
    }

    signinUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            data => {
                firebase.auth().currentUser.getIdToken().then(
                    data => {
                        this.token = data;
                        this.store.dispatch(new AuthActions.Signin());
                        this.router.navigate(['/']);}
                ).catch(error => console.log(error));
             }
        ).catch(
            error => console.log(error)
        )
    }

    getToken() {
        this.store.select('auth').switchMap((authState: fromAuth.State) => {
            this.token = authState.token;
            return this.token;
        }); 
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logOut() {
        firebase.auth().signOut().then(
            data => {
                console.log(data);
                this.store.dispatch(new AuthActions.Logout());
            }
        ).catch(
            error => console.log(error)
        );
        
    }
}