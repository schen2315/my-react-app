import { GridItem, SimpleGrid, Spinner } from '@chakra-ui/react'
import React from 'react'
import useGameScreenshots from '../../../hooks/Rawg/useGameScreenshots';
import { useParams } from 'react-router-dom';

const Image = ({ src }: { src: string } ) => {
  return (
    <GridItem borderRadius={10} overflow="hidden">
      <img src={src} alt="" />
    </GridItem>
  )
}

const GameScreenshots = () => {
  const params = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGameScreenshots(params.slug!);
  console.log(data?.pages)
  if (isLoading) return <Spinner />
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} marginY={5}
    >
      {data && data.pages.map( ({ results }) => results.map(({ image }) => (<Image src={image}/>)))}
    </SimpleGrid>
  )
}

export default GameScreenshots