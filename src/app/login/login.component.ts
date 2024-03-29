import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
      .post('https://localhost:7095/api/User/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe((data) => {
        if (data) {
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl('/users');
        } else {
          this.errorMeesage = 'Email and Password are invalid';
        }
      });
  }
}
