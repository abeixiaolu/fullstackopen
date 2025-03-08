function Notification({ message, type }) {
  if (!message) return null;
  const style =
    type === "success"
      ? {
          padding: "8px 16px",
          border: "1px solid #0f0",
          color: "#0f0",
          marginBottom: "10px",
        }
      : {
          padding: "8px 16px",
          border: "1px solid #f00",
          color: "#f00",
          marginBottom: "10px",
        };
  return <div style={style}>{message}</div>;
}

export default Notification;
