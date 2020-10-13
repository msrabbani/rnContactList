import React, {useState, useEffect} from 'react';
import {Dimensions, Platform, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;

export default function ModalForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState('');
  const postApiContacts = async (firstName, lastName, age, photo) => {
    const dataContact = {
      firstName,
      lastName,
      age: Number(age),
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    // props.setIsLoading(true);
    await fetch('https://simple-contact-crud.herokuapp.com/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataContact),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == 'contact saved') {
          props.onBtnClose();
          props.updateSuccess();
          setFirstName('');
          setLastName('');
          setAge('');
          setPhoto('');
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <ModalStyled
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ModalBackground>
          <ModalContainer>
            <InputContainer>
              <Title>First Name</Title>
              <TextInputStyled
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
            </InputContainer>

            <InputContainer>
              <Title>Last Name</Title>
              <TextInputStyled
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </InputContainer>

            <InputContainer>
              <Title>Age</Title>
              <TextInputStyledAge
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType={'number-pad'}
              />
            </InputContainer>

            <InputContainer>
              <Title>Photo</Title>
            </InputContainer>
            <FooterWrapper>
              <ButtonStyled
                activeOpacity={0.3}
                underlayColor="darkgrey"
                onPress={() => props.onBtnClose()}>
                <ButtonText>{props.btnCancelText || 'Close'}</ButtonText>
              </ButtonStyled>
              <ButtonStyled
                activeOpacity={0.3}
                underlayColor="darkgrey"
                onPress={() =>
                  postApiContacts(firstName, lastName, age, photo)
                }>
                <ButtonText>{props.btnCancelText || 'Save'}</ButtonText>
              </ButtonStyled>
            </FooterWrapper>
          </ModalContainer>
        </ModalBackground>
      </KeyboardAvoidingView>
    </ModalStyled>
  );
}

const ModalStyled = styled.Modal`
  align-items: center;
`;
const ModalBackground = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;
const InputContainer = styled.View`
  width: 100%;
  padding: 10px;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-left: 5px;
  margin-bottom: 5px;
`;
const TextInputStyled = styled.TextInput`
  height: 35px;
  border-radius: 5px;
  padding: 0px 5px 0px 10px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000020;
  align-items: center;
`;

const TextInputStyledAge = styled(TextInputStyled)`
  width: 15%;
  padding: 5px 5px 5px 10px;
`;

const ModalContainer = styled.View`
  width: 90%;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
`;

const FooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
`;

const ButtonStyled = styled.TouchableHighlight`
  width: 150px;
  height: 30px;
  background-color: #dddddd;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text``;
