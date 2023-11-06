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
} from "@chakra-ui/react";
import { useState } from "react";
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
      <Input
        value={searchInput}
        placeholder={"Search Games"}
        onChange={(event) => setSearchInput(event.target.value)}
      />
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
        <Text size="sm">
          {colorMode === "light" ? "Light Mode" : "Dark Mode"}
        </Text>
      </HStack>
    </HStack>
  );
}

export default Navigation;
