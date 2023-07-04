import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const cardImages =[
  {"src":"/image/helmet-1.png",matched:false},
  {"src":"/image/potion-1.png",matched:false},
  {"src":"/image/ring-1.png"  ,matched:false},
  {"src":"/image/scroll-1.png",matched:false},
  {"src":"/image/shield-1.png",matched:false},
  {"src":"/image/sword-1.png" ,matched:false}
];
function App() {

  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null);
  const [disabled,setDisabled] = useState(false);

  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) ;
    
  }

  //compared two selected cards
  useEffect(()=>{
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
              return prevCards.map (card => {
              if(card.src === choiceOne.src) return  {...card, matched:true }
              else return card ; 
            }
            )})
            resetTurn();
        }else{
          setTimeout(()=>resetTurn(),700)
        }
      }
  },[choiceOne,choiceTwo])  

  const shuffleCards = () =>{
    const shuffledCards =[...cardImages,...cardImages]
      .sort (()=>Math.random()-0.5)
      .map((card) => ({...card,id:Math.random(),matched:false}));
      setTurns(0);
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards);
  }

    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1 );
      setDisabled(false);
    }

  return (
    <div className="flex items-center justify-center flex-col py-[40px] px-[100px] pd:[200px]  App bg-black">
      <h1 className='text-center text-white text-[30px] my-4' >Memory game </h1>
      <button onClick={shuffleCards} className='border-2 border-green-300 my-4 rounded-md p-1 hover:bg-green-300 hover:border-none w-fit text-white '> New Game</button>
      <div className="grid md:grid-cols-4 grid-cols-3 gap-5 mt-5 ">
            {
                cards.map((card)=>(
                    <SingleCard 
                    card={card} 
                    key={card.id} 
                    handleChoice={handleChoice}
                    flipped={ card === choiceOne || card === choiceTwo || card.matched }
                    disabled={disabled}
                    />
                )            
                )
            }
        </div>
        <div className="text-white py-5"> the number of turns is : {turns} </div>
    </div>
  );
}

export default App;
