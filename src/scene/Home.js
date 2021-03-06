import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ActivityIndicator } from 'react-native'
import List from "../component/List";
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal";
import Button from "../component/Button";
import Toast from 'react-native-simple-toast'
import { connect } from 'react-redux';
import { getData } from "../state/actions/Action";



const Home = (props) => {

    useEffect(() => {
        getDatass()
        // props.dispatch(getData())
    }, [])

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [addContacts, setaddContacts] = useState({})


    const getDatass = () => {
        setLoading(true)
        axios.get(`https://simple-contact-crud.herokuapp.com/contact`)
            .finally(() => setLoading(false))
            .then(res =>
                setData(res.data.data)
            )
    }

    const addContact = () => {
        setLoading(true)
        axios.post(`https://simple-contact-crud.herokuapp.com/contact`,
            {
                "firstName": addContacts.firstName,
                "lastName": addContacts.lastName,
                "age": parseInt(addContacts.age),
                "photo": addContacts.photo
            })
            .finally(() => setLoading(false))
            .then(res =>
                Toast.show(res.data.message)
            )
    }

    const toggleModal = () => {
        setModalEdit(!modalEdit);
    };

    const handleName = (key, v) => {
        const data = { ...addContacts }
        data[key] = v
        setaddContacts(data)
    }

    return (
        <View style={{ ...styles.container }}>
            <ImageBackground source={require('../assets/Background.png')} resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }}>
                {
                    loading ?
                        <ActivityIndicator
                            visible={loading}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        :
                        <List data={data}
                            refresh={() => getData()}
                            loading={loading}
                        />
                }
                <TouchableOpacity
                    style={{ ...styles.addBtn }}
                    onPress={() => setModalEdit(true)}
                >
                    <Icon name="plus" size={20} color='#FFF' />
                </TouchableOpacity>


                <Modal
                    isVisible={modalEdit}
                    animationIn='slideInDown'
                    animationOutTiming={1000}
                    animationInTiming={1000}
                >
                    <View style={{ ...styles.modalContainer }}>
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Text style={{ fontSize: 18, color: '#000000', fontWeight: 'bold' }}>
                                Add Contact
                            </Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <TextInput
                                placeholder="First Name"
                                style={{ ...styles.input }}
                                onChangeText={(v) => handleName('firstName', v)}
                            />
                            <TextInput
                                placeholder="Last Name"
                                style={{ ...styles.input }}
                                onChangeText={(v) => handleName('lastName', v)}
                            />
                            <TextInput
                                placeholder="Age"
                                style={{ ...styles.input }}
                                onChangeText={(v) => handleName('age', v)}
                            />
                            <TextInput
                                placeholder="Photo"
                                style={{ ...styles.input }}
                                onChangeText={(v) => handleName('photo', v)}
                            />
                        </View>

                        <View style={{ ...styles.containerBtn }}>
                            <Button title='Cancel' style={{ flex: 1, backgroundColor: '#D3D3D3', }} text={{ ...styles.textBtn }} onPress={() => toggleModal()} />
                            <View style={{ ...styles.line }} />
                            <Button title='Submit' style={{ flex: 1, }} text={{ ...styles.textBtn }} onPress={() => { addContact(), toggleModal() }} />
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textTitle: {
        fontSize: 30,
        color: '#000000',
        fontWeight: '800',
        marginTop: 10
    },
    input: {
        borderRadius: 10,
        height: 40,
        color: '#778899',
        borderWidth: 1,
        marginTop: 10
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 55,
        backgroundColor: '#D3D3D3'

    },
    line: {
        borderWidth: 1,
        height: 40,
        borderColor: '#A9A9A9',
        backgroundColor: '#A9A9A9',
        alignSelf: 'center'
    },
    textBtn: {
        fontSize: 20,
        fontWeight: '700'
    },
    addBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#FF8C00',
        position: 'absolute',
        bottom: 35,
        right: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        height: 300,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },
    spinnerTextStyle: {
        color: '#000',
    },
})


const mapStateToProps = state => {
    return {
        getDatas: state.data.data
    }
}

export default connect(mapStateToProps)(Home)