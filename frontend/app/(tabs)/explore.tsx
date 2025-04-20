import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Item } from '@/types/types';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AddItem from './add';
import * as Haptics from 'expo-haptics';
import { useGetItems } from '@/services/useItems';
import { useItems } from '@/features/items/useItems';


export default function explore() {
  const { data: fetchedItems = [], isLoading, refetch } = useGetItems();

  const { items, loadItems } = useItems();

  useEffect(() => {
    // only load into Redux if lengths differ
    if (fetchedItems.length !== items.length) {
      loadItems(fetchedItems)
    }
  }, [fetchedItems, items, loadItems])

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, Item[]>>((groups, item) => {
      const d = parseISO(item.date.toString());
      let key = format(d, 'MM-dd-yyyy');
      if (isToday(d)) key = 'Today'
      else if (isYesterday(d)) key = 'Yesterday'

      groups[key] = groups[key] || []
      groups[key].push(item)
      return groups
    }, {})
  }, [items])
  
  // handle updating purchase items by passing item to add item modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItemModal = useCallback((item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [])

  const closeItemModal = useCallback(() => {
    setModalVisible(false);
    setSelectedItem(null);
    refetch();
  }, [])

  // function used to calculate total cost of purchases made on a single day
  const calculateTotalCost = useCallback((items: Item[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [])


  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>explore</Text>
      <FlatList
        data={Object.keys(groupedItems)}
        keyExtractor={(key) => key}
        renderItem={({ item: dateKey }) => {
          // const totalCost = calculateTotalCost(groupedItems[dateKey]);
          const dayItems = groupedItems[dateKey]

          return (
            <View style={styles.group}>
              {/* date header */}
              <View style={styles.dateHeaderGroup}>
                <Text style={styles.dateHeader}>{dateKey}</Text>
                <Text style={styles.dateHeader}>${calculateTotalCost(dayItems)}</Text>
              </View>
              {dayItems.map((purchase) => (
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
        onItemAdded={() => {
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