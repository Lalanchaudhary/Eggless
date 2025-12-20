const FallingSnow = ({ count = 40 }) => {
  return (
    <div className="snow">
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: Math.random() * 100 + "%",
            animationDuration: 5 + Math.random() * 10 + "s",
            animationDelay: Math.random() * 5 + "s",
            fontSize: 8 + Math.random() * 16 + "px",
            opacity: 0.4 + Math.random() * 0.6,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
};

export default FallingSnow;
