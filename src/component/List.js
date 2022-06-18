import React, { useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, FlatList, Alert, TextInput } from 'react-native';
import Button from "./Button";
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast'

const List = (props) => {

    const data = [...props.data]
    const [modalEdit, setModalEdit] = useState(false)
    const [editName, setEditName] = useState({})
    const [indeks, setIndex] = useState(0)


    const deleteContact = (id) => {
        axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
            .then(res =>
                console.log(res.data, 'deletes')
            )
    }

    const editContact = (id) => {
        axios.put(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
            "firstName": editName.firstName,
            "lastName": editName.lastName,
            "age": parseInt(editName.age),
            "photo": editName.photo
        })
            .then(res =>
                Toast.show(res.data.message)
            )
    }

    const toggleModal = () => {
        setModalEdit(!modalEdit);
    };

    const handleChange = (key, v) => {
        const data = { ...editName }
        data[key] = v
        setEditName(data)
    }

    const alertDelete = (id) => {
        Alert.alert('', 'are you sure to delete this contact ?', [
            {
                text: 'cancel',
                type: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => deleteContact(id)
            }
        ])
    }


    const renderItem = (item, index) => {
        const items = item.item
        const id = items.id

        return (
            <View style={{ ...styles.container }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: items.photo }}
                        style={{ ...styles.image }}
                        resizeMode={'contain'}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 15, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                {items.firstName}
                            </Text>
                            <Text style={{ marginLeft: 5 }}>
                                {items.lastName}
                            </Text>
                        </View>
                        <Text>
                            age :  {items.age}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', margin: 5, }}>
                    <Button style={{ ...styles.btn }} title='Edit' onPress={() => { setModalEdit(true), setIndex(item.index) }} />
                    <Button style={{ ...styles.btn, backgroundColor: '#ff0000', marginTop: 5, height: 25 }} title='Hapus' text={{ color: '#fff' }} onPress={() => alertDelete(id)} />
                </View>
            </View>
        )
    }

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onRefresh={props.refresh}
                refreshing={props.loading}
            />

            <Modal
                isVisible={modalEdit}
                animationIn='slideInDown'
                animationOutTiming={1000}
                animationInTiming={1000}
            >
                <View style={{ backgroundColor: '#fff', height: 300, borderTopRightRadius: 12, borderTopLeftRadius: 12 }}>
                    <View style={{ alignItems: 'center', paddingTop: 15 }}>
                        <Text style={{ fontSize: 18, color: '#000000', fontWeight: 'bold' }}>
                            Edit Contact
                        </Text>
                    </View>
                    <View style={{ padding: 10, }}>
                        <TextInput
                            placeholder="First Name"
                            style={{ ...styles.input }}
                            onChangeText={(v) => handleChange('firstName', v)}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={{ ...styles.input }}
                            onChangeText={(v) => handleChange('lastName', v)}
                        />
                        <TextInput
                            placeholder="Age"
                            style={{ ...styles.input }}
                            onChangeText={(v) => handleChange('age', v)}
                            keyboardType='number-pad'
                        />
                        <TextInput
                            placeholder="Photo"
                            style={{ ...styles.input }}
                            onChangeText={(v) => handleChange('photo', v)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 55, backgroundColor: '#D3D3D3' }}>
                        <Button title='Cancel' style={{ flex: 1, backgroundColor: '#D3D3D3', }} text={{ fontSize: 20, fontWeight: '700' }} onPress={() => toggleModal()} />
                        <View style={{ borderWidth: 1, height: 40, borderColor: '#A9A9A9', backgroundColor: '#A9A9A9', alignSelf: 'center' }} />
                        <Button title='Submit' style={{ flex: 1, }} text={{ fontSize: 20, fontWeight: '700' }} onPress={() => { editContact(data[indeks]?.id), toggleModal() }} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderColor: '#778899'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    btn: {
        borderWidth: 1,
        width: 50,
        borderRadius: 13,
        height: 25
    },
    input: {
        borderRadius: 10,
        height: 40,
        color: '#778899',
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#778899'
    },


})
export default List;
