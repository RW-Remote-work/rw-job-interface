import {Box, Button, Flex, Icon, Stack, Text} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {HeaderMenuItem} from "@/components/HeaderMenuItem";

export interface menuItem {
    title: string,
    titleColor: string,
    description: string,
    linkText: string,
    link:string,
    imgSrc: string,
    border: string,
    bgColor:string,
    rightIcon: string,
}



export function HeaderMenu({menuItems,onMouseLeave}: {menuItems: menuItem[],onMouseLeave:()=>void}) {

    return (
        <Stack
            onClick={(e)=>e.stopPropagation()}
            zIndex={999}
            position="absolute"
            top="40px"
            left="-55px"
            bgColor="white"
            width="377px"
            padding="20px"
            borderRadius="29px"
            shadow="0px 0px 10px rgba(0,0,0,0.1)"
            onMouseLeave={(e)=>{e.stopPropagation();onMouseLeave()}}
        >
            {menuItems.map((menuItem, index) => (
                <HeaderMenuItem key={index} {...menuItem}/>
            ))}
        </Stack>
    )
}
