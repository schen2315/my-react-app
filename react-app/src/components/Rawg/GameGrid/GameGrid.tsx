import { Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { GameInfo } from "../../../services/rawg-client";
import GameCardSkeleton from "../GameCard/GameCardSkeleton";
import GameCardContainer from "../GameCard/GameCardContainer";
import GameCard from "../GameCard/GameCard";

interface Props {
  games?: GameInfo[];
  skeleton?: boolean;
  onLoadMore?: () => void;
  loadMoreDisabled?: boolean;
}
function GameGrid({
  games = [],
  skeleton = false,
  onLoadMore,
  loadMoreDisabled = false,
}: Props) {
  return (
    <>
      <SimpleGrid
        spacing={4}
        padding="10px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      >
        {skeleton &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
            <GameCardContainer>
              <GameCardSkeleton key={n} />
            </GameCardContainer>
          ))}
        {games.length > 0 &&
          games.map((game) => (
            <GameCardContainer>
              <GameCard key={game.id} game={game} />
            </GameCardContainer>
          ))}
      </SimpleGrid>
      <HStack paddingY={5}>
        <Button isDisabled={loadMoreDisabled} onClick={onLoadMore}>
          {loadMoreDisabled ? "Loading" : "Load more"}
        </Button>
      </HStack>
    </>
  );
}

export default GameGrid;
