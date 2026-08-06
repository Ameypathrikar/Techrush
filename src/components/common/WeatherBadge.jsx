import React, { useState, useEffect } from "react";

// Coordinates for destinations to query Open-Meteo
const DESTINATION_COORDS = {
  manali: { lat: 32.2432, lng: 77.1892, fallback: "Snowy" },
  goa: { lat: 15.2993, lng: 74.124, fallback: "Sunny" },
  jaipur: { lat: 26.9124, lng: 75.7873, fallback: "Pleasant" },
  munnar: { lat: 10.0889, lng: 77.0595, fallback: "Misty" },
  ladakh: { lat: 34.1526, lng: 77.5771, fallback: "Crisp & Cold" },
  udaipur: { lat: 24.5854, lng: 73.7125, fallback: "Clear Sky" }
};

// Map WMO Weather Interpretation Codes from Open-Meteo to readable condition strings
function decodeWmoWeatherCode(code) {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Misty";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 85 && code <= 86) return "Heavy Snow";
  if (code >= 95) return "Thunderstorm";
  return "Pleasant";
}

export default function WeatherBadge({ destinationId }) {
  const destKey = destinationId?.toLowerCase().split(",")[0].trim();
  const coords = DESTINATION_COORDS[destKey] || { lat: 20.5937, lng: 78.9629, fallback: "Pleasant" };

  const [weatherData, setWeatherData] = useState({
    temp: null,
    condition: coords.fallback,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;

    if (coords.lat && coords.lng) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data?.current_weather) {
            const currentTemp = Math.round(data.current_weather.temperature);
            const conditionText = decodeWmoWeatherCode(data.current_weather.weathercode);
            
            setWeatherData({
              temp: currentTemp,
              condition: conditionText,
              loading: false
            });
          }
        })
        .catch(() => {
          if (isMounted) {
            setWeatherData((prev) => ({ ...prev, loading: false }));
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [destinationId]);

  return (
    <div className="px-3 py-1 bg-slate-950/80 border border-slate-800 text-white text-xs font-bold rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
      <span>☁️</span>
      <span>
        {weatherData.loading ? "Loading..." : `${weatherData.temp}°C (${weatherData.condition})`}
      </span>
    </div>
  );
}