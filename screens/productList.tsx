import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ProductCell } from "../components/productCell";

export const ProductList = () => {
	let url: string = "https://fakestoreapi.com/products";

	interface ProductItem {
		id: number;
		title: string;
		image: string;
		price: number;
	}

	var [productArray, setProductArray] = useState<ProductItem[] | []>([]);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				var array: ProductItem[] = [];
				json.forEach((element: ProductItem) => {
					array.push(element);
				});
				setProductArray(array);
			});
	}, []);

	return (
		<View>
			<FlatList
				data={productArray}
				renderItem={({ item, index }) => (
					<ProductCell
						id={item.id}
						title={item.title}
						price={item.price}
						imageUrl={item.image}
					/>
				)}
				keyExtractor={(item: ProductItem) => item.id.toString()}
			/>
		</View>
	);
};
