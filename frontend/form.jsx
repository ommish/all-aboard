import React from 'react';

export const QuoteForm = () => {
  return (
    <form action="/quotes" method="post">
      <input type="text" name="quote" value=""/>
      <input type="submit" value="Submit"/>
    </form>
  );
};
