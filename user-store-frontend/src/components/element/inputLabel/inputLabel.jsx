import Label from "./label";
import Input from "./input";
const InputLabel = (props) => {
  const {
    type,
    name,
    klasLabel,
    klasInput,
    placeholder,
    textLabel,
    value,
    onChange,
  } = props;
  return (
    <div className="label-input">
      <Label name={name} klas={klasLabel}>
        {textLabel}
      </Label>
      <Input
        type={type}
        name={name}
        klas={klasInput}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputLabel;
