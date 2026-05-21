import {Button, Flex, Image, Link, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {menuItem} from "@/components/HeaderMenu";
import {useRouter} from "next/router";
import React from "react";
import arrowLeft from "@/assets/icons/arrowLeft.svg"

export function HeaderMenuItem(props:menuItem) {
    const router = useRouter();

    return (
        <Stack
            zIndex={999}
            direction="row"
            top="20px"
            width="337px"
            height="108px"
            border= {props.border}
            borderRadius="29px"
            backgroundColor={props.bgColor}
            onClick={(e) => e.stopPropagation()}
        >
            <Stack onClick={(e) => e.stopPropagation()} zIndex={999} marginTop="20px" marginLeft="24px" marginBottom="20px" marginRight="28px">
                <Text
                    fontFamily="Alibaba PuHuiTi 2.0"
                    fontSize="12px"
                    fontWeight="700"
                    color={props.titleColor}
                >{props.title}</Text>
                <Text
                    onClick={(e) => e.stopPropagation()}
                    height="44px"
                    width="141px"
                    fontFamily="Alibaba PuHuiTi 2.0"
                    lineHeight="21.69px"
                    fontSize="18px"
                    fontWeight="700"
                >{props.description}</Text>
            </Stack>
            <Stack position={"relative"} onClick={(e) => e.stopPropagation()}>
                <Image src={props.rightIcon} alt={props.description || "图标"} onClick={(e) => e.stopPropagation()}></Image>
                <Flex position={"absolute"} top={"50px"} left={"23.75px"} onClick={(e) => e.stopPropagation()}>
                        <Button
                            isDisabled={props.linkText==="人才集市"}
                            marginRight="23.75px"
                            width="96.5px"
                            height="32px"
                            bgColor="black"
                            textAlign="center"
                            lineHeight="36px"
                            variant="outline"
                            borderRadius="32px"
                            color="white"
                            _hover={{
                                bgColor: "rgba(0,0,0,0.7)",
                            }}
                            onClick={()=>{router.push(props.link).then(router.reload)}}
                        >
                            {props.linkText}

                            <Image src={arrowLeft} alt="箭头"></Image>
                        </Button>
                </Flex>
            </Stack>
        </Stack>
    );
}
