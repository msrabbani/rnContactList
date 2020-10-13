import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {
  Loading,
  ItemList,
  SearchBar,
  ButtonAdd,
  ModalForm,
} from '../components';

function ContactList(props) {
  const [contacts, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  console.log(contacts, 'contacts');

  const apiGetContacts = async () => {
    setIsLoading(true);
    await fetch('https://simple-contact-crud.herokuapp.com/contact')
      .then((res) => res.json())
      .then(({data}) => {
        setContact(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    setTimeout(apiGetContacts, 500);
  }, []);
  return (
    <Container>
      <SearchBar />
      {isLoading && <Loading />}
      <ItemList data={contacts} {...props} />
      <ButtonWrapper>
        <ButtonAdd
          text={'+'}
          onPress={() => setModalAddVisible(!modalAddVisible)}
        />
      </ButtonWrapper>
      <ModalForm
        visible={modalAddVisible}
        onBtnClose={() => {
          setModalAddVisible(!modalAddVisible);
        }}
        updateSuccess={() =>
          setTimeout(() => {
            apiGetContacts();
          }, 500)
        }
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;
const TextStyled = styled.Text``;
const ButtonWrapper = styled.View`
  position: absolute;
  top: 95%;
  left: 75%;
`;

export default ContactList;
