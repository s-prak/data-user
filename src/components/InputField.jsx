const InputField = ({ value, onChange, placeholder }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
    />
  );
  export default InputField;