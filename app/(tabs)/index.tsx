import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Haptics from 'expo-haptics';

export default function HomeScreen() {

    return (
        <View style={styles.mainContainer}>

        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#010101',
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 10
    }
});
