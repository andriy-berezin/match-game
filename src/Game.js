import { useState, useEffect } from "react";
import Card from "./Card";

export default function Game({ size }) {
  let [arr, setArr] = useState([]);
  let [result, setResult] = useState("");
  let fillArray = () => {
    let arr = [];
    for (let i = 1; i <= size / 2; i++) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
  };

  let shuffle = (arr) => {
    let { length } = arr;
    let temp,
      i = length - 1;
    while (i !== 0) {
      let random = Math.floor(Math.random() * i);
      temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
      i--;
    }
    return arr;
  };

  useEffect(() => {
    const shuffledArr = shuffle(fillArray());
    const temp = shuffledArr.map((el) => ({
      val: el,
      visible: false,
      selected: false,
    }));
    setArr(temp);
  }, []);

  let handleCardClick = (e) => {
    let newArr = [...arr];
    let card = newArr[e.target.dataset.index];
    //check if selected
    let selected = newArr.filter((i) => i.selected);
    if (selected.length === 2) {
      //cleanup
      newArr.forEach((el) => {
        el.visible = false;
        el.selected = false;
      });
    } else if (selected.length === 1) {
      if (selected[0].val === card.val) {
        setResult("Gotcha! You won!");
      }
    } else {
      newArr.forEach((el) => {
        el.visible = false;
        el.selected = false;
      });
    }
    card.visible = true;
    card.selected = true;
    setArr(newArr);
  };

  return (
    <>
      <div className="game">
        {arr.map((item, index) => (
          <Card
            val={item.val}
            index={index}
            visible={item.visible}
            selected={item.selected}
            click={handleCardClick}
          ></Card>
        ))}
      </div>
      <div>
        <h1>{result}</h1>
      </div>
    </>
  );
}
