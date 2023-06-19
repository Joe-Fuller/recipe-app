import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ShoppingListStorage from "../storage/ShoppingListStorage";
import Dialog from "react-native-dialog";

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      // Retrieve the shopping list from AsyncStorage
      const savedShoppingList = await ShoppingListStorage.getShoppingList();

      if (savedShoppingList) {
        // Sort the shopping list alphabetically by ingredient
        const sortedList = savedShoppingList.sort((a, b) =>
          a.ingredient.localeCompare(b.ingredient)
        );

        setShoppingList(sortedList);
      }
    };

    fetchShoppingList();
  }, []);

  const [checkedItems, setCheckedItems] = useState([]);

  const toggleCheckbox = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const isItemChecked = (item) => {
    return checkedItems.includes(item);
  };

  const handleAddItem = () => {
    setShoppingList([
      ...shoppingList,
      { ingredient: "", amount: "", units: "" },
    ]);
  };

  const [dialogProperties, setDialogProperties] = useState({
    visible: false,
    item: { ingredient: "", amount: "", units: "" },
  });
  const [selectedItem, setSelectedItem] = useState({
    ingredient: "",
    amount: "",
    units: "",
  });

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setDialogProperties({ visible: true, item: item });
  };

  const handleCloseDialog = () => {
    setDialogProperties({ ...dialogProperties, visible: false });
  };

  const updateField = (property, text) => {
    const newItem = { ...dialogProperties.item };
    newItem[property] = text;
    setDialogProperties({
      ...dialogProperties,
      item: newItem,
    });
  };

  const handleSaveItem = () => {
    // Remove the item from the shopping list
    const updatedShoppingList = shoppingList.filter(
      (listItem) => listItem !== selectedItem
    );

    // And then add the new one in
    setShoppingList([...updatedShoppingList, dialogProperties.item]);

    // Hide the dialog
    setDialogProperties({ ...dialogProperties, visible: false });

    ShoppingListStorage.saveShoppingList([
      ...updatedShoppingList,
      dialogProperties.item,
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <ScrollView style={styles.scrollContainer}>
        {shoppingList.map((item) => (
          <TouchableOpacity
            key={item.ingredient}
            style={styles.itemContainer}
            onPress={() => toggleCheckbox(item)}
            onLongPress={() => handleEditItem(item)}
          >
            <View style={styles.itemDetailsContainer}>
              <Text style={styles.itemIngredient}>{item.ingredient}</Text>
              <Text style={styles.itemAmount}>
                {item.amount} {item.units}
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <MaterialIcons
                name={
                  isItemChecked(item) ? "check-box" : "check-box-outline-blank"
                }
                size={24}
                color={isItemChecked(item) ? "#5F9EA0" : "#A9A9A9"}
              />
            </View>
          </TouchableOpacity>
        ))}
        <Button title="Add Item" onPress={handleAddItem} />
      </ScrollView>
      <Dialog.Container visible={dialogProperties.visible}>
        <Dialog.Input onChangeText={(text) => updateField("ingredient", text)}>
          {dialogProperties.item.ingredient}
        </Dialog.Input>
        <Dialog.Input onChangeText={(text) => updateField("amount", text)}>
          {dialogProperties.item.amount}
        </Dialog.Input>
        <Dialog.Input onChangeText={(text) => updateField("units", text)}>
          {dialogProperties.item.units}
        </Dialog.Input>
        <Dialog.Button
          label="Cancel"
          onPress={handleCloseDialog}
        ></Dialog.Button>
        <Dialog.Button label="Save" onPress={handleSaveItem}></Dialog.Button>
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  checkboxContainer: {
    marginLeft: 16,
  },
  itemDetailsContainer: {
    flex: 1,
    marginRight: 16,
  },
  itemIngredient: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemAmount: {
    fontSize: 14,
    color: "#808080",
  },
});

export default ShoppingListScreen;
