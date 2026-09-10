export default function ProgressBar({
  value = 50,
  max = 100,
  barColor = "bg-primary",
  trackColor = "bg-secondary",
  height = "h-2",
}) {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full ${trackColor} ${height}`}>
      <div className={`${barColor} ${height} transition-all duration-200`} style={{ width: `${percentage}%` }} />
    </div>
  );
}
