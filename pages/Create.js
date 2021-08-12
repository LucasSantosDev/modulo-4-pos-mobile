import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import api from '../services/api';
import useListMacs from '../hooks/useListMacs';

const Create = ({ navigation }) => {
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();

  const { getList } = useListMacs();

  const handleSubmit = async () => {
    const data = {
      photo: String(photo),
      name: name,
      price: String(price),
      amount: String(amount)
    };

    const response = await api.post('/products', data);

    if (response) {
      await getList();

      Alert.alert("Cadastrado com sucesso");

      navigation.navigate("List");
    } else {
      Alert.alert("Erro ao cadastrar");
    }
  };

  const RenderInput = (label, type, value, changeText) => {
    return (
      <InputContent>
        <Label>{label}</Label>
        <Input
          textContentType={type}
          keyboardType={type}
          value={value ? String(value) : ""}
          onChangeText={(text) => changeText(text)}
        />
      </InputContent>
    );
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      <View>
        <ContainerSection>
          <TitleSection>{name}</TitleSection>
          <DescriptionSection>Cadastre os detalhes do seu produto</DescriptionSection>
          <ContainerList>
            {RenderInput("Url Imagem", "default", photo, setPhoto)}
            {RenderInput("Nome", "default", name, setName)}
            {RenderInput("Preço", "default", price, setPrice)}
            {RenderInput("Quantidade", "numeric", amount, setAmount)}
            <Button title="Salvar" onPress={() => handleSubmit()} />
          </ContainerList>
        </ContainerSection>
      </View>
    </ScrollView>
  );
}

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
   margin-bottom: 8px;
`;

const ContainerList = styled.View`
  width: 100%;
  margin-top: 10px;
`;

const InputContent = styled.View`
  margin-bottom: 18px;
`;

const Label = styled.Text`
  background: white;
  color: #333;
  font-size: 13px;
  position: absolute;
  top: -8px;
  left: 10px;
  z-index: 1;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 15px 10px;
  border-radius: 5px;
`;

export default Create;