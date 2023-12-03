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
import { Link, useNavigate } from "react-router-dom";

// interface Props {
//   onSubmit: (searchInput: string) => void;
// }

function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const [searchInput, setSearchInput] = useState("");

  const { setValue: setSearchInput } = useSearchInputStore();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Link to="/">
        <Image as={FaReact} boxSize="60px" />
      </Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchInput(ref.current?.value || "");
          if (ref && ref.current) ref.current.value = "";
          navigate("/")
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
