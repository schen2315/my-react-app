import { GridItem, SimpleGrid, Spinner } from '@chakra-ui/react'
import React from 'react'
import useGameScreenshots from '../../../hooks/Rawg/useGameScreenshots';
import { useParams } from 'react-router-dom';

const GameScreenshots = () => {
  const params = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGameScreenshots(params.slug!);
  console.log(data?.pages)
  if (isLoading) return <Spinner />
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5} margin={3}
    >
      {/* <GridItem borderRadius={10} overflow="hidden">
        <img src="https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg" alt="" />
      </GridItem> */}

      {data && data.pages.map( ({ results }) => results.map(({ image}) => (<img src={image}/>)))}
    </SimpleGrid>
  )
}

export default GameScreenshots