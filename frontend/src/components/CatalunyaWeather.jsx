import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, Wind, CloudSun, ChevronDown } from 'lucide-react';

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

function codeToIcon(code) {
  if (code <= 1) return '01d';
  if (code <= 3) return '03d';
  if (code <= 48) return '50d';
  if (code <= 55) return '09d';
  if (code <= 65) return '10d';
  if (code <= 77) return '13d';
  return '10d';
}

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
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.17&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Madrid&forecast_days=8')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.current) {
          setTemp(Math.round(data.current.temperature_2m));
          setIcon(codeToIcon(data.current.weather_code));
        }
        if (data.daily) {
          var days = [];
          for (var i = 1; i <= 7; i++) {
            if (!data.daily.time[i]) break;
            var date = new Date(data.daily.time[i]);
            days.push({
              day: DAYS[date.getDay()],
              high: Math.round(data.daily.temperature_2m_max[i]),
              low: Math.round(data.daily.temperature_2m_min[i]),
              icon: codeToIcon(data.daily.weather_code[i])
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
    <div
      className="relative hidden sm:block"
      data-testid="weather-badge"
      onMouseEnter={function() { setIsOpen(true); }}
      onMouseLeave={function() { setIsOpen(false); }}
    >
      <button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 backdrop-blur-sm" style={{ background: 'rgba(246,65,108,0.1)', border: '1px solid rgba(246,65,108,0.15)', color: '#f6416c' }}
        data-testid="weather-badge-btn"
      >
        <Icon className="w-4 h-4" />
        <span className="font-semibold">{temp}°C</span>
        <ChevronDown className="w-3 h-3 transition-transform duration-200" style={isOpen ? { transform: 'rotate(180deg)' } : {}} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-0 bg-black/60 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 p-3 w-[160px] z-50">
          {/* Today */}
          <div className="flex items-center gap-2.5 pb-2.5 mb-2 border-b border-white/10">
            <Icon className="w-5 h-5 text-white/70" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Barcelona, Today</p>
              <p className="text-lg font-semibold text-white">{temp}°C</p>
            </div>
          </div>
          {/* 7-day forecast */}
          <div className="space-y-1">
            {forecast.map(function(day) {
              var DayIcon = WEATHER_ICONS[day.icon] || Cloud;
              return (
                <div key={day.day} className="flex items-center justify-between text-xs py-0.5">
                  <span className="text-white/60 w-8 font-medium">{day.day}</span>
                  <DayIcon className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white font-semibold w-8 text-right">{day.high}°</span>
                  <span className="text-white/40 w-8 text-right">{day.low}°</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
