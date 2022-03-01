import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  strWeathAPI = '3db778e229817cf109868d0833e123ec';
  strlang = 'ja';
  strCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather';
  strIconURL = 'https://openweathermap.org/img/wn/'
  strIconSizeMultipler = '@2x.png'

  strWeatherBaseURL;
  arrWeatherInfo;

  strWeatherLocation;
  strIconString;
  strTemperature;
  strHightTemp;
  strLowTemp;

  constructor(private HttpClient: HttpClient,
    ) { }

  async GetWeather(lat, lon) {
    this.strWeatherBaseURL = this.strCurrentAPI + '?appid=' + this.strWeathAPI + '&lang=' + this.strlang + '&lat=' + lat + '&lon=' + lon + '&units=metric'
    this.arrWeatherInfo = await this.HttpClient.get(this.strWeatherBaseURL)
      .toPromise()
      .then(data => {

        //console.log(data)
        //...
        return data;

      }).catch(function (err) {
        console.log('Error!');
      });
    console.log(this.arrWeatherInfo);
    this.strWeatherLocation = this.arrWeatherInfo.name
    this.strIconString = this.arrWeatherInfo.weather[0].icon
    this.strTemperature = this.arrWeatherInfo.main.temp
    this.strHightTemp = this.arrWeatherInfo.main.temp_max
    this.strLowTemp = this.arrWeatherInfo.main.temp_min

  }

}
