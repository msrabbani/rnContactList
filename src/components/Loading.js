import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

export default function Loading(props) {
  const {loading, ...attr} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <ModalBackground>
        <IndicatorWrapper>
          <ActivityIndicator color={'silver'} animating={loading} />
        </IndicatorWrapper>
      </ModalBackground>
    </Modal>
  );
}

const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  background-color: #00000040;
`;

const IndicatorWrapper = styled.View`
  background-color: #ffffff;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
