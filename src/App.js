import React from "react";
import { Roulette } from "./components/Roulette";

const amountItems = 50;
const duration = 4000;
const items = [
  {
    color: "red",
    raiting: 1,
  },
  {
    color: "yellow",
    raiting: 2,
  },
  {
    color: "green",
    raiting: 3,
  },
  {
    color: "blue",
    raiting: 4,
  },
  {
    color: "grey",
    raiting: 5,
  },
  {
    color: "black",
    raiting: 6,
  },
  {
    color: "purple",
    raiting: 7,
  },
];

function App() {
  return (
    <div className=" bg-gray-900 flex w-full min-h-screen items-center  justify-center flex-col">
      <Roulette amountItems={amountItems} items={items} duration={duration} />
    </div>
  );
}

export default App;
