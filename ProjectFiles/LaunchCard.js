import { View, Text, Pressable, ScrollView, Image, Linking } from 'react-native'
import React, { useState } from 'react'
const dayjs = require('dayjs')



const LaunchCard = ({ item, expandedID, handleShowDetails }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View
            style={{
                backgroundColor: '#1B1C1F',
                marginBottom: 20,
                borderRadius: 8,
                padding: 10,

            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text
                    numberOfLines={expandedID === item.id && showDetails ? 0 : 1}
                    style={{
                        color: 'white',
                        fontSize: 18,
                        width: '70%'
                    }}
                > {item.mission_name}</Text>


                <Text
                    style={{
                        color: '#929292',
                        fontSize: 14
                    }}
                > {dayjs(item.launch_date_local).format('DD MMM YYYY')}</Text>

            </View>
            <View style={{ minHeight: 60, marginTop: 10 }}>


                <Text
                    numberOfLines={expandedID === item.id && showDetails ? 0 : 2}
                    style={{
                        color: '#929292',
                        fontSize: 14
                    }}
                > {item.details ? item.details : 'No description'}</Text>


            </View>
            {
                expandedID === item.id && showDetails ?
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'white', width: '30%' }}>Rocket:</Text>
                            <Text style={{ color: '#B9B9B9' }}>{item.rocket.rocket_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'white', width: '30%' }}>Payloads:</Text>
                            <Text style={{ color: '#B9B9B9' }}>{item.rocket.second_stage.payloads[0].payload_type}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'white', width: '30%' }}>Ships:</Text>
                            <Text style={{ color: '#B9B9B9', maxWidth: '60%' }}>{item.ships.length > 0 ? item.ships.map((ship, index, ships) => { return ship.id + (index != ships.length - 1 ? ', ' : '') }) : 'No Ships'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'white', width: '30%' }}>Launch Site:</Text>
                            <Text style={{ color: '#B9B9B9', width: '60%' }}>{item.launch_site.site_name_long}</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ color: 'white', }}>Launch Images:</Text>
                            <ScrollView
                                contentContainerStyle={{ marginVertical: 10 }}
                                horizontal={true}
                            >
                                {

                                    item.links.flickr_images.length > 0
                                        ? item.links.flickr_images.map((img, index) => {
                                            return (<Pressable

                                                onPress={() => {
                                                    Linking.openURL(img)
                                                }}
                                                key={index}>

                                                <Image

                                                    loadingIndicatorSource={require('../ProjectFiles/assets/image_placeholder.png')}
                                                    // defaultSource={require('../ProjectFiles/assets/image_placeholder.png')}
                                                    style={{ height: 80, width: 80, marginRight: 10, borderRadius: 3 }}
                                                    source={{ uri: img }}
                                                />
                                            </Pressable>
                                            )
                                        })

                                        : <Text style={{ color: '#B9B9B9' }}>No Launch Images</Text>
                                }
                            </ScrollView>
                        </View>
                    </View> : null
            }

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>

                    <Pressable
                        onPress={() => {
                            setShowDetails(!showDetails)
                            handleShowDetails(item.id)
                        }}
                        style={{ backgroundColor: 'black', padding: 3, paddingHorizontal: 8, borderRadius: 4, margin: 0 }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 14,
                            margin: 0,
                            padding: 0,

                        }}>{expandedID === item.id && showDetails ? 'Close' : 'Details'}</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Pressable
                        disabled={item.links.article_link ? false : true}
                        onPress={() => {
                            Linking.openURL(item.links.article_link)
                        }}
                        style={{}}>
                        <Text style={{
                            color: item.links.article_link ? 'white' : '#929292',
                            fontSize: 14,
                            margin: 0,
                            padding: 0,

                        }}>Article</Text>
                    </Pressable>
                    <Pressable

                        disabled={item.links.video_link ? false : true}
                        onPress={() => {
                            Linking.openURL(item.links.video_link)
                        }}
                        style={{ marginLeft: 10 }}>
                        <Text style={{
                            color: item.links.video_link ? 'white' : '#929292',
                            fontSize: 14,
                            margin: 0,
                            padding: 0,

                        }}>Video</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default LaunchCard