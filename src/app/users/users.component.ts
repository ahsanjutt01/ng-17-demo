import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [];
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.httpClient
      .get('https://localhost:7095/api/User', { headers })
      .subscribe((response: any) => {
        console.log(response);
        this.data = response;
      });
  }
}
