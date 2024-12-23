import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PanGestureHandler } from 'react-native-gesture-handler';

import * as Haptics from 'expo-haptics';

const AddItem = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [date, setDate] = useState(new Date());
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
        if (event.nativeEvent.translationY > 50) {
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
                {/* <View style={styles.modalOverlay}> */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalOverlay}>
                            <PanGestureHandler onEnded={handleGesture}>
                                {/* content for modal */}
                                <View style={styles.modalContent}>
                                    {/** @note: row 1
                                     * date picker
                                     * isNecessary
                                     */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap:3 }}>
                                        {/* date picker */}
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                            <TextInput
                                                style={styles.input}
                                                value={date.toDateString()}
                                                editable={false}
                                                placeholder={date.toDateString()}
                                            />
                                        </TouchableOpacity>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    setShowDatePicker(false);
                                                    if (selectedDate) setDate(selectedDate);
                                                }}
                                            />
                                        )}
                                        {/* necessary or not */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap:1 }}>
                                            <Text style={styles.label}>{isNecessary ? 'necessary' : 'not necessary'}</Text>
                                            <Switch value={isNecessary} onValueChange={setIsNecessary} />
                                        </View>
                                    </View>
                                    
                                </View>
                            </PanGestureHandler>
                        </View>
                    </TouchableWithoutFeedback>
                {/* </View> */}
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
    },
    modalContent: {
        // height: '80%',
        // width: '100%',
    },
    input: {

    },
    label: {

    }
});

export default AddItem;