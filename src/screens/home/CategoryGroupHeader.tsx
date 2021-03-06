import React, { useRef } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Animated, ViewProps, TouchableOpacity } from 'react-native'
import { Icon } from '../../components'
import { CategoryItem } from './CategoryItem'
import { RestaurantItem } from './RestaurantItem'
import Restaurants from '../../stores/Restaurant'
import { observer } from 'mobx-react'
import Categories from '../../stores/Category'
import Empty from '../../components/Empty'
export const CategoryGroupHeader = observer(({ props, fetchData }: any) => {
	// console.log({props: fetchData})
	const scrollY = useRef(new Animated.Value(0)).current
	const FlatListHeight = 150
	const titleHeight = 48
	const flatlistHeaderHeight = scrollY.interpolate({
		inputRange: [0, FlatListHeight],
		outputRange: [FlatListHeight, FlatListHeight - FlatListHeight],
		extrapolate: 'clamp'
	})
	const titleHeightScroll = scrollY.interpolate({
		inputRange: [0, titleHeight],
		outputRange: [titleHeight, titleHeight - titleHeight],
		extrapolate: 'clamp'
	})
	return (
		<>
			<Animated.View style={{
				zIndex: 10,
			}}>
				<Animated.View
					style={{
						height: titleHeightScroll,
					}}
				>
					<Text style={{
						fontSize: 32,
						fontWeight: '500',
						paddingTop: 10
					}}>Danh mục</Text>
				</Animated.View>
				<Animated.View
					style={{
						height: flatlistHeaderHeight
					}}
				>
					<FlatList
						data={JSON.parse(JSON.stringify(Categories.categories))}
						renderItem={({ item, index }) => {
							// console.log({
							// 	item: item,
							// 	index: index
							// })
							return (
								<CategoryItem
									item={item}
									index={index}
									fetchData={fetchData}
								/>
							)
						}}
						ListEmptyComponent={<Empty message="No category Found" />}
						keyExtractor={(item, index) => index.toString()}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
					/>
				</Animated.View>
			</Animated.View>
			<View style={{
				paddingVertical: 10,
				flexDirection: 'row',
				alignItems: 'flex-end',
				justifyContent: 'space-between'
			}}>
				<Text style={{
					fontSize: 23,
					fontWeight: '600',
					flexDirection: 'row'
				}}>Recommend</Text>
				<TouchableOpacity style={{
					flexDirection: 'row'
				}}>
					<Text style={{
						fontWeight: '300',
						marginRight: 5,
						fontSize: 14
					}}>Thêm nữa</Text>
					<Icon size={18} AntDesign name="right" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={JSON.parse(JSON.stringify(Restaurants.restaurants))}
				scrollEventThrottle={16}
				onScroll={
					Animated.event([
						{ nativeEvent: { contentOffset: { y: scrollY } } }
					], { useNativeDriver: false })
				}
				ListEmptyComponent={<Empty message="No food Found" />}
				renderItem={({ item, index }) => {
					return (
						<RestaurantItem
							item={item}
							index={index}
							props={props}
							fetchData={fetchData}
							/>
					)
				}}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
			/>
		</>
	)
}
)
const styles = StyleSheet.create({
	FlatListStyle: {
		// maxHeight: 200,
		// backgroundColor: 'black'
	},

})