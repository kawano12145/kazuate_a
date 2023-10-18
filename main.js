"use strict";
// randomNumber ランダムな数字を生成するため
// guesses      推測して入力した数字を格納
// lastResult    直近の結果
// lowOrHi      入力した数字が相手の数字よりも小さいか大きいかを表示
// guessSubmit  数字を入力した後、その数字を送信するためのボタン
// guessField   入力した数値
// guessCount   入力した回数を数える
// resetButton  ゲームをリセット
// checkGuess   入力した数値が正しいか判断してメッセージ
// setGameOver  ゲーム終了後の呼び出し
// resetGame    ゲームリセットのための呼び出し

let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
let guessCount = 1;
let resetButton;

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "あなたの答え: ";
  }

  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "おめでとう！あなたの勝ちです！";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 5) {
    lastResult.textContent = "残念！あなたの負けです!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    lastResult.textContent = "答えが違います!";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "わたしの答えはもうすこし大きいです!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "わたしの答えはもう少し小さいです!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  const parent = document.getElementById("parent");

  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "もう一回";
  parent.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
