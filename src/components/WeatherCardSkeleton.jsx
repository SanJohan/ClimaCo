import "../styles/weather-skeleton.css";

export default function WeatherCardSkeleton() {
  return (
    <div className="weather-skeleton-card">
      <div className="skeleton skeleton-icon"></div>

      <div className="skeleton skeleton-title"></div>

      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
    </div>
  );
}
