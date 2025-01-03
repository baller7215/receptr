import React, { useState } from 'react';
import axios from 'axios';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as Haptics from 'expo-haptics';
import { AddItemProps, Item } from '@/types/types';
// import { REACT_NATIVE_DEV_API_URL } from 'expo-env';
// import { REACT_NATIVE_API_URL } from '@env';

const AddItem = ({ visible, onClose, onItemAdded }: AddItemProps) => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const [date, setDate] = useState<Date>();
    const [price, setPrice] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [isNecessary, setIsNecessary] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    // for handling swiping down to close modal
    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationY > 100) {
            console.log('close modal');
            onClose();
            // visible = false;
            
        }
    };

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    // console.log('api url', apiUrl);

    // for handling focus on input
    const handleFocus = (inputName: string) => {
        setFocusedInput(inputName);
    };

    const addItem = async (itemData: Omit<Item, 'id'>): Promise<Item> => {
        try {
            const formattedDate = date ? date.toISOString().split('T')[0] : null;
            const formattedItemData = {
                ...itemData,
                date: formattedDate,
                price: parseFloat(parseFloat(price).toFixed(2)),
                description: description || null,
            }
            console.log(formattedItemData);
            console.log(apiUrl);
            const response = await axios.post(`${apiUrl}/items/`, formattedItemData);
            console.log('item added successfully', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    }

    const handleSubmit = async () => {
        if (!date || !price || !itemName || !quantity) {
            setValidationMessage('please fill in all fields.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }

        setValidationMessage('');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        const itemData: Omit<Item, 'id'> = {
            item_name: itemName,
            date: date,
            price: parseFloat(price),
            description: description,
            quantity: parseInt(quantity),
            necessary: isNecessary
        };

        // console.log('new item', itemData);

        try {
            const addedItem = await addItem(itemData);
            console.log('item added:', addedItem);
            setItemName('');
            setDate(new Date());
            setPrice('');
            setDescription('');
            setQuantity('');
            setIsNecessary(false);

            if (onItemAdded) {
                onItemAdded(addedItem);
            }
            handleClose();
        } catch (error) {
            setValidationMessage('error adding item. please try again.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    }

    const handleClose = () => {
        setFocusedInput(null);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <SafeAreaView style={{ flex: 1 }}>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <TouchableWithoutFeedback onPress={handleClose}>
                        <View style={[styles.modalOverlay, focusedInput ? { height:'95%' } : { height: 'auto' }]}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                                    <PanGestureHandler onEnded={handleGesture}>
                                        <View style={styles.handle}></View>
                                    </PanGestureHandler>
                                    {/* content for modal */}
                                    <ScrollView style={styles.modalContent}>
                                        {/* <View style={{ position: 'absolute', width: '70%', height: 5, borderRadius: 100, backgroundColor: '#FEFEFA80', marginHorizontal: 'auto', marginBottom: 20 }}></View> */}
                                        {/** @note: row 1
                                         * date picker
                                         * isNecessary
                                         */}
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 0,
                                        }}>
                                            {/* date picker */}
                                            {/* <TouchableOpacity onPress={() => {console.log('tapped'); setShowDatePicker(true)}}>
                                                <TextInput
                                                    style={styles.input}
                                                    value={date.toDateString()}
                                                    editable={false}
                                                    placeholder={date.toDateString()}
                                                />
                                            </TouchableOpacity> */}
                                            {/* {showDatePicker && ( */}
                                            <View style={[styles.inputContainer, { 
                                                width: '55%', 
                                                backgroundColor: '#70D6FFC0'
                                                // backgroundColor: date ? '#60D394' : '#33333320'
                                            } ]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto' }}>
                                                    <Ionicons
                                                        name={"calendar-number-outline"}
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    />
                                                    <Text style={styles.label}>date</Text>
                                                </View>
                                                
                                                <DateTimePicker
                                                    style={styles.datePicker}
                                                    value={date ? date : new Date()}
                                                    mode="date"
                                                    display="default"
                                                    maximumDate={new Date()}
                                                    onChange={(event, selectedDate) => {
                                                        // setShowDatePicker(false);
                                                        if (selectedDate) setDate(selectedDate);
                                                    }}
                                                />
                                            </View>
                                            {/* necessary or not */}
                                            <View style={[styles.inputContainer, {
                                                width: '40%', 
                                                backgroundColor: '#FF70A6C0'
                                                // backgroundColor: isNecessary ? '#60D394' : '#FF453A80' 
                                            }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto' }}>
                                                    <Text style={styles.label}>necessary</Text>
                                                    <Ionicons
                                                        name={"alert-circle-outline"}
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    />
                                                </View>
                                                <Switch style={{ justifyContent: 'flex-end', display: 'flex', marginHorizontal: 'auto' }} value={isNecessary} onValueChange={setIsNecessary} />
                                            </View>
                                        </View>
                                        
                                        {/** @todo: add tags */}

                                        {/* row 2: item name, quantity */}
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 0,
                                        }}>
                                            <View style={[styles.inputContainer, { width: '60%', backgroundColor: 'transparent', borderWidth: 0 }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginRight: 'auto' }}>
                                                    {/* <Ionicons
                                                        name={"text-outline"}
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    /> */}
                                                    <TextInput
                                                        inputMode='text'
                                                        placeholder='broccoli'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, focusedInput === 'itemName' && styles.inputFocused]}
                                                        value={itemName}
                                                        onChangeText={setItemName}
                                                        onFocus={() => handleFocus('itemName')}
                                                    />
                                                </View>
                                                <Text style={[styles.label, { marginRight: 'auto', marginHorizontal: 0 }]}>item name</Text>
                                            </View>
                                            <View style={[styles.inputContainer, { width: '35%', backgroundColor: 'transparent', borderWidth: 0, marginLeft: 'auto' }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginLeft: 'auto' }}>
                                                    {/* <Ionicons
                                                        name={"text-outline"}
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    /> */}
                                                    <TextInput
                                                        inputMode='numeric'
                                                        placeholder='1'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, focusedInput === 'quantity' && styles.inputFocused, { marginLeft: 'auto', textAlign: 'right', width: '70%' }]}
                                                        value={quantity}
                                                        onChangeText={setQuantity}
                                                        onFocus={() => handleFocus('quantity')}
                                                    />
                                                </View>
                                                <Text style={[styles.label, { marginLeft: 'auto', marginHorizontal: 0 }]}>quantity</Text>
                                            </View>
                                        </View>

                                        {/* row 3: price */}
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 0,
                                        }}>
                                            <View style={[styles.inputContainer, { width: '100%', backgroundColor: 'transparent', borderWidth: 0, gap: 8 }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto', justifyContent: 'center', width: '100%', borderBottomWidth: 1, }}>
                                                    <Fontisto
                                                        name="dollar"
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    />
                                                    <TextInput
                                                        inputMode='decimal'
                                                        placeholder='0.00'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, focusedInput === 'price' && styles.inputFocused, { fontSize: 80 }]}
                                                        value={price}
                                                        onChangeText={setPrice}
                                                        onFocus={() => handleFocus('price')}
                                                    />
                                                </View>
                                                <Text style={[styles.label]}>price</Text>
                                            </View>
                                        </View>

                                        {/* row 4: description */}
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 0,
                                        }}>
                                            <View style={[styles.inputContainer, { width: '100%', backgroundColor: 'transparent', borderWidth: 0, gap: 8 }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto', justifyContent: 'center', width: '100%', borderBottomWidth: 1, }}>
                                                    {/* <Fontisto
                                                        name="dollar"
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    /> */}
                                                    <TextInput
                                                        editable
                                                        multiline
                                                        numberOfLines={3}
                                                        maxLength={150}
                                                        inputMode='text'
                                                        placeholder='add description...'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, focusedInput === 'description' && styles.inputFocused, { fontSize: 20, width: '100%', textAlign: 'center' }]}
                                                        value={description}
                                                        onChangeText={setDescription}
                                                        onFocus={() => handleFocus('description')}
                                                    />
                                                </View>
                                                <Text style={[styles.label]}>description</Text>
                                            </View>
                                        </View>

                                        {/* submit button */}
                                        {/* Add this inside your ScrollView, at the end */}
                                        <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#60D394',
                                                    paddingVertical: 12,
                                                    paddingHorizontal: 30,
                                                    borderRadius: 20,
                                                    alignItems: 'center',
                                                }}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
                                            </TouchableOpacity>
                                            {validationMessage ? (
                                                <Text style={{ color: '#FF453A', marginTop: 10 }}>{validationMessage}</Text>
                                            ) : null}
                                        </View>
                                    </ScrollView>
                                </KeyboardAvoidingView>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: '#FEFEFA',
        flex: 1,
        // justifyContent: 'flex-end',
        height: '95%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    handle: {
        width: '60%',
        height: 5,
        borderRadius: 100,
        backgroundColor: '#33333350',
        marginHorizontal: 'auto',
        marginBottom: 20
    },
    modalContent: {
        // height: '80%',
        // width: '100%',
        // backgroundColor: '#FF70A6',
        // flex: 0
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#33333320',
        padding: 7,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 10,
    },
    datePicker: {
        // marginLeft: -10,
        marginLeft: '10%',
        marginRight: 'auto',
        // marginHorizontal: 'auto',
        color: '#010101',
        backgroundColor: 'transparent',
        alignSelf: 'stretch'
    },
    input: {
        marginTop: 'auto',
        fontSize: 24,
        fontFamily: 'Montserrat',
        color: '#333333',
        // width: '100%',
        // width: 'auto',
        // maxWidth: '90%'
    },
    inputFocused: {
        backgroundColor: '#33333330'
    },
    label: {
        marginVertical: 'auto',
        marginHorizontal: 'auto',
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#33333390',
    }
});

export default AddItem;