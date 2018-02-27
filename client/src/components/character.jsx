import React from 'react';

class Character extends React.Component {
  render() {
    return (
      <div>
      {this.props.character.name}
      </div>
    )
  }
}

export default Character;
