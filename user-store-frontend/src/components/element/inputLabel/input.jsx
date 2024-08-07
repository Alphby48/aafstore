const Input = (props) => {
  const { type, name, klas, id, placeholder, value, onChange } = props;
  return (
    <input
      type={type}
      name={name}
      className={klas}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};
export default Input;
