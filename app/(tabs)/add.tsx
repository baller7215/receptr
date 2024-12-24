import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';

import * as Haptics from 'expo-haptics';

const AddItem = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [date, setDate] = useState<Date>();
    const [price, setPrice] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [isNecessary, setIsNecessary] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    // for handling swiping down to close modal
    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationY > 10) {
            console.log('close modal');
            onClose();
            // visible = false;
            
        }
    };

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <SafeAreaView style={{ flex: 1 }}>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <KeyboardAvoidingView behavior="padding">
                                    <PanGestureHandler onEnded={handleGesture}>
                                        {/* <> */}
                                            <View style={{ width: '70%', height: 5, borderRadius: 100, backgroundColor: '#FEFEFA80', marginHorizontal: 'auto', marginBottom: 20 }}></View>
                                        {/* </> */}
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
                                            <View style={[styles.inputContainer, { width: '100%' }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginRight: 'auto' }}>
                                                    <Ionicons
                                                        name={"text-outline"}
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    />
                                                    <TextInput
                                                        inputMode='text'
                                                        placeholder='brocoli'
                                                        placeholderTextColor='#33333330'
                                                        style={styles.input}
                                                        value={itemName}
                                                        onChangeText={setItemName}
                                                    />
                                                </View>
                                                <Text style={[styles.label, { marginRight: 'auto', marginHorizontal: 0 }]}>item name</Text>
                                            </View>
                                        </View>

                                        {/* row 3: price */}
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            padding: 0,
                                        }}>
                                            <View style={[styles.inputContainer, { width: '100%' }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto' }}>
                                                    <Fontisto
                                                        name="dollar"
                                                        color={"#33333390"}
                                                        size={24}
                                                        style={{ marginVertical: 'auto' }}
                                                    />
                                                    <TextInput
                                                        inputMode='numeric'
                                                        placeholder='0.00'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, { fontSize: 80 }]}
                                                        value={price}
                                                        onChangeText={setPrice}
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
                                            <View style={[styles.inputContainer, { width: '100%' }]}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginHorizontal: 'auto' }}>
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
                                                        maxLength={10}
                                                        inputMode='text'
                                                        placeholder='add description...'
                                                        placeholderTextColor='#33333330'
                                                        style={[styles.input, { fontSize: 16 }]}
                                                        value={description}
                                                        onChangeText={setDescription}
                                                    />
                                                </View>
                                                <Text style={[styles.label]}>description</Text>
                                            </View>
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
        backgroundColor: '#FF70A6',
        // flex: 1,
        // justifyContent: 'flex-end',
        height: '80%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalContent: {
        // height: '80%',
        // width: '100%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#33333320',
        padding: 7,
        borderRadius: 10,
        marginBottom: 10
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
        width: 'auto',
        maxWidth: '90%'
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