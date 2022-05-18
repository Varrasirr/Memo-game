import React, {FC} from "react";

interface Props{
  moves: number;
};

 const Attempts: FC<Props>=({ moves }) =>{
  return (
    <div className="attempts">
      <p>
        Сделано ходов <span>{moves}</span>
      </p>
    </div>
  );
}

export default Attempts;