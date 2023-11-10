import React from "react";

import { FaWindows, FaPlaystation, FaXbox, FaApple } from "react-icons/fa";
import { TbDeviceNintendo } from "react-icons/tb";
import { AiFillAndroid, AiFillMacCommand } from "react-icons/ai";
import { HStack, Icon } from "@chakra-ui/react";

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
  platforms: { id: number; name: string; slug: string }[];
}

const PlatformsList = ({ platforms }: Props) => {
  return (
    <HStack>
      {platforms &&
        platforms.map(({ name, slug }, index) => (
          <Icon key={index} as={platformToIcon[name]} color="gray.500" />
        ))}
    </HStack>
  );
};

export default PlatformsList;
