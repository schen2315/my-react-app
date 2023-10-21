import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./Like.module.css";
import { useState } from "react";

interface LikeProps {
  onClick: () => void;
}

const Like = ({ onClick }: LikeProps) => {
  const [clicked, setClicked] = useState(false);
  const toggleOnClick = () => {
    onClick();
    setClicked(!clicked);
  };

  if (clicked) return <AiOutlineHeart onClick={toggleOnClick} size="40" />;
  return <AiFillHeart onClick={toggleOnClick} color="red" size="40" />;
};

export default Like;
