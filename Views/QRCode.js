import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Alert,
  Platform,
  StatusBar,
  Dimensions, Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {URL_API_ONLINE} from '../conf';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const overlayColor = 'rgba(0,0,0,0)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'rgba(255,255,255,0.71)';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persone_name: 'John Doe',
      message: 'Aucun client scanné',
      response_code: 0,
      modalVisible: false,
      animation: require('../assets/91878-bouncy-fail.json'),
    };
  }

  onSuccess = e => {
    this.scan(e.data);
  };
  scan = e_data => {
    try {
      const qr_code_data = JSON.parse(e_data);
      if (
        !(
          qr_code_data.uuid == null &&
          qr_code_data.nom &&
          null &&
          qr_code_data.prenom == null
        )
      ) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: this.props.token,
          },
          body: JSON.stringify({message: 'message'}),
        };
        fetch(
          `${URL_API_ONLINE}/client/scan/${qr_code_data.uuid}`,
          requestOptions,
        )
          .then(response => {
            this.setState({response_code: response.status});
            return response.json();
          })
          .then(data => {
            if (this.state.response_code === 200) {
              const client = data.client;
              const scan_count = parseInt(client.scan_count) - 1;
              const person_name = `${client.last_name.toUpperCase()} ${
                client.first_name
              }`;
              if (scan_count >= 1) {
                this.setState({
                  message: `A déjà été scanné ${scan_count} fois`,
                  person_name,
                  animation: require('../assets/65549-yellow-alert.json'),
                });
              } else {
                this.setState({
                  message: 'A été scanné !',
                  person_name,
                  animation: require('../assets/99516-vmc-check.json'),
                });
              }
            } else if (this.state.response_code === 401) {
              this.setState({
                message: "Le client n'est pas dans la base de données",
                person_name: undefined,
                animation: require('../assets/91878-bouncy-fail.json'),
              });
            } else {
              this.setState({
                message: 'Une erreur est survenu, veuillez réessayer',
                person_name: undefined,
                animation: require('../assets/65549-yellow-alert.json'),
              });
            }
          });
      } else {
        this.setState({
          message: "Le QR Code n'est pas valide.",
          person_name: undefined,
          animation: require('../assets/91878-bouncy-fail.json'),
        });
      }
    } catch (error) {
      this.setState({
        message: "Le QR Code n'est pas valide.",
        person_name: undefined,
        animation: require('../assets/91878-bouncy-fail.json'),
      });
    }
    this.showModal();
  };
  showModal = _ => {
    this.setState({modalVisible: true});
  };
  buttonCloseModal = _ => {
    this.setState({modalVisible: !this.state.modalVisible});
    this.scanner.reactivate();
  };

  render() {
    return (
      <SafeAreaProvider style={styles.centeredView}>
        <StatusBar barStyle={'light-content'} />
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          bottomContent={
            <View style={styles.bottomContent}>
              <Pressable
                onPressOut={_ => {
                  this.props.log_out();
                }}
                style={{
                  borderRadius: 30,
                  backgroundColor: '#ea4f4f',
                  padding: 5,
                  marginBottom: 50,
                }}>
                <Text style={{color: 'white'}}>Déconnexion</Text>
              </Pressable>
            </View>
          }
          cameraStyle={styles.cameraContainer}
          customMarker={
            <View style={styles.topOverlay}>
              <Image
                source={require('../assets/airshowAffiche.png')}
                style={{
                  width: 70,
                  height: 35,
                  marginBottom: 5,
                  marginTop: 70,
                }}
              />
              <Text style={{fontSize: 30, color: 'white'}}>VAS SCANNER</Text>
              <View style={styles.rectangle} />
            </View>
          }
          showMarker={true}
          markerStyle={styles.markerStyle}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <LottieView
                style={{position: 'relative', left: 0}}
                height={SCREEN_HEIGHT * 0.15}
                width={SCREEN_WIDTH * 0.15}
                source={this.state.animation}
                autoPlay
                loop={false}
              />
              <Text style={styles.modalName}>{this.state.person_name}</Text>
              <Text style={styles.modalText}>{this.state.message}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.buttonCloseModal}>
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topContent: {
    height: 700,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    top: 50,
    backgroundColor: 'rgba(12,12,12,0.53)',
  },
  bottomContent: {
    height: 200,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    bottom: 50,
    backgroundColor: 'rgba(12,12,12,0.53)',
  },
  signOutButton: {
    borderRadius: 30,
    backgroundColor: '#ea4f4f',
    padding: 15,
    color: '#ffffff',
    margin: 40,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    maxHeight: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderRadius: 30,
    padding: 15,
    color: '#ffffff',
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#00508B',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
  },
  modalName: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    opacity: 0.8,
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
  markerStyle: {
    borderColor: '#ffffff',
    borderStyle: 'dashed',
    borderWidth: 3,
    opacity: 0.5,
    width: 100,
    height: 100,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    marginTop: SCREEN_HEIGHT * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },
});

export default ScanScreen;
