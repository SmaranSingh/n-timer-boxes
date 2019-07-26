import "./App.css";

import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxesCount: 0,
      duration: []
    };
    this.timer = null;
    this.colors = {};
    this.activeBoxes = [];
  }

  updateCount = e => {
    let input = e.target.value;
    if (isNaN(+input) || input === "") {
      input = 0;
    }
    const durationArray = new Array(parseInt(input));
    this.setState({
      boxesCount: parseInt(input),
      duration: durationArray.fill(0)
    });
  };

  createBox = (index, child) => {
    const length = `${index * 80 + 40}px`;
    let color;

    if (!this.colors[index]) {
      color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ")";

      this.colors = { ...this.colors, [index]: color };
    } else {
      color = this.colors[index];
    }

    return (
      <div
        style={{
          height: length,
          width: length,
          backgroundColor: color
        }}
        className="box"
        onMouseOver={e => this.boxEntered(e, index)}
        onMouseOut={() => this.boxExited(index)}
      >
        <>
          {index + 1}
          {child}
        </>
      </div>
    );
  };

  createBoxes = () => {
    const { boxesCount } = this.state;
    let box = null;
    let index = 0;
    while (index < boxesCount) {
      box = this.createBox(index, box);
      index += 1;
    }
    return box;
  };

  boxEntered = (e, index) => {
    e.stopPropagation();
    this.activeBoxes.unshift(index);
    clearInterval(this.timer);
    this.startTimer(index);
  };

  boxExited = index => {
    clearInterval(this.timer);
    const boxIndex = this.activeBoxes.indexOf(index);
    this.activeBoxes.splice(boxIndex, 1);
    if (this.activeBoxes.length > 0) {
      this.startTimer(this.activeBoxes[0]);
    }
  };

  startTimer = index => {
    this.timer = setInterval(() => {
      let { duration } = this.state;
      duration[index] += 1;
      this.setState({
        duration: duration
      });
    }, 1000);
  };

  render() {
    const { duration } = this.state;

    return (
      <div className="App">
        <div className="input-container">
          Enter the number of boxes{": "}
          <input
            type="number"
            onChange={this.updateCount}
            className="input-box"
          />
        </div>
        {this.createBoxes()}
        {duration.map((value, index) => (
          <div key={index}>
            Box{index + 1} : {value} sec
          </div>
        ))}
      </div>
    );
  }
}

export default App;
