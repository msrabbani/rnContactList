import React from 'react';
import styled from 'styled-components/native';

function Home({navigation}) {
  return (
    <Container>
      <TextStyled onPress={() => navigation.navigate('ContactList')}>
        ini Home
      </TextStyled>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const TextStyled = styled.Text``;

export default Home;
