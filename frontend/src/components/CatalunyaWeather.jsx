import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle } from 'lucide-react';

var WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=41.3874&longitude=2.1686&current=temperature_2m,weather_code&timezone=Europe/Madrid';

function getWeatherInfo(code) {
  if (code === 0) return { icon: Sun, label: 'Clear' };
  if (code <= 3) return { icon: Cloud, label: 'Cloudy' };
  if (code <= 49) return { icon: Cloud, label: 'Foggy' };
  if (code <= 59) return { icon: CloudDrizzle, label: 'Drizzle' };
  if (code <= 69) return { icon: CloudRain, label: 'Rain' };
  if (code <= 79) return { icon: CloudSnow, label: 'Snow' };
  if (code <= 84) return { icon: CloudRain, label: 'Showers' };
  if (code <= 94) return { icon: CloudSnow, label: 'Snow' };
  return { icon: CloudLightning, label: 'Storm' };
}

export function CatalunyaWeather() {
  var weatherState = useState(null);
  var weather = weatherState[0];
  var setWeather = weatherState[1];

  useEffect(function() {
    fetch(WEATHER_URL)
      .then(function(r) { return r.json(); })
      .then(function(data) { if (data && data.current) setWeather(data.current); })
      .catch(function() {});
  }, []);

  if (!weather) return null;

  var info = getWeatherInfo(weather.weather_code);
  var Icon = info.icon;
  var temp = Math.round(weather.temperature_2m);

  return (
    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-black/10 text-black/70" data-testid="weather-badge">
      <Icon className="w-3.5 h-3.5" />
      <span className="font-semibold">{temp}°C</span>
      <span className="text-black/50 hidden md:inline">Barcelona</span>
    </div>
  );
}
