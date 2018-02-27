import React from 'react';
import { connect } from 'react-redux';
import { charactersByUser } from '../../util/selectors';

class CharacterIndex extends React.Component {
  render() {
    const characters = this.props.characters.map((character, i) => {
      return (
        <li key={i}>
          {character.name}
        </li>
      );
    });
    return (
      <ul>
        {characters}
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    characters: charactersByUser(state, ownProps.match.params.userId),
  };
};

export default connect(mapStateToProps, null)(CharacterIndex);
