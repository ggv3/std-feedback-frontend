import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";

const StyledForm = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 30%;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: "", feedbackSuccess: "", snackbarOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  handleChange(event) {
    this.setState({ feedback: event.target.value });
  }

  sendFeedback() {
    const endPoint = process.env.REACT_APP_ENDPOINT;
    axios
      .post(`${endPoint}/add`, {
        text: this.state.feedback
      })
      .then(response => {
        this.setState({
          feedbackSuccess: true,
          feedback: "",
          snackbarOpen: true
        });
        this.setState({});
      })
      .catch(e => {
        this.setState({ snackbarOpen: true, feedbackSuccess: false });
        console.log(e);
      });
  }

  render() {
    const disabled =
      this.state.feedback.length < 1 || this.state.feedback.length > 500;
    return (
      <StyledForm>
        <Typography variant="h6">Anonyymi palaute</Typography>
        <Typography>
          Risuja, ruusuja tai kehuja. Kaikki mitä nyt löytyy mielen päältä.
          Tänne näin!
        </Typography>
        <StyledTextField
          id="outlined-textarea"
          multiline
          variant="outlined"
          rows="8"
          value={this.state.feedback}
          onChange={this.handleChange}
          aria-describedby="helperText"
        />
        <FormHelperText id="helperText">
          {`${this.state.feedback.length}/500`}
        </FormHelperText>
        <Button
          variant="contained"
          color="primary"
          onClick={this.sendFeedback}
          disabled={disabled}
        >
          Lähetä
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          onClose={() => this.setState({ snackbarOpen: false })}
          open={this.state.snackbarOpen}
          autoHideDuration={10000}
          message={
            this.state.feedbackSuccess
              ? "Kiitos palautteesta!"
              : "Virhe palautteen lähettämisessä, kerro Galloglaichille, niin korjataan asia"
          }
        />
      </StyledForm>
    );
  }
}

export default Form;
