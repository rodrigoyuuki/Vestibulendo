import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomCheckbox = ({ label, onValueChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        const novoValor = !isChecked;
        setIsChecked(novoValor);
        if (onValueChange) {
            onValueChange(novoValor);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
                {isChecked && (
                    <Icon name="checkmark-sharp" size={18} color="white" />
                )}
            </View>
            <View style={styles.labelContainer}>
                {typeof label === "string" ? (
                    <Text style={styles.label}>{label}</Text>
                ) : (
                    label
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#A31C32',
        borderColor: '#A31C32',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        flex: 1,
        color: '#A31C32',
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default CustomCheckbox;