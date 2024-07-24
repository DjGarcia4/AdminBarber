import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {ClientSchema} from '../../App';

type ClientProps = {
  item: ClientSchema;
  deleteClient: (id: ClientSchema['id']) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setClient: React.Dispatch<React.SetStateAction<ClientSchema>>;
  handleDetailsClientModal: (clientItem: ClientSchema) => void;
};

const Client = ({
  item,
  deleteClient,
  setModalVisible,
  setClient,
  handleDetailsClientModal,
}: ClientProps) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleEditClient = () => {
    setModalVisible(true);
    setClient(item);
  };
  const handleDeleteClient = () => {
    Alert.alert(
      'Cancelar Corte',
      '¿Estas seguro que quieres cancelar este corte?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => deleteClient(item.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitlePrice}>
        <Pressable onPress={() => handleDetailsClientModal(item)}>
          <Text style={styles.name}>{item.nameClient}</Text>
        </Pressable>
        <Text style={styles.price}>{item.priceClient} HNL</Text>
      </View>
      <Text style={styles.date}>{formatDate(new Date(item.date))}</Text>
      <Text style={styles.observations}>{item.observationsClient}</Text>
      <View style={styles.containerBtns}>
        <Pressable
          style={[styles.btn, styles.cancel]}
          onPress={handleDeleteClient}>
          <Text style={styles.btnText}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.edit]}
          onPress={() => handleEditClient()}>
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.start]}>
          <Text style={styles.btnText}>Iniciar Corte</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginVertical: 10,
  },
  containerTitlePrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  observations: {
    color: '#374151',
    fontSize: 20,
    marginVertical: 10,
  },
  date: {
    fontSize: 13,
    color: '#9ca3af',
  },
  price: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 25,
  },
  containerBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 5,
    // padding: 10,
  },
  btn: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#ffffff',
  },
  cancel: {
    backgroundColor: '#ef4444',
  },
  edit: {
    backgroundColor: '#eab308',
  },
  start: {
    backgroundColor: '#3b82f6',
  },
});

export default Client;
