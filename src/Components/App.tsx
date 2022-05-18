import React, { useEffect, useState, useRef, FC } from "react";

import Modal from 'react-modal'

import Card from "./Card";
import Attempts from "./Attempts";
import Chanses from "./Chances";
import defaultCardsArr from "../cardsArray";
import shuffleCards from "../utils";

import "../app.css";

interface ICard {
  name: string;
  image: string;
}

const App: FC = () => {
  const [cards, setCards] = useState<ICard[]>(() =>
    shuffleCards(defaultCardsArr.concat(defaultCardsArr))
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<{ [key: string]: boolean }>({});

  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [win, setWin] = useState(false);

  const timeout = useRef<NodeJS.Timeout>();
  
  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  //show modal
  const stopGame = () => {
    if (Object.keys(matchedCards).length === defaultCardsArr.length) {
      setWin(true);
      setShowModal(true);
    }
    if (moves === 40) {
      setShowModal(true);
    }
  };

  //check cards for matching
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].name === cards[second].name) {
      setMatchedCards((prev) => ({ ...prev, [cards[first].name]: true }));
      setOpenCards([]);
      return;
    }
    //flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);

      disable();
    } else {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    stopGame();
  }, [matchedCards, moves]);
  const checkIsFlipped = (index:number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card:any) => {
    return Boolean(matchedCards[card.name]);
  };

  const handleRestart = () => {
    setMatchedCards({});
    setOpenCards([]);
    setShowModal(false);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(defaultCardsArr.concat(defaultCardsArr)));
    setMoves(0);
  };

  return (
    <div className="App">
      <header>
        <h1>Pepe memory</h1>
      </header>
      <div className="container">
        <Attempts moves={moves} />

        <div className="cardsfield">
          {cards.map((card:any, index:number) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            );
          })}
        </div>

        <Chanses chances={40 - moves} />
      </div>

      <footer></footer>
      <div className="for_modal">
        <Modal className="modal" isOpen={showModal}>
          {(() => {
            if (win === true) {
              return (
                <div className="phrase">
                  <p>Ура! Вы выиграли</p>
                  <p>Это заняло {moves} ходов</p>
                </div>
              );
            } else {
              return (
                <div className="phrase">
                  <p>Увы, Вы проиграли</p>
                  <p>У Вас закончились ходы</p>
                </div>
              );
            }
          })()}

          <button onClick={handleRestart}>Сыграть еще</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;