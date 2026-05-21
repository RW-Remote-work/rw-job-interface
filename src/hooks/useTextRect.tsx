'use client'
import { useGlobalContext } from "@/components/GlobalProvider/useGlobalContext";
import { Box, Text, TextProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLatest } from "react-use";

export const useTextRect = (content: string, style?: TextProps) => {
    const { render } = useGlobalContext()
    const styleRef = useLatest(style)
    const [rect, setRect] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        const clear = render(
            <Box opacity={0} position="fixed" top="-99em" left="-99em">
                <Text ref={(el) => {
                    if (!el) return
                    const { width, height } = el.getBoundingClientRect()
                    setRect({ width, height })
                }} {...styleRef.current}>{content}</Text>
            </Box >
        )

        return () => {
            clear()
        }
    }, [content, render, styleRef])



    return rect
}