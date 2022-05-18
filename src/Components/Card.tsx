import React, {FC} from "react";
import classnames from "classnames";

import "../card.css";


interface Props {
  card: any;
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;

  onClick(index: number): void;
};

const Card: FC<Props> = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled
}: Props) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
       
      </div>
      <div className="card-face card-back-face">
        <img src={card.image.default} alt="card" />
      </div>
    </div>
  );
};

export default Card;
