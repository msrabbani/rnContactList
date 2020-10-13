import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

export default function ButtonAdd(props) {
  return (
    <ButtonWrapper onPress={props.onPress}>
      <TextStyled>{props.text}</TextStyled>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background-color: #51b0db;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const TextStyled = styled.Text``;
