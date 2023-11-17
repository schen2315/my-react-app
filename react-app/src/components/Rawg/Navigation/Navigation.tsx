import {
  Flex,
  Box,
  Switch,
  Input,
  Text,
  Button,
  useColorMode,
  Heading,
  Stack,
  Spacer,
  Center,
  Image,
  HStack,
  InputGroup,
  InputLeftElement,
  FormControl,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
// import logo from "../../../assets/logo.webp";

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
        }}
      >
        <InputGroup w={[300, 200, 300, 500, 700]}>
          <InputLeftElement children={<BsSearch />} />
          <Input
            placeholder="Search Games"
            borderRadius={20}
            variant={"filled"}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </InputGroup>
      </form>
      {/* <Button
        onClick={() => {
          onSubmit(searchInput);
        }}
      >
        Submit
      </Button> */}
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
