const Button = (props) => {
  const { type, klasBtn, children } = props;
  return (
    <button type={type} className={klasBtn}>
      {children}
    </button>
  );
};

export default Button;
