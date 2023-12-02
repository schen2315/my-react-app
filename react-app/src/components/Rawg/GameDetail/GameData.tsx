import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import GameDataItem from "./GameDataItem";
import { useParams } from "react-router-dom";
import useGamesDescription from "../../../hooks/Rawg/useGamesDescription";
import GameCriticScore from "../GameCard/GameCriticScore";

const GameData = () => {
  const params = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGamesDescription(params.slug!);

  if (!data || isLoading) return <Spinner />
  console.log(data);
  return (
    <Grid
      templateAreas={`"platforms metascore"
              "genres publishers"`}
    >
      <GridItem area={"platforms"} padding={5}>
        <GameDataItem heading="Platforms">
          {data.platforms.map(( { platform } ) => <Text>{platform.name}</Text>)}
        </GameDataItem>
      </GridItem>
      <GridItem area={"metascore"} padding={5}>
        <GameDataItem heading="Metascore">
          <GameCriticScore score={data.metacritic} />
        </GameDataItem>
      </GridItem>
      <GridItem area={"genres"} padding={5}>
        <GameDataItem heading="Genres">
          {data.genres.map(( { name } ) => <Text>{name}</Text>)}
        </GameDataItem>
      </GridItem>
      <GridItem area={"publishers"} padding={5}>
        <GameDataItem heading="Publishers">
          {data.publishers.map(( { name } ) => <Text>{name}</Text>)}
        </GameDataItem>
      </GridItem>
    </Grid>
  );
};

export default GameData;
