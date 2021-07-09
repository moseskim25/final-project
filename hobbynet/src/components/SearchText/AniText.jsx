import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";

const texts = ["Tennis", "Singing", "Spanish", "Whittling", "Russian", "Painting", "French", "Comp.Sci", "Jazz", "Running"];

class AniText extends Component {
  state = {
    textIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1,
      });
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <section className="inline">
            <ReactTextTransition
              text={texts[this.state.textIndex % texts.length]}
              springConfig={presets.gentle}
              style={{ margin: "0 4px" }}
              inline
            />
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default AniText;
