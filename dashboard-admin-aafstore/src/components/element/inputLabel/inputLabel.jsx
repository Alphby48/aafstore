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
    <div className="label-input flex justify-center flex-col w-5/6 sm:w-3/4">
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
