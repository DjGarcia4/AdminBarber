import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import Form from './src/components/form';
import Client from './src/components/client';
import ClientDetails from './src/components/clientDetails';

export type ClientSchema = {
  id: number;
  nameClient: string;
  phoneClient: string;
  priceClient: number;
  observationsClient: string;
  date: Date;
};

// Inicializar el estado del cliente con valores por defecto
export const defaultClient: ClientSchema = {
  id: 0,
  nameClient: '',
  phoneClient: '',
  priceClient: 0,
  observationsClient: '',
  date: new Date(),
};

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalClient, setModalClient] = useState(false);
  const [clients, setClients] = useState<ClientSchema[]>([]);
  const [client, setClient] = useState<ClientSchema>(defaultClient);

  const newDateHandler = () => {
    setModalVisible(true);
  };

  const addNewClient = (clientItem: ClientSchema) => {
    setClients(prevClients => {
      const updatedClients = [...prevClients, clientItem];
      return updatedClients;
    });
  };

  const editClient = (clientItem: ClientSchema) => {
    const clientsUpdate = clients.map(item =>
      item.id === clientItem.id ? clientItem : item,
    );
    setClients(clientsUpdate);
    setClient(defaultClient);
  };

  const deleteClient = (id: ClientSchema['id']) => {
    setClients(prevClients => {
      const updatedClients = prevClients.filter(date => date.id !== id);
      return updatedClients;
    });
  };
  const closeModal = () => {
    setModalVisible(false);
    setClient(defaultClient);
  };
  const closeModalClientDetails = () => {
    setModalClient(false);
    setClient(defaultClient);
  };

  const handleDetailsClientModal = (clientItem: ClientSchema) => {
    setModalClient(true);
    setClient(clientItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Administrador de Cortes {''}{' '}
        <Text style={styles.titleBold}>Barberia</Text>
      </Text>
      <Pressable style={styles.btnNewDate} onPress={newDateHandler}>
        <Text style={styles.btnNewDateTitle}>Nuevo Corte</Text>
      </Pressable>
      {clients.length === 0 ? (
        <Text style={styles.noClients}>No hay Cortes aún</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={clients}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <Client
                item={item}
                deleteClient={deleteClient}
                setModalVisible={setModalVisible}
                setClient={setClient}
                handleDetailsClientModal={handleDetailsClientModal}
              />
            );
          }}
        />
      )}
      <Form
        modalVisible={modalVisible}
        client={client}
        clients={clients}
        closeModal={closeModal}
        addNewClient={addNewClient}
        editClient={editClient}
      />
      <ClientDetails
        modalClient={modalClient}
        closeModalClientDetails={closeModalClientDetails}
        client={client}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: '#9ca3af',
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#ef4444',
  },
  btnNewDate: {
    margin: 20,
    padding: 10,
    backgroundColor: '#ef4444',
    borderRadius: 10,
  },
  btnNewDateTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noClients: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#9ca3af',
  },
  list: {
    marginHorizontal: 20,
    padding: 5,
  },
});

export default App;
