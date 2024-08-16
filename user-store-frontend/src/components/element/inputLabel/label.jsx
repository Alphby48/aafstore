const Label = (props) => {
  const { name, klas, children } = props;
  return (
    <label htmlFor={name} className={klas}>
      {children}
    </label>
  );
};

export default Label;
