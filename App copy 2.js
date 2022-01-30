import {
  VStack,
  HStack,
  Divider,
  Input,
  Button,
  FormControl,
  NativeBaseProvider,
  Center,
  Modal,
  Text,
  Icon,
  Heading,
  Stack,
  ScrollView,
  Radio,
  Content,
  View
} from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { Formik, Form } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.habitName) {
    errors.habitName = "Required";
  }

  return errors;
};

const App = () => {
  const [showModal, setShowModal] = useState(false);
  //const [recurrences, setRecurrence] = useState("0")

  const[submitSuccessful, setSubmitSuccessful] = useState(false)

  const formOfMeasure = useRef("1");
  //var habitName = ""

  const formikRef = useRef();

  //const submitSuccessful = useRef(false)

  //useEffect(() => {
  //  alert('useeffect')
  //}, [submitSuccessful]);


  const onSubmit = (data, action) => {
    //alert('submit')
    //console.log("submitting with ", data.formOfMeasurer.current);
    //action.resetForm({"habitName": ""})
    //action.resetForm();
    //formOfMeasure.current = "1";
    //habitName = "55555"
    //submitSuccessful.current = true;
    setSubmitSuccessful(true)
    setShowModal(false);
  };

  const handleClose = () => {
    this.formik.resetForm();
    //action.resetForm();
    habitName = ""
    formOfMeasure.current = "1";
    recurrence = "1"
    goal = "1"
    setShowModal(false);
  };

  const createHabit = (habitName) => ({
    text: habitName,
  });

  var counter = 1;
  var goalCounter = 1;
  


  return (
    <Formik
      innerRef={(p) => (this.formik = p)}
      initialValues={{
        habitName: "",
        recurrence: "1",
        //formOfMeasurement: "",
        formOfMeasure,
        goal: "1",
        habits: [],
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <VStack width="80%" space={4} style={{ marginTop: 100 }}>
          <Button onPress={() => setShowModal(true)}>New Habit</Button>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            closeOnOverlayClick={false}
            avoidKeyboard={true}
          >
            <Modal.Content maxWidth="400px">
              <Modal.Header backgroundColor="#ADD8E6">
                <Text color="#FFFFFF">Add a habit</Text>
              </Modal.Header>
              <Modal.Body>
                <FormControl isRequired isInvalid={"habitName" in errors}>
                  <FormControl.Label>Name of habit</FormControl.Label>
                  {console.log("errors", errors)}
                  <Input
                    onBlur={handleBlur("habitName")}
                    placeholder="Habit"
                    onChangeText={handleChange("habitName")}
                    value={values.habitName}
                    fontSize={15}
                  />
                  <FormControl.ErrorMessage>
                    {errors.habitName}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Divider my={2} />
                <Stack space={3} style={{ paddingTop: 0 }}>
                  <Text>Recurrence</Text>
                  <HStack space={3}>
                    <Input
                      onBlur={handleBlur("recurrence")}
                      placeholder=""
                      onChangeText={handleChange("recurrence")}
                      value={values.recurrence}
                      width={10}
                      fontSize={15}
                      height={9}
                      isReadOnly={true}
                    />
                    <Text>day/s</Text>
                    <TouchableOpacity
                      onPress={() => {
                        counter == 1 ? 1 : counter--;
                        setFieldValue("recurrence", counter.toString());
                      }}
                    >
                      <Image
                        source={require("./assets/minus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          marginLeft: 80,
                          //marginTop: 80
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        counter++;
                        setFieldValue("recurrence", counter.toString());
                      }}
                    >
                      <Image
                        source={require("./assets/plus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          marginLeft: 15,
                          //marginTop: -30,
                        }}
                      />
                    </TouchableOpacity>
                  </HStack>
                </Stack>
                <Divider my={2} />
                <Stack space={3} style={{ paddingTop: 0 }}>
                  <Text>Form of measurement</Text>
                  <HStack space={3} style={{ marginTop: -15 }}>
                    <Radio.Group
                      name="formOfMeasurement"
                      defaultValue={formOfMeasure.current}
                      accessibilityLabel="pick a size"
                      //value={formOfMeasure.current}
                      onChange={(nextValue) => {
                        formOfMeasure.current = nextValue;
                        //alert(formOfMeasure.current);
                      }}
                    >
                      <Stack
                        direction={{
                          base: "row",
                          sm: "row",
                        }}
                        alignItems="center"
                        space={4}
                        w="75%"
                        maxW="300px"
                      >
                        <Radio
                          value="1"
                          colorScheme="green"
                          size="sm"
                          my={1}
                          onChange={handleChange}
                          name="formOfMeasurement"
                          //onBlur={handleBlur("formOfMeasurement")}
                          //onPress={setFieldValue("formOfMeasurement", "1")}
                        >
                          Increment
                        </Radio>
                        <Radio
                          value="2"
                          colorScheme="green"
                          size="sm"
                          my={1}
                          onChange={handleChange}
                          name="formOfMeasurement"
                          //onBlur={handleBlur("formOfMeasurement")}
                          //onPress={setFieldValue("formOfMeasurement", "2")}
                        >
                          Timer
                        </Radio>
                      </Stack>
                    </Radio.Group>
                  </HStack>
                </Stack>

                <Divider my={2} />
                <Stack space={3} style={{ paddingTop: 0 }}>
                  <Text>Goal</Text>
                  <HStack space={3}>
                    <Input
                      onBlur={handleBlur("goal")}
                      placeholder=""
                      onChangeText={handleChange("goal")}
                      value={values.goal}
                      width={10}
                      fontSize={15}
                      height={9}
                      isReadOnly={true}
                    />
                    <Text>time/s</Text>
                    <TouchableOpacity
                      onPress={() => {
                        goalCounter == 1 ? 1 : goalCounter--;
                        setFieldValue("goal", goalCounter.toString());
                      }}
                    >
                      <Image
                        source={require("./assets/minus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          marginLeft: 80,
                          //marginTop: 80
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        goalCounter++;
                        setFieldValue("goal", goalCounter.toString());
                      }}
                    >
                      <Image
                        source={require("./assets/plus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          marginLeft: 15,
                          //marginTop: -30,
                        }}
                      />
                    </TouchableOpacity>
                  </HStack>
                </Stack>

                <Divider my={2} />
                <Button
                  onPress={() => {
                   /* setFieldValue("habits", [
                      ...values.habits,
                      createHabit(values.habitName),
                    ]);
                    setFieldValue("habitName","")
                    setShowModal(false) */
                    handleSubmit()
                    alert(submitSuccessful)
                    if (submitSuccessful) {
                      setFieldValue("habits", [
                        ...values.habits,
                        createHabit(values.habitName),
                      ]);
                      setFieldValue("habitName", "");
                      setShowModal(false);
                    }
                  }}
                  colorScheme="green"
                  width={125}
                  height={10}
                  style={{ marginTop: 15 }}
                >
                  Done
                </Button>
                <Button
                  onPress={handleClose}
                  colorScheme="red"
                  width={125}
                  height={10}
                  style={{ marginTop: -40, marginLeft: 150 }}
                >
                  Cancel
                </Button>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal.Content>
          </Modal>
          
          <ScrollView showsVerticalScrollIndicator={true}>
            {values.habits.map(({ text }, index) => (
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
        </VStack>
      )}
    </Formik>
  );
};

const Main = () => {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Main />
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595",
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595",
  },
  itemDescription: {
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
});
