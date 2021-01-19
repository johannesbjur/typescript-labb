import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductList } from "./screens/productList";
import { Product } from "./screens/product";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	type RootStackParamList = {
		ProductList: undefined;
		Product: { id: number };
	};

	const Stack = createStackNavigator<RootStackParamList>();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="ProductList">
				<Stack.Screen name="ProductList" component={ProductList} />
				<Stack.Screen name="Product" component={Product} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
