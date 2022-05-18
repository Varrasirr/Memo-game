import React, {FC} from "react";

interface Props{
  chances: number;
}

const Chances:FC<Props> =({ chances })=> {
  return (
    <div className="chanses">
      <p>
        Осталось попыток <span>{chances}</span>
      </p>
    </div>
  );
}

export default Chances;