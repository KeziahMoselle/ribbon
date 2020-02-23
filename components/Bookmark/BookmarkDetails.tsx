import React from 'react';
import Wrapper from '../../components/Layout/Wrapper';
import Title from '../../components/Title';

function BookmarkDetails({ navigation, route }) {
  const bookmark: BookmarkInterface = route.params;

  return (
    <Wrapper>
      <Title>{ bookmark.title }</Title>
    </Wrapper>
  )
}

export default BookmarkDetails;
