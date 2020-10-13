import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

export default function ItemList(props) {
  const renderItem = ({item}) => {
    return (
      <Card
        onPress={() =>
          props.navigation.navigate('DetailContact', {
            data: item,
          })
        }>
        <Name>{`${item.firstName} ${item.lastName}`}</Name>
      </Card>
    );
  };

  return (
    <Container>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Card = styled.TouchableOpacity`
  padding: 20px;
`;
const Name = styled.Text``;
const SeparatorStyled = styled.View`
  border-width: 0.37px;
  border-color: grey;
`;
