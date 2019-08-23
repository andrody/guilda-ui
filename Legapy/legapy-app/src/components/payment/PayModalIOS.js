import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

export default class PayModalIOS extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Modal isVisible={this.props.visibleModal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.h1}>{this.props.product.title}</Text>
                        <Text>{'\n'}Esta firma garantiza a las leyes {this.props.product.description.toLowerCase()}.{'\n\n'}</Text>
                        <Text>El pago se cobrará en su cuenta de Itunes al confirmar la compra.{'\n\n'}</Text>
                        <Text>La firma se renovará automáticamente a menos que desactive la renovación automática al menos 24 horas antes de la fecha de vencimiento en la configuración de la aplicación.{'\n\n\n'}
                        </Text>
                        <Text>Precio: {this.props.product.localizedPrice}</Text>
                        <View style={styles.actionsView}>
                            <TouchableOpacity onPress={() => this.props.onContinue()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Comprar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.onCancel()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#022e54',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    actionsView: {
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
    },
})
