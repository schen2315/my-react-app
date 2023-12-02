import { Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom';
import useGamesDescription from '../../../hooks/Rawg/useGamesDescription';

interface Props {
  heading: string
  children?: React.ReactNode
}
const GameDataItem = ({ heading, children }: Props) => {
  return (
    <>
      <Heading fontSize="16px">{heading}</Heading>
      {children}
    </>
  )
}

export default GameDataItem;