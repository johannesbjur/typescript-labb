import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

export const ProductCell = ({
	id,
	title,
	price,
	imageUrl,
}: {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
}) => {
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={() =>
				navigation.navigate("Product", {
					title: title,
					id: id,
				})
			}
		>
			<View style={styles.container}>
				<Image style={styles.image} source={{ uri: imageUrl }} />
				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text
						style={{
							...styles.price,
							color: price > 50 ? "green" : "black",
						}}
					>
						$ {(price > 50 ? price * 0.8 : price).toFixed(2)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 20,
		width: "65%",
	},
	textContainer: {
		paddingLeft: 20,
		flexDirection: "column",
		justifyContent: "center",
	},
	image: {
		width: 100,
		height: 100,
	},
	title: {
		marginBottom: 5,
		fontWeight: "bold",
		flexWrap: "wrap",
	},
	price: {
		marginTop: 5,
	},
});
