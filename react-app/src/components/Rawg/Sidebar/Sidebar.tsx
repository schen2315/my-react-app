import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Heading } from "@chakra-ui/react";

interface NavItemProps {
  children: string;
  icon?: IconType;
  onClick?: (item: string) => void;
}

interface SidebarProps {
  heading: string;
  items?: string[];
  onClick?: (item: string) => void;
}

const NavItem = ({ children, icon, onClick }: NavItemProps) => {
  const onClickDefault = (item: string) => console.log(item);
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        cursor="pointer"
        onClick={
          onClick ? () => onClick(children) : () => onClickDefault(children)
        }
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

function Sidebar({ heading, items, onClick }: SidebarProps) {
  const onClickDefault = (item: string) => console.log(item);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minW="150" h="full">
      <Heading size="md">{heading}</Heading>
      {items &&
        items.map((item) => (
          <NavItem
            key={item}
            onClick={onClick ? () => onClick(item) : () => onClickDefault(item)}
          >
            {item}
          </NavItem>
        ))}
    </Box>
  );
}

export default Sidebar;
