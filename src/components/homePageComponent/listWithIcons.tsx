import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using Material Icons for icons
import {
  LargeCategoryName,
  getCategoryLargeEnumValueByString,
} from '../../redux/utils';

export interface Item {
  id: number;
  text: string;
  iconName: string;
}

interface Props {
  items: Item[];
  navigation?: any;
  handleClick?: any;
}

const ListItem: React.FC<{
  item: Item;
  navigation: any;
  handleButtonClick: any;
}> = ({item, navigation, handleButtonClick}) => (
  <View style={styles.itemContainer}>
    <Pressable onPress={() => handleButtonClick(item)}>
      <View style={styles.item}>
        <Icon name={item.iconName} size={24} color="black" />
        <Text style={styles.text}>
          {LargeCategoryName[item.text as keyof typeof LargeCategoryName]}
        </Text>
      </View>
    </Pressable>
  </View>
);

const ListWithIcons: React.FC<Props> = ({items, navigation, handleClick}) => (
  <View style={styles.container}>
    {items.map(item => (
      <ListItem
        key={item.id}
        item={item}
        navigation={navigation}
        handleButtonClick={handleClick}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: '45%', // Adjust as needed
    backgroundColor: 'rgba(103, 80, 164, 0.25)',
    marginBottom: 56,
    borderRadius: 8,
    height: 56,
  },
  item: {
    height: 56,
    width: 136,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 10,
    color: 'black',
  },
});

export default ListWithIcons;
