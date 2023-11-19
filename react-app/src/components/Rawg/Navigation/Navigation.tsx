import {
  Switch,
  Input,
  Text,
  useColorMode,
  Image,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaReact } from "react-icons/fa";

interface Props {
  onSubmit: (searchInput: string) => void;
}

function Navigation({ onSubmit }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image as={FaReact} boxSize="60px" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(searchInput);
          if (ref && ref.current) ref.current.value = "";
        }}
      >
        <InputGroup w={[300, 200, 300, 500, 700]}>
          <InputLeftElement children={<BsSearch />} />
          <Input
            placeholder="Search Games"
            borderRadius={20}
            variant={"filled"}
            ref={ref}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </InputGroup>
      </form>
      <HStack>
        <Switch
          colorScheme="green"
          id="toggle-mode"
          isChecked={colorMode === "light" ? false : true}
          onChange={toggleColorMode}
        />
        <Text size="sm" whiteSpace="nowrap">
          {colorMode === "light" ? "Light Mode" : "Dark Mode"}
        </Text>
      </HStack>
    </HStack>
  );
}

export default Navigation;
