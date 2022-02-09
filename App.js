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
  View,
  Box,
  Pressable,
  Avatar,
  Spacer,
  SimpleGrid,
  Column,
  Flex,
  Circle,
  useMediaQuery,
} from "native-base";
import React, { useState, useRef, useEffect, useReducer } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  //ScrollView,
} from "react-native";
import { Formik, Form, useFormik } from "formik";
import * as SQLite from "expo-sqlite";

/* var db = SQLite.openDatabase(
  "My1stdb.db",
  "1.0",
  "my first database",
  2 * 1024 * 1024
);
db.transaction(function (tx) {
  tx.executeSql("CREATE TABLE IF NOT EXISTS foo (id unique, text)");
  //tx.executeSql('INSERT INTO foo (id, text) VALUES (3, "synergies888")');
  //tx.executeSql('insert into foo (id, text) values (4, "testme888")');
  tx.executeSql("SELECT * FROM foo", [], function (tx, results) {
    var len = results.rows.length,
      i;
    for (i = 0; i < len; i++) {
      alert(results.rows.item(i).text + " Row: " + i);
    }
  });
}); */

/* const db1 = SQLite.openDatabase(
  "HabitTracker",
  1,
  null,
  null,
  (e) => {
    console.log(e);
  }
); */

/* db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS foo (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)"
  );
  tx.executeSql('INSERT INTO foo (text) VALUES ("synergies")');
  tx.executeSql('insert into foo (text) values ( "testme")');
  tx.executeSql('INSERT INTO foo (text) VALUES ( "8888")');
  tx.executeSql('insert into foo (text) values ( "77777")');
  tx.executeSql("SELECT * FROM foo", [], function (tx, results) {
    var len = results.rows.length,
      i;
    for (i = 0; i < len; i++) {
      // alert(results.rows.item(i).text + " Row: " + i);
    }
  });
}); */

deviceHeight = Dimensions.get("window").height;

//Create a database
/* db.transaction(
  (tx) => {
    tx.executeSql(
      'CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
    );
  },
  (error) => {
    console.log(error);
   },
   (success) => {
    console.log('success');
  } 
); */

/* const dbPath = "/database/"
const dbName = "HabitTracker.db"

let db = SQLite.openDatabase(dbPath + dbName,
  null,
  null,
  null,
  (e) => {
    console.log();
  }
); 

function err(a) {

  alert('err')
} 

function success(a) {
  alert("success");
}; 

function query2() {
  const q = 'CREATE TABLE contacts (contact_id INTEGER PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,phone TEXT NOT NULL UNIQUE'
  return q
}

const r = 'CREATE TABLE contacts (contact_id INTEGER PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,phone TEXT NOT NULL UNIQUE'

*/

//const query = 'INSERT INTO TestTable (id, data) VALUES (1, "abc")';
//    //"CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)";

// Check if the items table exists if not create it
// db.transaction(r, err, success)

