import React, { useState ,useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { 
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
 } from 'react-native';

import api from '../Services/api';

function SpotsList( { tech, navigation } ) {

    const [spots, setSpots] = useState([]);


    useEffect(() => { 
        //Carregar todos os Sports passando o parametro 'tech' 
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            }) 
            setSpots(response.data);
        }
        loadSpots(); //iniciar a função
     }, [])

    function handleNavigation(id) {
        navigation.navigate('Book', { id } );
    }

    return (
        <View style={styles.container }>
            <Text style={styles.title}>Empresa que usam <Text style={styles.bold}>{tech}</Text></Text>

            {/* Criar a lista com as tecnologias passadas */}
            <FlatList 
              style={styles.list}  
              data={spots}
              keyExtractor={spot => spot._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>
                    <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                        <Text style={styles.buttonText}> Solicitar Reserva </Text>
                    </TouchableOpacity>
                </View>
              )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: { 
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: { 
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 5,
    },
    buttonText: { 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default withNavigation(SpotsList);