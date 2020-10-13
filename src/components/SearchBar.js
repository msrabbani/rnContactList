import React from 'react';
// import Icon from 'react-native-vector-icons/dist/Fontisto';
import styled from 'styled-components/native';

const SearchBar = ({text, onPress, onChangeText, value}) => {
  return (
    <ContainerSB>
      <TextinputWrapperSB>
        <TextinputStyleSB
          placeholder="Search contact"
          underlineColorAndroid="transparent"
          maxLength={25}
          onChangeText={onChangeText}
          value={value}
        />
        <UrutkanWrapperSB onPress={onPress}>
          <UrutkanTextSB
            numberOfLines={1}
            ellipsizeMode={'head'}
            allowFontScaling={false}>
            {text}
          </UrutkanTextSB>
          {/* <Icon name="angle-down" size={13} color={'orange'} /> */}
        </UrutkanWrapperSB>
      </TextinputWrapperSB>
    </ContainerSB>
  );
};

const ContainerSB = styled.View`
  align-items: center;
  justify-content: center;
`;
const TextinputWrapperSB = styled.View`
  flex-direction: row;
  width: 95%;
  background-color: #ffff;
  border-radius: 5px;
  margin-vertical: 10px;
`;
const TextinputStyleSB = styled.TextInput`
  width: 60%;
  font-size: 15px;
  margin-left: 10px;
  padding: 10px;
`;
const UrutkanWrapperSB = styled.TouchableOpacity`
  width: 40%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const UrutkanTextSB = styled.Text`
  width: 60%;
  margin-right: 3px;
  color: orange;
  font-weight: 600;
  text-align: center;
`;

export default SearchBar;
