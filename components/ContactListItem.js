import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import Animated, { FadeIn, Layout } from 'react-native-reanimated'



//this was just used to save time from rewriting the below properties to each skeletons
const skeletonCommonProps = {
            colorMode: 'light' ,
            backgroundColor:'#D4D4D4',
            transition:{
                type: 'timing',
                duration: 2000,
            }
}

const ContactListItem = ({item}) => {
    const showSkeleton = item === null;
  return (
    <View style={Styles.container}>
    <Skeleton.Group show={showSkeleton}>
        <Skeleton 
            height={70} 
            width={70} 
            radius= {'round'}
            {...skeletonCommonProps}
            >
            {item && (
                <Animated.View 
                layout={Layout} 
                entering={FadeIn.duration(1500)}
                style={Styles.circleContainer}>
                    <Text style={{
                        fontSize: 25, 
                        color: 'white', 
                        }}>
                        {item?.name[0]}
                    </Text>
                </Animated.View>
            )}
        </Skeleton>
        
        <View style={{marginLeft: 15}}>
        <Skeleton 
            height={30} 
            width={220} 
            {...skeletonCommonProps}
            >
                {item && (
                    //the Animated.text or animated.view used in the avartaar is just for smooth transition from skeleton to data
                    <Animated.Text 
                        layout={Layout} 
                        entering={FadeIn.duration(1500)} 
                        style={{fontSize: 20}}
                    >
                            {item.name}
                    </Animated.Text>
                )}
            </Skeleton>

            <View style={{height: 3}}/>
            
            <Skeleton 
            height={20} 
            width={'80%'} 
            {...skeletonCommonProps}
            >
                {item && (
                    <Animated.Text 
                        layout={Layout} 
                        entering={FadeIn.duration(1500)} 
                        style={{fontSize: 15}}
                    >
                        {item.email}
                    </Animated.Text>
                )}
            </Skeleton>
        </View>
    </Skeleton.Group>
    </View>
  )
}

const Styles = StyleSheet.create({
    container: {
        width: "100%", 
        height: 120, 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 20
    },
    circleContainer: {
        height: 70, 
        aspectRatio: 1, 
        borderRadius: 35, 
        backgroundColor: "#005CB7", 
        justifyContent: 'center', 
        alignItems: 'center',
    },
})
export default ContactListItem