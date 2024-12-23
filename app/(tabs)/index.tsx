import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Haptics from 'expo-haptics';

const AddItem = ({ visible, onClose, onSubmit }: { visible: boolean, onClose: () => {}, onSubmit: () => {} }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [isNecessary, setIsNecessary] = useState(false);
    const [setshowDatePicker, setSetshowDatePicker] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    return (
        <Modal
            isOpen={visible}
            onClose={onClose}
            useRNModal={true}
            style={[styles.modal]}
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                </ModalHeader>
                <ModalBody />
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modal: {
        
    }
});

export default AddItem;