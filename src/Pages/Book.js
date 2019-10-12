import React, { useState } from 'react';
import asyncStorage from '@react-native-community/async-storage';
import { 
    SafeAreaView, 
    TouchableOpacity, 
    Text, 
    TextInput, 
    StyleSheet,
    Alert,
} from 'react-native';

import api from '../Services/api';

export default function Book( { navigation } ) {

    const [date, setDate] = useState('');
    const id = navigation.getParam('id'); //id da tecnologia selecionada

    // Ação para envio do dados do formulário
    // Para criar uma reserva necessita o envio do id do usuário logado e a tecnoogia selecionada
    async function handleSubmit() {
        const user_id = await asyncStorage.getItem('user');

        await api.post(`/spots/${id}/Bookings`, {
            date
        },{
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>{date}</Text>
            <Text style={styles.label}>Data de Interesse *</Text>
            <TextInput 
                style={styles.input}
                placeholder='Qual data você quer reservar?'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.buttom}>
                <Text style={styles.textButtom}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.buttom, styles.cancelButtom]}>
                <Text style={styles.textButtom}>Cancelar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginTop: 20,
        marginBottom: 8,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 8,
    },
    buttom: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    textButtom: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButtom: {
        backgroundColor: '#ccc',
        fontWeight: 'bold',
        fontSize: 16,
    },
});