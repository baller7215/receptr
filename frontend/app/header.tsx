import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import Add from './(tabs)/add';

/**@todo: look into implementing hapticfeedback for buttons */

/**
 * Header Component
 *
 * @param {string} title - The title to display in the header.
 */
const Header = ({ title, }: { title?: string; }) => {
    const handleButtonPress = async (action: string) => {
        await Haptics.selectionAsync(); // Trigger haptic feedback
        console.log(action);
    };

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    return (
        <SafeAreaView style={[styles.safeArea]} edges={['top']}>
            <View style={[styles.header]}>
                <Text style={styles.logo}>receptr</Text>
                <View style={[styles.iconContainer]}>
                    {/* <Ionicons.Button
                        name="search-outline"
                        size={12}
                        color="#FEFEFA"
                        backgroundColor="rgba( 51, 51, 51, 0.90 )"
                        onPress={() => Haptics.selectionAsync()}
                    ></Ionicons.Button> */}
                    {/* <Link href="/addModal" asChild>
                        <Pressable>
                            <Avatar
                                size="medium"
                                rounded
                                icon={{name: 'search-outline', color: '#FEFEFA', size: 30, type: 'ionicon'}}
                                // onPress={() => handleButtonPress('Search button clicked')}
                                activeOpacity={0.7}
                            />
                        </Pressable>
                        
                    </Link> */}
                    <Avatar
                        size="medium"
                        rounded
                        icon={{name: 'search-outline', color: '#FEFEFA', size: 30, type: 'ionicon'}}
                        // onPress={() => handleButtonPress('Search button clicked')}
                        onPress={() => setIsAddModalVisible}
                        activeOpacity={0.7}
                    />
                    <Add visible={isAddModalVisible} onClose={() => setIsAddModalVisible} />
                    <Avatar
                        size="medium"
                        rounded
                        icon={{name: 'barcode-outline', color: '#FEFEFA', size: 30, type: 'ionicon'}}
                        onPress={() => handleButtonPress('Scan button clicked')}
                        activeOpacity={0.7}
                    />
                    <Avatar
                        size="medium"
                        rounded
                        icon={{name: 'person-circle-outline', color: '#FEFEFA', size: 30, type: 'ionicon'}}
                        onPress={() => handleButtonPress('avatar button clicked')}
                        activeOpacity={0.7}
                    />
                </View>

            </View>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#010101', // Same as the header background color
    },
    header: {
        height: 'auto',
        backgroundColor: '#010101',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        // paddingBottom: 5,
        justifyContent: 'space-between',
    },
    logo: {
        color: '#FEFEFA',
        fontFamily: 'Montserrat',
        fontSize: 30,
        fontWeight: 'bold'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 0
    }
    // title: {
    //     color: '#fff',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     fontFamily: 'Montserrat'
    // },
});

export default Header;
