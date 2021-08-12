import { useState } from 'react';
import constate from 'constate';
import api from '../services/api'

const [ListMacsProvider, useListMacs] = constate(() => {
  const [listItems, setListItems] = useState([]);

  const getList = async () => {
    const response = await api.get('/products');

    if (response?.data) {
      const { data } = response;

      setListItems(data);
    }
  };

  return {
    listItems,
    setListItems,
    getList,
  };
});

export { ListMacsProvider };

export default useListMacs;
