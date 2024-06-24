import "./Notification.css";
const Notification = ({ message, type }) => {
  if (message === "") {
    return null;
  }

  return (
    <>
      {type === "success" && <div className="success">{message}</div>}
      {type === "error" && <div className="error">{message}</div>}
    </>
  );
};

export default Notification;
