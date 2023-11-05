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
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onSubmit: (searchInput: string) => void;
}

function Navigation({ onSubmit }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading size="md">RAWG</Heading>
          <Stack alignItems="center" direction="row" spacing={2}>
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
          </Stack>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Text size="sm">
              {colorMode === "light" ? "Dark Mode" : "Light Mode"}
            </Text>
            <Switch
              id="toggle-mode"
              isChecked={colorMode === "light" ? false : true}
              onChange={toggleColorMode}
            />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

export default Navigation;
