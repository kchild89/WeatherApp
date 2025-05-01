import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { UserSettings } from '../../interfaces/user-settings';

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
  suggestions: any[] = [];

  units: string = 'metric';

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUserSettings().subscribe((settings) => {
      const data = settings?.data() as UserSettings | undefined;
      if (data && (data.units === 'metric' || data.units === 'imperial')) {
        this.units = data.units;
      }
    });
  }

  getWeather() {
    this.loading = true;
    this.error = '';
    this.weather = null;
    this.suggestions = [];

    const apiKey = environment.weatherApiKey;
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

  fetchSuggestions() {
    if (this.city.length < 2) {
      this.suggestions = [];
      return;
    }

    const apiKey = environment.weatherApiKey;
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${this.city}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: () => {
        this.suggestions = [];
      },
    });
  }

  selectSuggestion(suggestion: any) {
    this.city = suggestion.name;
    this.suggestions = [];
    this.getWeather(); // Optional: auto-fetch on selection
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
