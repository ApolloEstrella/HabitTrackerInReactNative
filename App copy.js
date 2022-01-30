import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import {
  Button as Btn,
  Text as Txt,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  //Modal,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import settings from "./assets/settings.jpg";

import {
  Button,
  Text,
  Modal,
  FormControl,
  Input,
  Center,
  useTheme,
  NativeBaseProvider,
} from "native-base";

const createQuestion = () => ({
  text: "",
});

/*
 * Form for submitting a bunch of questions
 * */
var hobbyId = 0;
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [settings, showSettings] = useState(false);
  const [myHabit, setHabit] = useState("");

  const createQuestion = () => ({
    text: "",
  });
  var hobbyName = "";

  nameChange = (e) => {
    this.hobbyName = e.nativeEvent.text;
  };

  const onPress = (counter) => {
    return counter + 1;
  };
  //setHabit("walking");
  return (
    <>
      <Button style={styles.button} onPress={() => setShowModal(true)}>
        Add Habit
      </Button>
      <Formik
        initialValues={{
          questions: [],
          nameOfHabit: "",
          frequency: "",
          recurrence: "0",
          formOfMeasurement: "I",
          goal: "0",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View style={{ paddingTop: 100 }}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Add a habit</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>Name of habit</FormControl.Label>
                    <Input
                      id="nameOfHabit"
                      onChange={handleChange("nameOfHabit")}
                      onBlur={handleBlur("nameOfHabit")}
                      value={values.nameOfHabit}
                    />
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Frequency</FormControl.Label>
                    <Input
                      id="frequency"
                      onChange={handleChange("frequency")}
                      onBlur={handleBlur("frequency")}
                      value={values.frequency}
                    />
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Recurrence</FormControl.Label>
                    <Input
                      id="recurrence"
                      onChange={handleChange("recurrence")}
                      onBlur={handleBlur("recurrence")}
                      value={values.recurrence}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Form of measurement </FormControl.Label>
                    <Input
                      id="formOfMeasurement"
                      onChange={handleChange("formOfMeasurement")}
                      onBlur={handleBlur("formOfMeasurement")}
                      value={values.formOfMeasurement}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Goal </FormControl.Label>
                    <Input
                      id="goal"
                      onChange={handleChange("goal")}
                      onBlur={handleBlur("goal")}
                      value={values.goal}
                    />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button
                      onSubmit={() => {
                        handleSubmit;
                        setShowModal(false);
                        //hobbyId = hobbyId + 1;
                        //</Button.Group>setFieldValue("questions", [
                        //  ...values.questions,
                        //</Modal.Footer>  { id: 14344, text: this.nameOfHabit, counter: 0 },
                        //]);
                      }}
                    >
                      <Text>Done</Text>
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={true}>
              {values.questions.map(({ text, id, counter }, index) => (
                <View
                  key={index}
                  style={{
                    //width: width * 0.9,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "flex-end",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    borderBottomColor: "#6E5BAA",
                    borderBottomWidth: 1,
                    width: "100%",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.circle}>{counter}</Text>

                  <Text style={styles.itemDescription}>{text}</Text>

                  <TouchableOpacity onPress={() => alert("fdfd")}>
                    <Image
                      source={require("./assets/settings.jpg")}
                      style={{ width: 45, height: 45, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>

                // <TextInput
                //   key={index}
                //   onChangeText={handleChange(`questions[${index}].text`)}
                //   onBlur={handleBlur(`questions[${index}].text`)}
                //   value={values.questions[index].text}
                //   style={styles.corners1}
                // />
              ))}
            </ScrollView>
          </View>
        )}
      </Formik>
    </>
  );
};

//export default App;
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <App />
      </Center>
    </NativeBaseProvider>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#ffffff",
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#6E5BAA",
    paddingTop: 20,
  },
  chatContainer: {
    flex: 11,
    justifyContent: "center",
    alignItems: "stretch",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6E5BAA",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  sendContainer: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  sendLabel: {
    color: "#ffffff",
    fontSize: 15,
  },
  input: {
    width: "100%",
    color: "#555555",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    //height: "100%",
    borderColor: "#6E5BAA",
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: "center",
    backgroundColor: "#ffffff",
  },
  corners1: {
    borderRadius: 5,
    backgroundColor: "#73AD21",
    padding: 20,
    width: 300,
    height: 50,
    marginBottom: 10,
  },
  imageAction: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: "contain",
    paddingBottom: 35,
    flexDirection: "row",
  },
  imageAction2: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: "contain",
    paddingBottom: 35,
    //flexDirection: 'row'
  },
  itemDescription: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    backgroundColor: "#1AA7EC",
    textAlign: "center",
    paddingTop: 10,
    //marginLeft: 100,
  },
  // styling the image
  image: {
    width: 10,
    height: 10,
    borderRadius: 1000,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    marginTop: 200,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
