import Car from "./Car/Car.js";

export default class RacingCarGame {
  constructor() {
    this.cars = [];
    this.setEvent();
    this.blockRacingCountForm();
  }
  setEvent = () => {
    const $carNameForm = document
      .querySelector("#car-names-input")
      .closest("form");
    $carNameForm.addEventListener("submit", this.setCarNameSubmitEvent);
    const $racingCountForm = document
      .querySelector("#racing-count-input")
      .closest("form");
    $racingCountForm.addEventListener("submit", this.setRacingCountSubmitEvent);
  };

  setCarNameSubmitEvent = (event) => {
    event.preventDefault();
    const $carNameInput = document.querySelector("#car-names-input");
    const carNames = $carNameInput.value.split(",");
    const alertMessage = this.createCarNameAlertMessage(carNames);

    if (alertMessage) {
      alert(alertMessage);
      return;
    }
    console.log(carNames);
    this.cars = carNames.map((carName) => new Car(carName));
    this.permitRacingCountForm();
  };

  blockRacingCountForm = () => {
    const $racingCountInput = document.querySelector("#racing-count-input");
    const $racingCountButton = document.querySelector("#racing-count-submit");
    $racingCountInput.disabled = true;
    $racingCountButton.disabled = true;
  };

  permitRacingCountForm = () => {
    const $racingCountInput = document.querySelector("#racing-count-input");
    const $racingCountButton = document.querySelector("#racing-count-submit");
    $racingCountInput.disabled = false;
    $racingCountButton.disabled = false;
  };

  isDuplicatedCarName = (carNames) => {
    return [...new Set(carNames)].length !== carNames.length;
  };

  hasEmpty = (carNames) => {
    return carNames.some((carName) => carName === "");
  };

  isInvalidCarNameLength = (carNames) => {
    return carNames.some((carName) => carName.length > 5);
  };

  hasSpace = (carNames) => {
    return carNames.some((carName) => carName.match(/[" "]/));
  };

  createCarNameAlertMessage = (carNames) => {
    if (this.isDuplicatedCarName(carNames)) {
      return "이름이 중복되었습니다";
    }
    if (this.hasEmpty(carNames)) {
      return "이름은 공백이 될수 없습니다";
    }
    if (this.isInvalidCarNameLength(carNames)) {
      return "이름은 5글자이하로 입력해주세요";
    }
    if (this.hasSpace(carNames)) {
      return "이름에 공백이 포함되서는 안됩니다";
    }

    return "";
  };

  setRacingCountSubmitEvent = (event) => {
    event.preventDefault();
    const $racingCountInput = document.querySelector("#racing-count-input");
    const racingCount = $racingCountInput.value;
    const alertMessage = this.createRacingCountAlertMessage(racingCount);

    if (alertMessage) {
      alert(alertMessage);
      return;
    }
    console.log(racingCount);
    this.play(racingCount);
  };

  isUnderZero = (racingCount) => {
    return racingCount <= 0;
  };

  createRacingCountAlertMessage = (racingCount) => {
    if (this.isUnderZero(racingCount)) {
      return "1이상의 숫자를 입력해주세요";
    }

    return "";
  };

  play = (racingCount) => {
    for (let i = 0; i < racingCount; i++) {
      this.cars.forEach((car) => car.move());
      this.printGameProcess();
    }
    this.printWinner();
  };

  printGameProcess = () => {
    const gameProcess =
      this.cars
        .map(
          (car) =>
            `<div class="game-process">${car.name}: ${"-".repeat(
              car.distance
            )}</div>`
        )
        .join("") + "<br/>";

    const $app = document.querySelector("#app");
    $app.insertAdjacentHTML("beforeend", gameProcess);
  };

  getWinner = () => {
    const maxLength = this.cars.sort((a, b) => b.distance - a.distance)[0]
      .distance;

    return this.cars
      .filter((car) => car.distance === maxLength)
      .map((car) => car.name);
  };

  generateWinnerMessage = (winners) => {
    return `<span id = "racing-winners">최종우승자: ${winners.join(
      ", "
    )}</span>`;
  };

  printWinner = () => {
    const winners = this.getWinner();
    const winnerMessage = this.generateWinnerMessage(winners);
    const $app = document.querySelector("#app");
    $app.insertAdjacentHTML("beforeend", winnerMessage);
  };
}

new RacingCarGame();
