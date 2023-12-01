import { Button, HStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import { GameInfo } from "../../../services/rawg-client";
import GameCardSkeleton from "../GameCard/GameCardSkeleton";
import GameCardContainer from "../GameCard/GameCardContainer";
import GameCard from "../GameCard/GameCard";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  games?: GameInfo[];
  skeleton?: boolean;
  onLoadMore: () => void;
  hasMoreGames: boolean;
}
function GameGrid({
  games = [],
  skeleton = false,
  onLoadMore,
  hasMoreGames = false,
}: Props) {
  return (
    <InfiniteScroll
      dataLength={games.length || 0}
      hasMore={hasMoreGames}
      next={onLoadMore}
      loader={<Spinner />}>
      <SimpleGrid
          spacing={4}
          padding="20px"
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
      </InfiniteScroll>
  );
}

export default GameGrid;
