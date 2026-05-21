import { Box, Image, Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps, Tooltip, others } from "@chakra-ui/react"
import CommunityRank1 from '@/assets/svgs/community-rank-1.svg'
import CommunityRank2 from '@/assets/svgs/community-rank-2.svg'
import CommunityRank3 from '@/assets/svgs/community-rank-3.svg'
import CommunityRank4 from '@/assets/svgs/community-rank-4.svg'
import CommunityRank5 from '@/assets/svgs/community-rank-5.svg'
import { PropsWithChildren } from "react"


const badgeMapping = {
  1: { asset: CommunityRank1, tips: '社区成员' },
  2: { asset: CommunityRank2, tips: '初级研究员' },
  3: { asset: CommunityRank3, tips: '中级研究员' },
  4: { asset: CommunityRank4, tips: '高级研究员' },
  5: { asset: CommunityRank5, tips: '资深研究员' },
}

interface AvatarProps extends Omit<ChakraAvatarProps, 'size' | 'width' | 'height'> {
  rank?: keyof typeof badgeMapping
  src: string
  size?: string | number
}
export const Avatar = ({ src, rank = 1, size = "62px", ...otherProps }: PropsWithChildren<AvatarProps>) => {
  const badgeInfo = badgeMapping[rank]

  const badgeSize = parseInt(size as string) / 3
  return (
    <ChakraAvatar {...otherProps} src={src} width={size} height={size} >
      <Tooltip label={badgeInfo.tips} placement='right'>
        <Image
          title="community rank badge"
          src={badgeInfo.asset}
          width={badgeSize}
          height={badgeSize}
          position="absolute"
          right="0"
          bottom="0"
          alt="community rank badge"
        />
      </Tooltip>
    </ChakraAvatar>
  )
}