import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Item } from '@/types/types';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AddItem from './add';
import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';


export default function explore() {
  const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;
  
  // const [items, setItems] = useState<Item[]>([]);
  const [groupedItems, setGroupedItems] = useState<Record<string, Item[]>>({});

  // method to fetch items from db
  const fetchItems = async (): Promise<void> => {
    try {
      console.log('using api base url:', apiUrl);
      console.log('full url:', `${apiUrl}/items/`);
      const response = await axios.get(`${apiUrl}/items/`);
      console.log('items fetched successfully', response.data);
      
      const itemsList: Item[] = response.data.sort((a: Item, b: Item) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      console.log('items list', itemsList);

      const grouped = groupItemsByDate(itemsList);
      console.log('grouped', grouped);
      setGroupedItems(grouped);
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };

  // helper function to sort items by date so they are grouped together
  const groupItemsByDate = (items: Item[]): Record<string, Item[]> => {
    return items.reduce((groups: Record<string, Item[]>, item) => {
      const date = parseISO(item.date.toString());
      let dateKey = format(date, 'MM-dd-yyyy');

      if (isToday(date)) dateKey = 'Today';
      else if (isYesterday(date)) dateKey = 'Yesterday';

      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
  
      return groups;
    }, {});
  }

  useEffect(() => {
    fetchItems();
  }, []);


  // function used to calculate total cost of purchases made on a single day
  const calculateTotalCost = (items: Item[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
  }

  
  // handle updating purchase items by passing item to add item modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItemModal = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  const closeItemModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    fetchItems();
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>explore</Text>
      <FlatList
        data={Object.keys(groupedItems)}
        keyExtractor={(key) => key}
        renderItem={({ item: dateKey }) => {
          const totalCost = calculateTotalCost(groupedItems[dateKey]);

          return (
            <View style={styles.group}>
              {/* date header */}
              <View style={styles.dateHeaderGroup}>
                <Text style={styles.dateHeader}>{dateKey}</Text>
                <Text style={styles.dateHeader}>${totalCost}</Text>
              </View>
              {groupedItems[dateKey].map((purchase) => (
                <TouchableOpacity
                  key={purchase.id}
                  style={styles.purchaseItem}
                  onPress={() => openItemModal(purchase)}
                >
                  {/* main content */}
                  <View>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                      <Text style={styles.itemName}>{purchase.item_name}</Text>
                      {purchase.necessary ? 
                        <Ionicons
                          name={"checkmark-outline"}
                          color={"#60D394"}
                          size={20}
                          style={{ marginVertical: 'auto', marginLeft: 'auto' }}
                        />
                        :
                        <Feather
                          name="x"
                          color={"#FF453A"}
                          size={20}
                          style={{ marginVertical: 'auto', marginLeft: 'auto' }}
                        />
                      }
                    </View>
                    {purchase.description &&
                      <Text style={styles.itemText}>{purchase.description}</Text>
                    }
                  </View>
                  
                  {/* price */}
                  <View>
                    <Text style={styles.itemPrice}>${purchase.price}</Text>
                    <Text style={[styles.itemPrice, { fontSize: 14 }]}>x{purchase.quantity}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
        }}
      />

      {/* modal */}
      <AddItem
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onItemAdded={(updatedItem) => {
          closeItemModal();
        }}
        item={selectedItem}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1B1B1B',
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 20,
  },
  header: {
    color: '#FEFEFA',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 10,
  },
  group: {
    paddingTop: 10,
    paddingBottom: 10
  },
  dateHeaderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  dateHeader: {
    marginBottom: 5,
    color: '#FEFEFA70',
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
  },
  purchaseItem: {
    backgroundColor: '#333333',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 5,
  },
  itemName: {
    fontFamily: 'Montserrat',
    color: '#FEFEFA',
    fontSize: 18,
    fontWeight: 600,
  },
  itemText: {
    fontFamily: 'Inter',
    color: '#FEFEFA70',
    fontSize: 14,
    fontWeight: 300,
  },
  itemPrice: {
    fontFamily: 'JetBrainsMono',
    color: '#FEFEFA',
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 'auto'
  }
})