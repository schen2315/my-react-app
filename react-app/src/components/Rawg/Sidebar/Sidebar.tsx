import {
  Box,
  Flex,
  HStack,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Heading } from "@chakra-ui/react";
import { GenreInfo } from "../../../services/rawg-client";
import getCroppedImageUrl from "../../../services/image";
import { useGenreFilterStore } from "../../../hooks/Rawg/useGameQuery";
import { motion } from "framer-motion";

interface SidebarProps {
  heading: string;
  genres: GenreInfo[];
  onClick?: (item: string) => void;
  selectedGenre?: string | null;
}

function Sidebar({
  heading,
  genres,
}: // onClick,
// selectedGenre = null,
SidebarProps) {
  // const onClickDefault = (item: string) => console.log(item);
  const { value, setValue } = useGenreFilterStore();
  const renderGenreList = () =>
    genres.map(({ name, image_background }) => (
      <ListItem
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        key={name}
        // onClick={onClick ? () => onClick(name) : () => onClickDefault(name)}
        onClick={() => setValue(name)}
      >
        <HStack>
          <Image
            src={getCroppedImageUrl(image_background)}
            boxSize={"16px"}
            borderRadius={5}
          />
          <Button
            variant="link"
            fontSize="20px"
            // fontWeight={selectedGenre === name ? "bold" : "normal"}
            fontWeight={value === name ? "bold" : "normal"}
          >
            {name}
          </Button>
        </HStack>
      </ListItem>
    ));

  return (
    <Stack>
      <Heading size="md">{heading}</Heading>
      <List>{genres && renderGenreList()}</List>
    </Stack>
  );
}

export default Sidebar;
