import '../styles/components/Button.css';

function Button({ onClick, text }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
