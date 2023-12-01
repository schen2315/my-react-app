import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import GameDataItem from "./GameDataItem";

const GameData = () => {
  return (
    <Grid
      templateAreas={`"platforms metascore"
              "genres publishers"`}
    >
      <GridItem area={"platforms"} padding={5}>
        <GameDataItem heading="Platforms" />
      </GridItem>
      <GridItem area={"metascore"} padding={5}>
        <GameDataItem heading="Metascore" />
      </GridItem>
      <GridItem area={"genres"} padding={5}>
        <GameDataItem heading="Genres" />
      </GridItem>
      <GridItem area={"publishers"} padding={5}>
        <GameDataItem heading="Publishers" />
      </GridItem>
    </Grid>
  );
};

export default GameData;
