import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Pointer } from "../assets/pointer.svg";

function getRandomObjectsWithRarity(arr, count) {
  let weightedArrayFirstPart = [];
  let weightedArrayLastPart = [];

  arr.forEach((obj) => {
    for (let i = 0; i < 5; i++) {
      weightedArrayFirstPart.push(obj);
    }

    const weightLastPart = Math.max(1, 10 - obj.raiting);

    for (let i = 0; i < weightLastPart; i++) {
      weightedArrayLastPart.push(obj);
    }
  });

  let result = [];

  for (let i = 0; i < count - 5; i++) {
    const randomIndex = Math.floor(
      Math.random() * weightedArrayFirstPart.length
    );
    result.push(weightedArrayFirstPart[randomIndex]);
  }

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(
      Math.random() * weightedArrayLastPart.length
    );
    result.push(weightedArrayLastPart[randomIndex]);
  }
  return result;
}
export const Roulette = ({ amountItems, items, duration }) => {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [reset, setReset] = useState(true);
  const listRef = useRef(null);

  const handleStart = () => {
    setScroll(true);

    if (listRef.current) {
      // const items = listRef.current.querySelectorAll("li");
      // const item = items[47];
      // console.log(item);

      listRef.current.style.transform = `translateX(-90%)`;

      listRef.current.addEventListener(
        "transitionend",
        function (event) {
          setReset(false);
        },
        { once: true }
      );
    }
  };

  const handleReset = () => {
    if (listRef.current) {
      listRef.current.style.transitionDuration = "100ms";
      listRef.current.style.transform = `translateX(0)`;

      listRef.current.addEventListener(
        "transitionend",
        (event) => {
          listRef.current.style.transitionDuration = `${duration}ms`;
          setData(getRandomObjectsWithRarity(items, amountItems));
          setScroll(false);
          setReset(true);
        },
        { once: true }
      );
    }
  };

  useEffect(() => {
    setData(getRandomObjectsWithRarity(items, amountItems));
  }, []);

  return (
    <div className=" bg-gray-800 p-4 relative rounded-md w-[732px]">
      <div className="overflow-hidden ">
        <ul
          ref={listRef}
          className={`inline-flex gap-[10px] transition`}
          style={{ transitionDuration: `${duration}ms` }}
        >
          {data.map((el, i) => {
            return (
              <li
                data-atribute={JSON.stringify(el)}
                key={i}
                className=" shrink-0 w-[130px] h-64 "
                style={{ background: el.color }}
              ></li>
            );
          })}
        </ul>
        <Pointer className="absolute w-7 h-8 rotate-180 left-1/2 -translate-x-1/2" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          {" "}
          <button
            disabled={scroll}
            onClick={handleStart}
            className=" disabled:bg-red-600 disabled:hover:opacity-100 disabled:cursor-not-allowed  text-white hover:opacity-70  border-2 border-gray-800 rounded-md w-32 py-1 bg-gray-500"
          >
            roll
          </button>
          <button
            disabled={reset}
            onClick={handleReset}
            className=" disabled:bg-red-600 disabled:hover:opacity-100 disabled:cursor-not-allowed   text-white hover:opacity-70 -bottom-16  border-2 border-gray-800 rounded-md w-32 py-1 bg-gray-500"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};
