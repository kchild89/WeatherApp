import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
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
    this.weather = null;

    const apiKey = 'd93585013b7a4dd1b6c145210252904';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.weather = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'City not found';
        this.loading = false;
      },
    });
  }

  getWeatherEmoji(condition: string): string {
    const text = condition.toLowerCase();
    if (text.includes('sunny')) return '☀️';
    if (text.includes('cloud')) return '☁️';
    if (text.includes('rain')) return '🌧️';
    if (text.includes('snow')) return '❄️';
    if (text.includes('storm')) return '⛈️';
    if (text.includes('fog') || text.includes('mist')) return '🌫️';
    return '🌈';
  }
}
