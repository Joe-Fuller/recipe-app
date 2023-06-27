import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ShoppingListStorage from "../storage/ShoppingListStorage";
import Dialog from "react-native-dialog";
import getDynamicStyles from "../styles/commonStyles";
import shoppingListScreenStyles from "../styles/shoppingListStyles";
import { SettingsContext } from "../contexts/SettingsContext";

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const { settings } = useContext(SettingsContext);
  const commonStyles = getDynamicStyles(settings);
  const styles = shoppingListScreenStyles(settings);

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
    const newItem = { ingredient: "", amount: "", units: "" };
    setShoppingList([...shoppingList, newItem]);
    handleEditItem(newItem);
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

  const handleDeleteItem = () => {
    // Remove the item from the shopping list
    const updatedShoppingList = shoppingList.filter(
      (listItem) => listItem !== selectedItem
    );

    // And then save it
    setShoppingList([...updatedShoppingList]);

    // Hide the dialog
    setDialogProperties({ ...dialogProperties, visible: false });

    ShoppingListStorage.saveShoppingList([...updatedShoppingList]);
  };

  return (
    <View style={styles.container}>
      <Text style={commonStyles.title}>Shopping List</Text>
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

        <TouchableOpacity style={commonStyles.button} onPress={handleAddItem}>
          <Text style={commonStyles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>
      <Dialog.Container visible={dialogProperties.visible}>
        <View>
          <Text>Ingredient:</Text>
          <Dialog.Input
            onChangeText={(text) => updateField("ingredient", text)}
          >
            {dialogProperties.item.ingredient}
          </Dialog.Input>
        </View>
        <View>
          <Text>Amount:</Text>
          <Dialog.Input onChangeText={(text) => updateField("amount", text)}>
            {dialogProperties.item.amount}
          </Dialog.Input>
        </View>
        <View>
          <Text>Units:</Text>
          <Dialog.Input onChangeText={(text) => updateField("units", text)}>
            {dialogProperties.item.units}
          </Dialog.Input>
        </View>
        <Dialog.Button label="Delete" onPress={handleDeleteItem} />
        <Dialog.Button label="Cancel" onPress={handleCloseDialog} />
        <Dialog.Button label="Save" onPress={handleSaveItem} />
      </Dialog.Container>
    </View>
  );
};

export default ShoppingListScreen;
