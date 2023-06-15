import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState({});

  useEffect(() => {
    const fetchShoppingList = async () => {
      // Retrieve the shopping list from AsyncStorage
      const savedShoppingList = await Storage.getData("shoppingList");

      if (savedShoppingList) {
        setShoppingList(savedShoppingList);
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

  // Sort the shopping list alphabetically by ingredient
  const sortedList = shoppingList.sort((a, b) =>
    a.ingredient.localeCompare(b.ingredient)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <ScrollView style={styles.scrollContainer}>
        {sortedList.map((item) => (
          <TouchableOpacity
            key={item.ingredient}
            style={styles.itemContainer}
            onPress={() => toggleCheckbox(item)}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