//db.exec()
const db = SQLite.openDatabase("e:\\database\\habitTracker.db");
var counter = 1;
var goalCounter = 1;
const App = () => {
  const formikProps = useFormik({
    initialValues: {
      id: 0,
      habitName: "",
      recurrence: "1",
      formOfMeasurement: "1",
      goal: "1",
      habits: [],
    },
    validate,
    onSubmit: onSubmit,
  });

  const [settings, setSettings] = useState(false);
  const [measurement, setMeasurement] = useState("1");

  function validate(values) {
    const errors = {};
    if (!formikProps.values.habitName) {
      errors.habitName = "Required";
    }
    return errors;
  }

  function onSubmit(values) {
    //alert('submit')
    //console.log("submitting with ", data.formOfMeasurer.current);
    //action.resetForm({"habitName": ""})
    //action.resetForm();
    //formOfMeasure.current = "1";
    //habitName = "55555"
    //submitSuccessful.current = true;

    const insertSql =
      "INSERT INTO habit(habitName,recurrence,formOfMeasurement,goal) VALUES ('" +
      values.habitName +
      "'," +
      values.recurrence +
      "," +
      values.formOfMeasurement +
      "," +
      values.goal +
      ")";

    //const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

    /* db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)"
      );
    }), */

    /* db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM habit", [], function (tx, results) {
        })
      }) */

    /* db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)"
      );
    }),
              tx.executeSql(
            insertSql,
            [],
            function (tx, res) {
              var id = res.insertId;
            }
          ),
        tx.executeSql("SELECT * FROM habit", [], function (tx, results) {
            var len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              //alert(results.rows.item(i).habitName + " Row: " + i);
            }
          }) 
      }); */

    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)"
      ),
        tx.executeSql(
          insertSql,
          [],
          function (tx, results) {
            var id = results.insertId;
            formikProps.setFieldValue("habits", [
              ...formikProps.values.habits,
              createHabit(
                id,
                values.habitName,
                values.recurrence,
                values.formOfMeasurement,
                values.goal
              ),
            ]);
            console.log("success");
          },
          function (e) {
            console.log("error");
          }
        );
    });

    counter = 1;
    goalCounter = 1;

    setSubmitSuccessful(true);
    formikProps.setFieldValue("habitName", "");
    formikProps.setFieldValue("recurrence", "1");
    formikProps.setFieldValue("formOfMeasurement", "1");
    formikProps.setFieldValue("goal", "1");
    setShowModal(false);
  }

  const [showList, setShowList] = useState(false);

  const [showModal, setShowModal] = useState(false);
  //const [recurrences, setRecurrence] = useState("0")

  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  const formOfMeasure = useRef("1");
  //var habitName = ""

  const formikRef = useRef();

  //const submitSuccessful = useRef(false)

  const [edit, setEdit] = useState({});

  var editedValue;

  const loadEdit = (editId) => {
    /* setEdit((edit) => ({
      ...edit,
      ...editedValue,
    })); */
    //const editedValue = formikProps.values.habits.find(x => x.id === id)
    // myArray.find(x => x.id === '45')
    // editedValue = formikProps.values.habits.find((x) => x.id === editId);
    //var lookup = {};
    //for (var i = 0; formikProps.values.habits.length < i ; i++) {
    //  lookup[formikProps.values.habits[i].id] = formikProps.values.habits[i];
    //}

    const editedValue = formikProps.values.habits[editId - 1];

    formikProps.setFieldValue("id", editedValue.id);
    formikProps.setFieldValue("recurrence", editedValue.recurrence.toString());
    formikProps.setFieldValue("habitName", editedValue.habitName);
    //formikProps.setFieldValue(
    //  "formOfMeasurementGroup.defaultValue",
    //  editedValue.formOfMeasurement.toString()
    //);
    setMeasurement(editedValue.formOfMeasurement.toString());
    formikProps.setFieldValue("goal", editedValue.goal.toString());
    //formikProps.setFieldValue("formOfMeasurement", "2");
  };

  const handleClose = () => {
    //formikProps.resetForm();
    //action.resetForm();
    habitName = "";
    formOfMeasure.current = "1";
    recurrence = "1";
    goal = "1";
    counter = 1;
    goalCounter = 1;
    formikProps.setFieldValue("id", 0);
    formikProps.setFieldValue("recurrence", "1");
    formikProps.setFieldValue("habitName", "");
    formikProps.setFieldValue("formOfMeasurement", "1");
    formikProps.setFieldValue("goal", "1");
    setSettings(false);
    setShowModal(false);
  };

  const createHabit = (id, habitName, recurrence, formOfMeasurement, goal) => ({
    id: id,
    recurrence: recurrence,
    habitName: habitName,
    formOfMeasurement: formOfMeasurement,
    goal: goal,
  });

  const showCreateHabitForm = () => {
    setSettings(false);
    setMeasurement("1");
    setShowModal(true);
  };

  const useForceRender = () => {
    const [, forceRender] = useReducer((x) => !x, true);
    return forceRender;
  };

  const forceRender = useForceRender();
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM habit", [], function (tx, results) {
        const len = results.rows.length;
        //formikProps.values.habits.push({ text: "asd asdf232 3asdfdff", recurrence: 3 })

        for (i = 0; i < len; i++) {
          formikProps.values.habits.push({
            id: results.rows.item(i).id,
            habitName: results.rows.item(i).habitName,
            recurrence: results.rows.item(i).recurrence,
            formOfMeasurement: results.rows.item(i).formOfMeasurement,
            goal: results.rows.item(i).goal,
          });
          /*formikProps.setFieldValue("habits", [
             ...formikProps.values.habits,
             createHabit("values.habitName", 7),
           ]);*/
        }
        forceRender();
      }),
        function (e) {
          alert("error effect");
        };
    });
  }, []);

  return (
    <>
      <Button onPress={() => showCreateHabitForm()} style={{ marginTop: 50 }}>
        New Habit
      </Button>

      <VStack space={4} style={{ marginTop: 0, width: "100%" }}>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          closeOnOverlayClick={false}
          avoidKeyboard={true}
          style={{ width: "100%", alignSelf: "center" }}
        >
          <Modal.Content style={{ width: "83%" }}>
            <Modal.Header backgroundColor="#ADD8E6">
              <Text color="#FFFFFF">
                {" "}
                {settings == true ? "Edit a habit" : "Add a habit"}{" "}
              </Text>
            </Modal.Header>
            <Modal.Body>
              <FormControl
                isRequired
                isInvalid={"habitName" in formikProps.errors}
              >
                <FormControl.Label>Name of habit</FormControl.Label>
                {console.log("errors", formikProps.errors)}
                <Input
                  onBlur={formikProps.handleBlur("habitName")}
                  placeholder="Habit"
                  onChangeText={formikProps.handleChange("habitName")}
                  value={formikProps.values.habitName}
                  fontSize={15}
                />
                <FormControl.ErrorMessage>
                  {formikProps.errors.habitName}
                </FormControl.ErrorMessage>
              </FormControl>
              <Divider my={2} />

              <FormControl>
                <FormControl.Label>Recurrence</FormControl.Label>
                <HStack space={3}>
                  <Input
                    onBlur={formikProps.handleBlur("recurrence")}
                    placeholder="recurrence"
                    onChangeText={formikProps.handleChange("recurrence")}
                    value={formikProps.values.recurrence}
                    width={10}
                    fontSize={15}
                    height={9}
                    isReadOnly={true}
                  />
                  <Text>day/s</Text>
                  <FormControl.ErrorMessage>
                    {formikProps.errors.recurrence}
                  </FormControl.ErrorMessage>
                  <TouchableOpacity
                    onPress={() => {
                      counter == 1 ? 1 : counter--;
                      formikProps.setFieldValue(
                        "recurrence",
                        counter.toString()
                      );
                    }}
                  >
                    <Image
                      source={require("./assets/minus.png")}
                      style={{
                        width: 30,
                        height: 30,
                        //marginLeft: 80,
                        //marginTop: 80
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      counter++;
                      formikProps.setFieldValue(
                        "recurrence",
                        counter.toString()
                      );
                    }}
                  >
                    <Image
                      source={require("./assets/plus.png")}
                      style={{
                        width: 30,
                        height: 30,
                        //marginLeft: 15,
                        //marginTop: -30,
                      }}
                    />
                  </TouchableOpacity>
                </HStack>
              </FormControl>

              <Divider my={2} />
              <FormControl>
                <FormControl.Label>Form of measurement</FormControl.Label>
                <HStack space={3}>
                  <Radio.Group
                    name="formOfMeasurementGroup"
                    //defaultValue={formOfMeasure.current}
                    //accessibilityLabel="pick a size"
                    //value={formOfMeasure.current}
                    //onChange={(nextValue) => {
                    //  formOfMeasure.current = nextValue;
                    //alert(formOfMeasure.current);
                    //}}
                    defaultValue={settings === true ? measurement : "1"}
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
                        onChange={formikProps.handleChange}
                        name="formOfMeasurement"
                        //onBlur={handleBlur("formOfMeasurement")}
                        onPress={() =>
                          formikProps.setFieldValue("formOfMeasurement", "1")
                        }
                      >
                        Increment
                      </Radio>
                      <Radio
                        value="2"
                        colorScheme="green"
                        size="sm"
                        my={1}
                        onChange={formikProps.handleChange}
                        name="formOfMeasurement"
                        //onBlur={handleBlur("formOfMeasurement")}
                        onPress={() =>
                          formikProps.setFieldValue("formOfMeasurement", "2")
                        }
                      >
                        Timer
                      </Radio>
                    </Stack>
                  </Radio.Group>
                </HStack>
              </FormControl>

              <Divider my={2} />
              <FormControl>
                <FormControl.Label>Goal</FormControl.Label>
                <HStack space={3}>
                  <Input
                    onBlur={formikProps.handleBlur("goal")}
                    placeholder="goal"
                    onChangeText={formikProps.handleChange("goal")}
                    value={formikProps.values.goal}
                    width={10}
                    fontSize={15}
                    height={9}
                    isReadOnly={true}
                  />
                  <Text>time/s</Text>
                  <TouchableOpacity
                    onPress={() => {
                      goalCounter == 1 ? 1 : goalCounter--;
                      formikProps.setFieldValue("goal", goalCounter.toString());
                    }}
                  >
                    <Image
                      source={require("./assets/minus.png")}
                      style={{
                        width: 30,
                        height: 30,
                        //marginLeft: 80,
                        //marginTop: 80
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      goalCounter++;
                      formikProps.setFieldValue("goal", goalCounter.toString());
                    }}
                  >
                    <Image
                      source={require("./assets/plus.png")}
                      style={{
                        width: 30,
                        height: 30,
                        //marginLeft: 15,
                        //marginTop: -30,
                      }}
                    />
                  </TouchableOpacity>
                </HStack>
              </FormControl>

              <Divider my={2} />
              <HStack style={{ alignSelf: "center" }}>
                <Button
                  onPress={formikProps.handleSubmit}
                  /* onPress={() => {
                
                 setFieldValue("habits", [
                      ...values.habits,
                      createHabit(values.habitName),
                    ]);
                    setFieldValue("habitName","")
                    setShowModal(false) 
                handleSubmit();
                alert(submitSuccessful);
                if (submitSuccessful) {
                  setFieldValue("habits", [
                    ...values.habits,
                    createHabit(values.habitName),
                  ]);
                  setFieldValue("habitName", "");
                  setShowModal(false);
                }
              }}*/
                  colorScheme="green"
                  width={125}
                  height={10}
                  style={{ marginRight: 10 }}
                >
                  Done
                </Button>
                <Button
                  onPress={handleClose}
                  colorScheme="red"
                  width={125}
                  height={10}
                  // style={{ marginTop: -40, marginLeft: 150 }}
                >
                  Cancel
                </Button>
              </HStack>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Content>
        </Modal>

        <ScrollView
          px={0}
          _contentContainerStyle={{
            bg: "lime.300",
            px: "0px",
            w: "100%",
          }} // style={{ backgroundColor: 'blue' }}
          height={550}
        >
          <VStack>
            {formikProps.values.habits.map(
              (
                { id, habitName, recurrence, formOfMeasurement, goal },
                index
              ) => (
                <View
                  key={index}
                  style={{ alignSelf: "center", width: "100%" }}
                  //style={{
                  //width: width * 0.9,
                  // display: "flex",
                  // flexDirection: "row",
                  // flexWrap: "wrap",
                  //alignContent: "flex-end",
                  //alignItems: "center",
                  // justifyContent: "flex-end",
                  // borderBottomColor: "#6E5BAA",
                  // borderBottomWidth: 1,
                  // width: "100%",
                  // paddingTop: 10,
                  // paddingBottom: 10,
                  //}}
                >
                  <Flex direction="row">
                    <Center
                      size={16}
                      bg="primary.100"
                      _text={{
                        color: "gray.800",
                      }}
                      style={{ width: "15%" }}
                    >
                      <Circle size={50} bg="secondary.400">
                        {recurrence}
                      </Circle>
                    </Center>
                    <Center
                      style={{ width: "70%" }}
                      size={16}
                      bg="primary.200"
                      _text={{
                        color: "orange",
                      }}
                      //rounded="xl"
                      //w={[215, 135, 67.5]}
                      //h={24}
                      //h={23}
                    >
                      <Text style={{ color: "green", fontSize: 18 }}>
                        {habitName}
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "normal",
                            textAlign: "center",
                          }}
                        >
                          {"\n"} Goal: 3 time/s {id}
                        </Text>
                      </Text>
                    </Center>
                    <Center
                      bg="primary.300"
                      size={16}
                      _text={{
                        color: "white",
                      }}
                      style={{ width: "15%" }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          loadEdit(id);
                          setSettings(true);
                          setShowModal(true);
                        }}
                      >
                        <Image
                          source={require("./assets/edit.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    </Center>
                  </Flex>
                  <Divider my="1" />
                </View>
                // <TextInput
                //   key={index}
                //   onChangeText={handleChange(`questions[${index}].text`)}
                //   onBlur={handleBlur(`questions[${index}].text`)}
                //   value={values.questions[index].text}
                //   style={styles.corners1}
                // />
              )
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
};

/* const Main = () => {
  return (
    <NativeBaseProvider>
      <Center>
        <App />
      </Center>
    </NativeBaseProvider>
  );
}; */

function Main() {
  return (
    <NativeBaseProvider>
      <Center>
        <App />
      </Center>
    </NativeBaseProvider>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Main />
      </Center>
    </NativeBaseProvider>
  );
};

/* export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Main />
      </Center>
    </NativeBaseProvider>
  );
}; */

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
    fontSize: 20,
  },
  scrollView: {
    height: "20%",
    width: "80%",
    margin: 20,
    alignSelf: "center",
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "lightblue",
  },
});
