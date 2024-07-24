import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {ClientSchema} from '../../App';

type ClienteDetailsProps = {
  modalClient: boolean;
  closeModalClientDetails: () => void;
  client: ClientSchema;
};

const {height: windowHeight} = Dimensions.get('window');

const ClientDetails = ({
  modalClient,
  closeModalClientDetails,
  client,
}: ClienteDetailsProps) => {
  return (
    <Modal animationType="slide" visible={modalClient} transparent={true}>
      <View style={styles.modalBackground}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.containerX}>
            <Pressable
              onPress={() => {
                closeModalClientDetails();
              }}>
              <Text style={styles.x}>Cerrar</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>
            Detalles del <Text style={styles.titleBold}>Corte</Text>
          </Text>
          <View style={styles.containerClient}>
            <Text style={styles.name}>{client.nameClient}</Text>
            <Text style={styles.price}>{client.priceClient} HNL</Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '100%',
    height: windowHeight * 0.6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  containerX: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  x: {
    fontSize: 15,
    fontWeight: '400',
    color: '#ef4444',
    marginTop: 10,
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: '#666',
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#ef4444',
  },
  containerClient: {
    padding: 20,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#22c55e',
  },
});

export default ClientDetails;
