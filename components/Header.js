import React from 'react';
import styled from 'styled-components/native';

const Header = () => {
  return (
    <HeaderCustom source={{ uri: 'https://papers.co/wallpaper/papers.co-ak48-apple-shop-newyork-cartier-city-29-wallpaper.jpg' }}>
      <HeaderText>iDev</HeaderText>
    </HeaderCustom>
  );
}

const HeaderCustom = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  font-family: 'Arial';
  font-size: 70px;
  font-weight: bold;
  color: #fff;
  padding-top: 80px;
`;

export default Header;