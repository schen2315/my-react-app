import { Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import useGamesDescription from '../../../hooks/Rawg/useGamesDescription';

interface Props {
  heading: string
}
const GameDataItem = ({ heading }: Props) => {
  const params = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGamesDescription(params.slug!);

  if (!data || isLoading) return <Spinner />
  console.log(data);
  return (
    <>
      <Heading fontSize="16px">{heading}</Heading>
    </>
  )
}

export default GameDataItem;