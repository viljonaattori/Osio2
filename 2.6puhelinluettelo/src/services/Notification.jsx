const Notification = ({ message }) => {
  if (!message || !message.text) return null;

  return <div className={`notification ${message.type}`}>{message.text}</div>;
};

export default Notification;
