import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import api from '../services/api';
import useListMacs from '../hooks/useListMacs';

const Details = ({ route, navigation }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();

  const { id } = route.params;

  const { getList } = useListMacs();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await api.get(`/products/${id}`);

    if (response) {
      const { data: { name, price, amount } } = response;

      setName(name);
      setPrice(price);
      setAmount(amount);
    }
  };

  const handleSubmit = async () => {
    const data = { name: name, price: String(price), amount: String(amount) };

    const response = await api.patch(`/products/${id}`, data);

    if (response) {
      await getList();

      Alert.alert("Atualizado com sucesso");

      navigation.navigate("List");
    } else {
      Alert.alert("Erro ao atualizar");
    }
  };

  const RenderInput = (label, type, value, changeText) => {
    return (
      <InputContent>
        <Label>{label}</Label>
        <Input
          textContentType={type}
          keyboardType={type}
          value={String(value)}
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
          <DescriptionSection>Edite os detalhes do seu produto</DescriptionSection>
          <ContainerList>
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

export default Details;