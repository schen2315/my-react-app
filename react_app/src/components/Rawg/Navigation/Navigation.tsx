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
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
// import logo from "../../../assets/logo.webp";

interface Props {
  onSubmit: (searchInput: string) => void;
}

function Navigation({ onSubmit }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState("");
  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image as={FaReact} boxSize="60px" />
      <Text>Rawg</Text>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          value={searchInput}
          placeholder={"Search Games"}
          borderRadius={20}
          variant={"filled"}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </InputGroup>
      <Button
        onClick={() => {
          onSubmit(searchInput);
        }}
      >
        Submit
      </Button>
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
