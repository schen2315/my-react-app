import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { useSearchInputStore } from "../../../hooks/Rawg/useGameQuery";

// interface Props {
//   onSubmit: (searchInput: string) => void;
// }

function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const [searchInput, setSearchInput] = useState("");

  const { setValue: setSearchInput } = useSearchInputStore();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image as={FaReact} boxSize="60px" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchInput(ref.current?.value || "");
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
