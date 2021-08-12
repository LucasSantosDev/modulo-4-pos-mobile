import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../components/Header';
import styled from 'styled-components/native';
import useListMacs from '../hooks/useListMacs';

const imageEditButton = require('../assets/edit.png');

const imageAddButton = require('../assets/add.png');

const List = ({ navigation }) => {
  const { listItems, getList } = useListMacs();

  const toDetails = (id) => {
    navigation.navigate('Details', { id: id });
  };

  const toCreate = () => {
    navigation.navigate('Create');
  };

  useEffect(() => {
    getList();
  }, []);

  const renderItem = ({ id, name, photo, price, amount }) => {
    return (
      <ContainerItem key={name}>
        <ImageProduct source={{ uri: photo }} />
        <DetailsSection>
          <EditButton onPress={() => toDetails(id)}>
            <IconButton source={imageEditButton} />
          </EditButton>
          <TitleItem>{name}</TitleItem>
          <PriceItem>R$ {price}</PriceItem>
          <AmountItem>Quantidade Disponível: {amount}</AmountItem>
        </DetailsSection>
      </ContainerItem>
    );
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      <View>
        <ContainerSection>
          <CreateButton onPress={toCreate}>
            <IconButton source={imageAddButton} />
          </CreateButton>
          <TitleSection>Lista de MacBooks</TitleSection>
          <DescriptionSection>
            Somente na loja iDev você encontra Macs com preços totalmente normais,
            confira nossa lista!
          </DescriptionSection>
          <ContainerList>
            {listItems.map(renderItem)}
          </ContainerList>
        </ContainerSection>
      </View>
    </ScrollView>
  );
};

const ContainerSection = styled.View`
  margin-top: 32px;
  padding: 0 24px;
`;

const TitleSection = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #000;
`;

const DescriptionSection = styled.Text`
   font-size: 18px;
   font-weight: 400;
   color: #000;
   margin-top: 8px;
`;

const ContainerList = styled.View`
  width: 100%;
  margin-top: 10px;
`;

const ContainerItem = styled.View`
  width: 100%;
  height: 300px;
  border: 1px solid #666;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  background: #edf0f2;
`;

const ImageProduct = styled.Image`
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

const DetailsSection = styled.View`
  width: 100%;
  justify-content: center;
`;

const CreateButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -60px;
  right: 25px;
`;

const EditButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -40px;
  right: 5px;
`;

const IconButton = styled.ImageBackground`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 35px;
`;

const TitleItem = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

const PriceItem = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #d7821a;
`;

const AmountItem = styled.Text`
  font-size: 15px;
  font-weight: 200;
  color: #9b9b9b;
`;

export default List;
