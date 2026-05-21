import { Box, Img, useBreakpointValue } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import ColorfulLock from '@/assets/icons/colorful-lock.svg'

export const BlurBox = ({
  children,
  blurAmount = 4,
  enabled = true,
  offsetLeft = 0,
  offsetRight = 0,
  showLock = false,
  onLockClick
}: PropsWithChildren<{ blurAmount?: number, enabled?: boolean, offsetLeft?: number, offsetRight?: number, showLock?: boolean, onLockClick?: () => void }>) => {
  
  // 使用响应式 hook 来动态调整图标大小，提供默认值以避免 hydration 错误
  const iconSize = useBreakpointValue({ base: 50, md: 70, lg: 100 }, { fallback: 'base' });
  
  return (
    <Box position="relative" w="full" minH={{ base: "80px", lg: "100px" }} >
      {children}
      {enabled && (
        <>
          <Box 
            position="absolute" 
            top="0" 
            borderRadius="8px" 
            left={`-${offsetLeft}px`} 
            right={`-${offsetRight}px`} 
            bottom="0" 
            zIndex={1} 
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
            }} 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            overflow="hidden"
          >
            {showLock && (
              <Img  
                src={ColorfulLock} 
                alt="Colorful Lock" 
                maxH={iconSize}
                maxW={{ base: "80%", md: "70%", lg: "100px" }}
                objectFit="contain" 
                cursor="pointer" 
                onClick={onLockClick} 
              />
            )}
          </Box>
        </>
      )}

    </Box>
  )
}
export default BlurBox;
