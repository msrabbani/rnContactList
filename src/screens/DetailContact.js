import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {Loading, ModalForm} from '../components';

function DetailContact({navigation, route}) {
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const {id} = route.params.data;
  const [dataContact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const defaultImg = require('../assets/images/dp_default.jpeg');

  const apiDeleteContact = async (i) => {
    console.log(i, 'delete');
    await fetch('https://simple-contact-crud.herokuapp.com/contact/' + i, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        if (res.message == 'contact deleted') {
          Alert.alert('Contact has been delete!', [
            {text: 'OK', onPress: () => navigation.navigate('ContactList')},
          ]);
        } else {
          Alert.alert('Oops!', 'Please try again later!', [
            {text: 'OK', onPress: () => navigation.navigate('ContactList')},
          ]);
        }
      });
  };

  const apiGetContact = async (id) => {
    console.log(id, 'yeah');
    setIsLoading(true);
    await fetch('https://simple-contact-crud.herokuapp.com/contact/' + id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        if (res.message == 'Get Contact by id') {
          console.log('ok');
          setIsLoading(false);
          setContact(res.data);
        } else {
          console.log('ops');
          setIsLoading(false);
          Alert.alert('Oops!', res.message, [
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

  useEffect(() => {
    apiGetContact(id);
  }, []);
  console.log(isLoading, 'isloadiiiing');

  return (
    <Container>
      {isLoading && <Loading />}
      <Header />
      <ImageStyled
        source={
          dataContact.photo == 'N/A' || !dataContact.photo
            ? defaultImg
            : {uri: dataContact.photo}
        }
      />
      <Body>
        <TextStyled>
          {dataContact.firstName} {dataContact.lastName}
        </TextStyled>
        <DetailWrapper>
          <ContactInfo>
            <TextDetail>First Name </TextDetail>
            <TextDetailValue>: {dataContact.firstName}</TextDetailValue>
          </ContactInfo>
          <ContactInfo>
            <TextDetail>Last Name </TextDetail>
            <TextDetailValue>: {dataContact.lastName}</TextDetailValue>
          </ContactInfo>
          <ContactInfo>
            <TextDetail>Age </TextDetail>
            <TextDetailValue>: {dataContact.age}</TextDetailValue>
          </ContactInfo>
        </DetailWrapper>
      </Body>
      <Footer>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() => setModalAddVisible(!modalAddVisible)}>
          <ButtonText>{'Edit'}</ButtonText>
        </ButtonStyled>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() =>
            onPressDelete(
              dataContact.id,
              dataContact.firstName,
              dataContact.lastName,
            )
          }>
          <ButtonText>{'Delete'}</ButtonText>
        </ButtonStyled>
        <ButtonStyled
          activeOpacity={0.3}
          underlayColor="#BDC3C7"
          onPress={() => navigation.goBack()}>
          <ButtonText>{'Close'}</ButtonText>
        </ButtonStyled>
      </Footer>
      <ModalForm
        visible={modalAddVisible}
        data={dataContact}
        onBtnClose={() => {
          setModalAddVisible(!modalAddVisible);
        }}
        updateSuccess={() => apiGetContact(id)}
      />
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
