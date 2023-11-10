import { Badge } from "@chakra-ui/react";
import React from "react";

interface Props {
  score: number;
}

const GameCriticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
  return (
    <Badge colorScheme={color} fontSize={14} borderRadius={2} paddingX="4px">
      {score}
    </Badge>
  );
};

export default GameCriticScore;
