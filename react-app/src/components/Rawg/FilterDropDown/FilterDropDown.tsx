import { Select } from "@chakra-ui/react";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
}
function FilterDropDown({ options, onSelect, placeholder }: Props) {
  return (
    <Select
      placeholder={placeholder}
      onChange={(event) => onSelect(event.target.value)}
    >
      {options &&
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </Select>
  );
}

export default FilterDropDown;
