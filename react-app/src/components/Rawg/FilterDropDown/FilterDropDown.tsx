import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { usePlatformFilterStore } from "../../../hooks/Rawg/useGameQuery";

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
  // const { value, setValue } = usePlatformFilterStore();
  return (
    <Menu isLazy>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selected ? selected : placeholder}
        {/* {value ? value : placeholder} */}
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
