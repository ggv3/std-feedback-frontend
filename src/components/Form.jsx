import React from "react";
import axios from "axios";

require("dotenv").config();

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: "", feedbackSent: false };
    this.handleChange = this.handleChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ feedback: event.target.value });
  }

  sendFeedback() {
    axios
      .post(`${process.env.ENDPOINT}/add`, {
        text: this.state.feedback
      })
      .then(response => {
        this.setState({ feedbackSent: true, feedback: "" });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h3>Anonyymi palaute</h3>
          <p>
            Risuja, ruusuja tai kehuja. Kaikki mitä nyt löytyy mielen päältä.
            Tänne näin!
          </p>
        </div>
        <div>
          <form>
            <label>
              <textarea
                value={this.state.feedback}
                onChange={this.handleChange}
                type="text"
                name="name"
                style={{
                  height: 300,
                  width: 600
                }}
              />
            </label>
          </form>
        </div>
        <div style={{ marginTop: 20 }}>
          <button onClick={this.sendFeedback}>Lähetä</button>
        </div>
        <div style={{ display: !this.state.feedbackSent ? "none" : "" }}>
          <p>Kiitokset palautteesta!</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
