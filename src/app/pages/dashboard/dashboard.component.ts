import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  city: string = '';
  weather: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  getWeather() {
    this.loading = true;
    this.error = '';

    const apiKey = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;
    this.http.get(url).subscribe({
      next: (data) => {
        this.weather = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'City not found';
        this.loading = false;
      },
    });
  }
}
