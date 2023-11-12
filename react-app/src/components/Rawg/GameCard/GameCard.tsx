import { GameInfo } from "../../../services/rawg-client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Highlight,
  Icon,
  HStack,
} from "@chakra-ui/react";

import PlatformsList from "./PlatformsList";
import GameCriticScore from "./GameCriticScore";
import getCroppedImageUrl from "../../../services/image";

interface Props {
  game?: GameInfo;
}

function GameCard({ game }: Props) {
  const getPlatforms = (
    platforms: { platform: { id: number; name: string; slug: string } }[]
  ) => (platforms ? platforms.map((p) => p.platform) : []);

  return (
    <Card>
      <Image
        objectFit="cover"
        maxH={{ base: "100%", sm: "160px" }}
        src={game ? getCroppedImageUrl(game.background_image) : ""}
        alt=""
      />
      <CardHeader>
        {game && (
          <>
            <Heading fontSize={20}>{game.name}</Heading>
            <HStack marginY={1} justifyContent={"space-between"}>
              <PlatformsList platforms={getPlatforms(game.platforms)} />
              <GameCriticScore score={game.metacritic} />
            </HStack>
          </>
        )}
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default GameCard;
