const Input = (props) => {
  const { type, name, klas, id, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      className={klas}
      id={id}
      placeholder={placeholder}
      required
    />
  );
};
export default Input;
