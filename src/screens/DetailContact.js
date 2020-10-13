import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';

function DetailContact({navigation, route}) {
  const {id, firstName, lastName, age, photo} = route.params.data;
  const defaultImg = require('../assets/images/dp_default.jpeg');

  const apiDeleteContact = async (i) => {
    console.log('i', i);
    await fetch('https://simple-contact-crud.herokuapp.com/contact/' + i, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res, 'ressse');
        if (res.message == 'contact deleted') {
          Alert.alert('Contact has been delete!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('ContactList')},
          ]);
        } else {
          Alert.alert('Oops!', 'Please try again later!', [
            {text: 'OK', onPress: () => navigation.navigate('ContactList')},
          ]);
        }
      });
  };

  const onPressDelete = (id, firstName, lastName) => {
    Alert.alert(
      'Delete Contact',
      `Delete the contact "${firstName} ${lastName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => apiDeleteContact(id)},
      ],
      {cancelable: false},
    );
  };

  return (
    <Container>
      <Header />
      <ImageStyled source={photo == 'N/A' ? defaultImg : {uri: photo}} />
      <Body>
        <TextStyled>
          {firstName} {lastName}
        </TextStyled>
        {/* <TextStyled>{id}</TextStyled> */}
        <DetailWrapper>
          <ContactInfo>
            <TextDetail>First Name </TextDetail>
            <TextDetailValue>: {firstName}</TextDetailValue>
            {/* <TextDetailValue>sdasdsadasdfaefdasdsadasd</TextDetailValue> */}
          </ContactInfo>
          <ContactInfo>
            <TextDetail>Last Name </TextDetail>
            <TextDetailValue>: {lastName}</TextDetailValue>
          </ContactInfo>
          <ContactInfo>
            <TextDetail>Age </TextDetail>
            <TextDetailValue>: {age}</TextDetailValue>
          </ContactInfo>
        </DetailWrapper>
      </Body>
      <Footer>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() => console.log('press edit')}>
          <ButtonText>{'Edit'}</ButtonText>
        </ButtonStyled>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() => onPressDelete(id, firstName, lastName)}>
          <ButtonText>{'Delete'}</ButtonText>
        </ButtonStyled>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() => navigation.goBack()}>
          <ButtonText>{'Close'}</ButtonText>
        </ButtonStyled>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #bdc3c7;
`;
const DetailWrapper = styled.View`
  margin-vertical: 50px;
  background-color: #374140;
  border-radius: 10px;
`;
const ContactInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const TextStyled = styled.Text`
  color: #2a2c2b;
  font-size: 30px;
  font-weight: 600;
`;
const TextDetail = styled.Text`
  width: 45%;
  color: #bdc3c7;
  font-size: 18px;
`;
const TextDetailValue = styled.Text`
  color: #bdc3c7;
  font-size: 18px;
`;
const ImageStyled = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 70px;
  border-width: 4px;
  border-color: #bdc3c7;
  margin-bottom: 30px;
  align-self: center;
  position: absolute;
  margin-top: 100px;
`;
const Header = styled.View`
  background-color: #374140;
  height: 200px;
`;

const Body = styled.View`
  padding: 30px;
  align-items: center;
`;
const Footer = styled.View`
  align-items: center;
`;
const ButtonStyled = styled.TouchableHighlight`
  width: 150px;
  height: 40px;
  background-color: grey;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 10px;
`;

const ButtonText = styled.Text`
  color: #2a2c2b;
  font-weight: 500;
`;

export default DetailContact;
