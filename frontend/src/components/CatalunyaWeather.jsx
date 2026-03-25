import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, Wind, CloudSun } from 'lucide-react';

var WEATHER_ICONS = {
  '01d': Sun, '01n': Sun,
  '02d': CloudSun, '02n': CloudSun,
  '03d': Cloud, '03n': Cloud,
  '04d': Cloud, '04n': Cloud,
  '09d': CloudDrizzle, '09n': CloudDrizzle,
  '10d': CloudRain, '10n': CloudRain,
  '11d': CloudRain, '11n': CloudRain,
  '13d': CloudSnow, '13n': CloudSnow,
  '50d': Wind, '50n': Wind
};

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CatalunyaWeather() {
  var tempState = useState(null);
  var temp = tempState[0];
  var setTemp = tempState[1];
  var iconState = useState('03d');
  var icon = iconState[0];
  var setIcon = iconState[1];
  var openState = useState(false);
  var isOpen = openState[0];
  var setIsOpen = openState[1];
  var forecastState = useState([]);
  var forecast = forecastState[0];
  var setForecast = forecastState[1];

  useEffect(function() {
    // Barcelona coordinates
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.17&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Madrid&forecast_days=4')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.current) {
          setTemp(Math.round(data.current.temperature_2m));
          var code = data.current.weather_code;
          if (code <= 1) setIcon('01d');
          else if (code <= 3) setIcon('03d');
          else if (code <= 48) setIcon('50d');
          else if (code <= 55) setIcon('09d');
          else if (code <= 65) setIcon('10d');
          else if (code <= 77) setIcon('13d');
          else setIcon('10d');
        }
        if (data.daily) {
          var days = [];
          for (var i = 1; i < 4; i++) {
            var date = new Date(data.daily.time[i]);
            var dayCode = data.daily.weather_code[i];
            var dayIcon = '03d';
            if (dayCode <= 1) dayIcon = '01d';
            else if (dayCode <= 3) dayIcon = '03d';
            else if (dayCode <= 48) dayIcon = '50d';
            else if (dayCode <= 55) dayIcon = '09d';
            else if (dayCode <= 65) dayIcon = '10d';
            else if (dayCode <= 77) dayIcon = '13d';
            else dayIcon = '10d';
            days.push({
              day: DAYS[date.getDay()],
              high: Math.round(data.daily.temperature_2m_max[i]),
              low: Math.round(data.daily.temperature_2m_min[i]),
              icon: dayIcon
            });
          }
          setForecast(days);
        }
      })
      .catch(function() { setTemp(15); });
  }, []);

  if (temp === null) return null;

  var Icon = WEATHER_ICONS[icon] || Cloud;

  return (
    <div className="relative hidden sm:block" data-testid="weather-badge">
      <button
        onClick={function() { setIsOpen(!isOpen); }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-black/10 text-black/70 hover:bg-black/15 transition-colors"
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="font-semibold">{temp}°C</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 p-3 min-w-[200px] z-50">
          {/* Today */}
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-stone-100">
            <Icon className="w-5 h-5 text-stone-600" />
            <div>
              <p className="text-xs text-stone-400">Barcelona, Today</p>
              <p className="text-lg font-semibold text-stone-800">{temp}°C</p>
            </div>
          </div>
          {/* 3-day forecast */}
          <div className="space-y-1.5">
            {forecast.map(function(day) {
              var DayIcon = WEATHER_ICONS[day.icon] || Cloud;
              return (
                <div key={day.day} className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 w-8">{day.day}</span>
                  <DayIcon className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-stone-700 font-medium">{day.high}°</span>
                  <span className="text-stone-400">{day.low}°</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
