import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
	ProductList: undefined;
	Product: { id: number };
};
type ProductScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Product"
>;
type ProductScreenRouteProp = RouteProp<RootStackParamList, "Product">;

type Props = {
	navigation: ProductScreenNavigationProp;
	route: ProductScreenRouteProp;
};

export const Product = ({ navigation, route }: Props) => {
	const { id }: { id: number } = route.params;

	interface productData {
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
	}

	let url = `https://fakestoreapi.com/products/${id}`;
	const [productData, setProductData] = useState<productData>();

	useEffect(() => {
		var data: productData;
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				data = json;
				setProductData(data);
				navigation.setOptions({ title: data.title });
			});
	}, []);

	const handlePriceColor: (price: number | undefined) => string = (price) => {
		if (price && price > 50) return "green";
		return "black";
	};
	const handlePrice: (price: number | undefined) => string = (price) => {
		if (!price) return "0.00";
		else if (price > 50) return (price * 0.8).toFixed(2);
		else return price.toFixed(2);
	};

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: productData?.image }} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>{productData?.title}</Text>
				<Text
					style={{
						...styles.price,
						color: handlePriceColor(productData?.price),
					}}
				>
					${handlePrice(productData?.price)}
				</Text>
				<Text style={{ fontWeight: "bold" }}>Description</Text>
				<Text style={{ marginBottom: 20 }}>
					{productData?.description}
				</Text>
				<Text>Category: {productData?.category}</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Button
					title="Add to cart"
					onPress={() => console.log("Added to cart")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	image: {
		alignSelf: "center",
		marginTop: 20,
		marginBottom: 10,
		width: 200,
		height: 200,
	},
	textContainer: {
		margin: 20,
	},
	price: {
		marginBottom: 10,
		fontSize: 20,
	},
});
