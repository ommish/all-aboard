import React from 'react';

class QuoteForm extends React.Component {

  constructor() {
    super();
    this.state = {input: ""}
  }

  handleInput(e) {
    this.setState({input: e.target.value});
  }

  render () {
    return (
      <form action="/quotes" method="post">
      <input type="text" name="quote" onChange={this.handleInput.bind(this)} value={this.state.input}/>
      <input type="submit" value="Submit"/>
      </form>
    );
  }
};

export default QuoteForm;
