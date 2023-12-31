import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGamesDescription from "../../../hooks/Rawg/useGamesDescription";
import GameDataItem from "./GameDataItem";
import GameData from "./GameData";
import useGameTrailers from "../../../hooks/Rawg/useGameTrailers";
import GameScreenshots from "./GameScreenshots";

const GameDetail = () => {
  const params = useParams<{ slug: string }>();
  console.log(params);

  const { data, error, isLoading } = useGamesDescription(params.slug!);
  const { trailer, trailerError, trailerLoading } = useGameTrailers(data?.id!);
  console.log(trailer?.results);
  const [toggle, setToggle] = useState(false);
  // if (isLoading) return <Spinner />;

  // if (error) throw error;

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
    <SimpleGrid columns={{ sm: 1, md: 2}}>
      <GridItem>
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
      </GridItem>
      <GridItem margin={5}>
        {trailer && trailer.results.length > 0 && (
          <video
            controls
            // title={trailer.results[0].name}
            
            // allowFullScreen
          ><source src={trailer.results[0].data["480"]} /></video>
        )}
        <GameScreenshots />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetail;
