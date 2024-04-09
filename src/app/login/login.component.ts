import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMeesage: string = '';
  email: string = 'john@example.com';
  password: string = 'dev123';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMeesage = '';
    this.http
      .post('https://localhost:7095/auth/Login', {
        email: this.email,
        password: this.password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
          }
          this.errorMeesage = 'Email and Password are invalid';

          // Return an observable with a user-facing error message.
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/users');
        } else {
          this.errorMeesage = 'Email and Password are invalid';
        }
      });
  }
}
