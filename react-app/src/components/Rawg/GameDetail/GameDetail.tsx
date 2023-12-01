import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGamesDescription from "../../../hooks/Rawg/useGamesDescription";
import GameDataItem from "./GameDataItem";
import GameData from "./GameData";

const GameDetail = () => {
  const params = useParams<{ slug: string }>();
  console.log(params);

  const { data, error, isLoading } = useGamesDescription(params.slug!);
  const [toggle, setToggle] = useState(false);
  if (isLoading) return <Spinner />;

  if (error) throw error;

  const ShowMore = (
    <Button
      background="yellow.300"
      color={"blackAlpha.900"}
      maxH={"30px"}
      maxW={"100px"}
      fontSize={"16px"}
      _hover={{ background: "yellow.400" }}
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? "Show Less" : "Show More"}
    </Button>
  );
  return (
    <>
    <Box padding={5}>
      <Heading>{data?.name}</Heading>
      <Text fontSize={"16px"}>
        {!toggle ? (
          <>
            {data?.description_raw.slice(0, 300)}
            {"... "}
            {ShowMore}
          </>
        ) : (
          <>
            {data?.description_raw} {ShowMore}
          </>
        )}
      </Text>
    </Box>
    <GameData />
    </>
  );
};

export default GameDetail;
