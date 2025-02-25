import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ICustomSearchbar {
  data: any[];
  setFiltered: (data: any[]) => void;
}

const CustomSearchbar = ({ data, setFiltered }: ICustomSearchbar) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFiltered(data);
    } else {
      setFiltered(
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }

  return (
    <Searchbar
      placeholder="Buscar"
      onChangeText={handleSearch}
      value={searchQuery}
      style={styles.barStyles}
      iconColor={Colors.border}
    />
  )
}

export default CustomSearchbar;

const styles = StyleSheet.create({
  barStyles: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12
  }
});
