import { View, Text, SafeAreaView, Image, ScrollView, Pressable, ImageBackground, RefreshControl } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useQuery, gql, ApolloClient, InMemoryCache, NetworkStatus } from '@apollo/client';
import LaunchCard from './LaunchCard';

const GET_LAUNCHES = gql`
 query {
    launchesPast(limit: 10) {
      id
      mission_name
      details
      launch_date_local
    launch_site {
      site_name_long
    }
    links {
      article_link
      video_link
      flickr_images
    }
    rocket{
        
        first_stage {
            cores {
                flight

                }
        }
        rocket_name
        second_stage {
            block
            payloads {
                id
                payload_type

            }
        }
    }
    ships {
        id

    }

    }
  }
`;



const SpaceXLaunchList = () => {
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_LAUNCHES, {
        notifyOnNetworkStatusChange: true
    });


    const [expandedCardID, setExpandedCardID] = useState('')


    const handleShowDetails = (id) => {
        setExpandedCardID(id)
    }

    useEffect(() => {
        // console.log(data, loading, error)
        console.log('refetced')
    }, [data, error, loading])
    // useEffect(() => {
    //     const client = new ApolloClient({
    //         uri: 'https://api.spacex.land/graphql/',
    //         // cache: new InMemoryCache(),
    //         cache: new InMemoryCache(),
    //         onError: ({ networkError, graphQLErrors }) => {
    //             // console.log('graphQLErrors', graphQLErrors)
    //             // console.log('networkError', networkError)
    //             console.log(JSON.stringify(networkError, null, 2));
    //             console.log(JSON.stringify(graphQLErrors, null, 2));
    //         }
    //     });
    //     client
    //         .query({
    //             query: GET_LAUNCHES
    //         })
    //         .then((result) => console.log(result))
    //         .catch(error => { console.log(JSON.stringify(error, null, 2)); });

    // }, [])


    if (loading) return <View style={{}}>
        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={require('./assets/HomeImage.png')}
        >

            <Text style={{ color: 'white', textAlign: 'center', top: '80%' }}>Loading...</Text>
        </ImageBackground>
    </View>
    if (error) return <Text>Error : {error.message}</Text>;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000', }}>
            <Image style={{
                width: 168, resizeMode: 'contain', height: 40, margin: 10
            }} source={require('../ProjectFiles/assets/spacexLogo.png')} />

            <Text style={{ color: 'white', marginHorizontal: 20, marginVertical: 10, fontSize: 20, fontWeight: '600' }}>Previous Launches</Text>
            <View style={{ paddingBottom: 20, marginBottom: 50 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                refetch()
                                // console.log('refetched ')
                            }}
                        />}
                    style={{ paddingBottom: 20 }}
                    contentContainerStyle={{ padding: 20, paddingBottom: 50, marginBottom: 10 }}
                >

                    {
                        data.launchesPast.map((item, index) => {
                            return (
                                <LaunchCard
                                    handleShowDetails={handleShowDetails}
                                    expandedID={expandedCardID}
                                    key={item.id}
                                    item={item}
                                />
                            )
                        })
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default SpaceXLaunchList