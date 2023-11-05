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
} from "@chakra-ui/react";

import { FaWindows, FaPlaystation, FaXbox, FaApple } from "react-icons/fa";
import { TbDeviceNintendo } from "react-icons/tb";
import { AiFillAndroid, AiFillMacCommand } from "react-icons/ai";

const platformToIcon: { [key: string]: any } = {
  PC: FaWindows,
  "PlayStation 5": FaPlaystation,
  "PlayStation 4": FaPlaystation,
  "PlayStation 3": FaPlaystation,
  "Xbox One": FaXbox,
  "Xbox Series S/X": FaXbox,
  iOS: FaApple,
  "Nintendo Switch": TbDeviceNintendo,
  Android: AiFillAndroid,
  macOS: AiFillMacCommand,
};

interface Props {
  game?: GameInfo;
}

function GameCard({ game }: Props) {
  const getPlatforms = (
    platforms: { platform: { id: number; name: string } }[]
  ) => platforms.map((platform) => platform.platform.name);
  return (
    <Card maxW="md">
      <Image
        objectFit="cover"
        maxH={{ base: "100%", sm: "160px" }}
        src={game ? game.background_image : ""}
        alt=""
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      />
      <CardHeader>
        {game && (
          <>
            {getPlatforms(game.platforms).map((platform, index) =>
              platform in platformToIcon ? (
                <>
                  <Icon key={index} as={platformToIcon[platform]} />{" "}
                </>
              ) : (
                <></>
              )
            )}
            <Heading size="md">{game.name}</Heading>
            <Text fontWeight="bold">
              {game.metacritic && (
                <Highlight
                  query={game.metacritic.toString()}
                  styles={{ px: "2", py: "1", rounded: "10", bg: "#40C7BF" }}
                >
                  {game.metacritic.toString()}
                </Highlight>
              )}
            </Text>
          </>
        )}
        {!game && <></>}
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default GameCard;
