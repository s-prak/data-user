const Button = ({ onClick, text }) => (
    <button onClick={onClick} className="search-button">
      {text}
    </button>
  );
export default Button;