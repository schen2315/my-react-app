import {
  Heading,
  Text,
  Stack,
  SkeletonText,
  Skeleton,
  List,
  ListItem,
  HStack,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";

interface Props {
  heading: string;
  count?: number;
}
function SidebarSkeleton({ heading, count = 19 }: Props) {
  let skeletonCount = Array.from({ length: count }, (value, index) => index);
  return (
    <Stack>
      <List>
        <Heading size="md">{heading}</Heading>
        {count > 1 &&
          skeletonCount.map((index) => (
            <ListItem padding="2">
              <Grid
                templateAreas={{ base: `"img text"` }}
                templateColumns={{
                  base: "22px 1fr",
                }}
              >
                <GridItem area={"img"}>
                  <Skeleton
                    height="14px"
                    width="14px"
                    key={index}
                    borderRadius={3}
                  />
                </GridItem>
                <GridItem area={"text"}>
                  <Skeleton height="14px" key={index} borderRadius={3} />
                </GridItem>
              </Grid>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}

export default SidebarSkeleton;
