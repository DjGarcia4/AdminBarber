import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import {ClientSchema} from '../../App';

type FormProps = {
  modalVisible: boolean;
  client: ClientSchema;
  addNewClient: (date: ClientSchema) => void;
  clients: ClientSchema[];
  editClient: (clientItem: ClientSchema) => void;
  closeModal: () => void;
};

const Form = ({
  modalVisible,
  addNewClient,
  client,
  editClient,
  closeModal,
}: FormProps) => {
  const [idClient, setId] = useState(0);
  const [nameClient, setNameClient] = useState('');
  const [phoneClient, setPhoneClient] = useState('');
  const [priceClient, setPriceClient] = useState('');
  const [observationsClient, setObservationsClient] = useState('');
  const [date, setDate] = useState<ClientSchema['date']>(new Date());

  useEffect(() => {
    if (Object.keys(client).length > 0) {
      setId(client.id);
      setNameClient(client.nameClient);
      setPhoneClient(client.phoneClient);
      setPriceClient(client.priceClient.toString());
      setObservationsClient(client.observationsClient);
      setDate(client.date);
    }
  }, [client]);

  const handleDate = () => {
    if (!nameClient && !priceClient) {
      Alert.alert(
        'Falta Información',
        'Nombre del cliente y precio son obligatorios.',
      );
      return;
    }
    if (!nameClient) {
      Alert.alert('Nombre del Cliente', 'El nombre del cliente es obligatorio');
      return;
    }
    if (!priceClient) {
      Alert.alert('Precio', 'El precio es obligatorio');
      return;
    }

    const newClient = {
      id: 0,
      nameClient,
      phoneClient,
      priceClient: +priceClient,
      observationsClient,
      date,
    };

    if (idClient) {
      newClient.id = idClient;
      editClient(newClient);
    } else {
      newClient.id = Date.now();
      newClient.date = new Date();
      addNewClient(newClient);
    }

    closeModal();
    resetForm();
  };

  const resetForm = () => {
    setNameClient('');
    setPhoneClient('');
    setPriceClient('');
    setObservationsClient('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.containerX}>
            <Pressable
              onPress={() => {
                closeModal();
                resetForm();
              }}>
              <Text style={styles.x}>{idClient ? 'Cancelar' : 'Cerrar'}</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>
            {idClient ? 'Editar' : 'Núevo'}{' '}
            <Text style={styles.titleBold}>Corte</Text>
          </Text>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre del Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nameClient}
              onChangeText={setNameClient}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Teléfono <Text style={styles.labelOptional}>(Opcional)</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono del Cliente"
              keyboardType="number-pad"
              maxLength={8}
              value={phoneClient}
              onChangeText={setPhoneClient}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Precio</Text>
            <TextInput
              style={styles.input}
              placeholder="Precio del Corte"
              keyboardType="number-pad"
              value={priceClient}
              onChangeText={setPriceClient}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Observaciones del Corte{' '}
              <Text style={styles.labelOptional}>(Opcional)</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.observationsInput]}
              placeholder="Obervaciones"
              value={observationsClient}
              onChangeText={setObservationsClient}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnAddDate} onPress={handleDate}>
            <Text style={styles.btnAddDateText}>
              {idClient ? 'Guardar Cambios' : 'Agregar Corte'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
  containerX: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: '#666',
  },
  x: {
    fontSize: 15,
    fontWeight: '400',
    color: '#ef4444',
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#ef4444',
  },
  field: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    color: '#666',
  },
  labelOptional: {
    fontSize: 15,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 15,
    fontSize: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  observationsInput: {
    height: 100,
  },
  btnAddDate: {
    margin: 20,
    padding: 10,
    backgroundColor: '#ef4444',
    borderRadius: 10,
  },
  btnAddDateText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Form;
