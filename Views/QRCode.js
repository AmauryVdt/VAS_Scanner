import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {URL_API_ONLINE} from '../conf';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Aucun client scanné',
      response_code: 0,
    };
  }
  onSuccess = e => {
    setTimeout(_ => {
      this.scanner.reactivate();
    }, 2000);
    this.scan(e.data);
  };
  scan = e_data => {
    try {
      const qr_code_data = JSON.parse(e_data);
      console.log('nom', qr_code_data.nom);
      console.log('prenom', qr_code_data.prenom);
      console.log('uuid', qr_code_data.uuid);
      if (!(qr_code_data.uuid == null && qr_code_data.nom && null && qr_code_data.prenom == null)) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.token,
          },
          body: JSON.stringify({message: 'message'}),
        };
        fetch(`${URL_API_ONLINE}/client/scan/${qr_code_data.uuid}`, requestOptions)
          .then(response => {
            this.setState({response_code: response.status});
            return response.json();
          })
          .then(data => {
            if (this.state.response_code === 200) {
              const client = data.client;
              console.log(`${client.last_name.toUpperCase()} ${client.first_name} ${Number(client.scan_count) > 1 ? `a déjà été scanné ${Number(client.scan_count) - 1} fois ❌` : 'a été scanné ✅'}`);
              this.setState({
                message: `${client.last_name.toUpperCase()} ${client.first_name} ${Number(client.scan_count) > 1 ? `a déjà été scanné ${Number(client.scan_count) - 1} fois ❌` : 'a été scanné ✅'}`
              });
            } else if (this.state.response_code === 401) {
              this.setState({
                message: "Le client n'est pas dans la base de données ❌",
              });
            } else {
              this.setState({
                message: 'Une erreur est survenu, veuillez réessayer ⚠️',
              });
            }
          });
      } else {
        this.setState({
          message: "Le QR Code n'est pas valide ❌️",
        });
      }
    } catch (error) {
      this.setState({
        message: "Le QR Code n'est pas valide ❌️",
      });
    }
  };

  render() {
    return (
      <SafeAreaProvider style={styles.centeredView}>
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>Scannez le QR code du client </Text>
          }
          bottomContent={
            <View>
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Appuyer pour scanner</Text>
              </TouchableOpacity>
              <Text style={{textAlign: 'center'}}>{this.state.message}</Text>
            </View>
          }
        />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    textAlign: 'center',
  },
});

export default ScanScreen;
