import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
  selected?: string | null;
}
function FilterDropDown({
  options,
  onSelect,
  placeholder,
  selected = null,
}: Props) {
  return (
    <Menu isLazy>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selected ? selected : placeholder}
      </MenuButton>
      <MenuList>
        {options &&
          options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={() => onSelect(option)}
            >
              {option}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}

export default FilterDropDown;
