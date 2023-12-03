import { Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      // as={motion.div}
      overflow="hidden"
      borderRadius={10}
      maxH={{ sm: "300px" }}
      // whileHover={{ scale: 1.05 }}
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.15s ease-in",
      }}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
