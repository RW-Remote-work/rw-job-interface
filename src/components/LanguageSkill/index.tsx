import {Box, Button, Select, Text} from "@chakra-ui/react"

type SkillType = 'listen' | 'speak' | 'read' | 'write'
type LanguageType = 'chinese' | 'cantonese' | 'english' | 'japanese' | 'french' | 'german' | 'thai' | 'spanish' | 'portuguese' | 'russian' | 'turkish' | 'arabic' | 'vietnamese' | 'indonesian' | 'filipino' | 'korean' | 'italian'

export interface LanguageSkillProps {
  label?: LanguageType
  skill?: Array<SkillType>
  readonly?: boolean
  onSkillChange?: (skill: Array<SkillType>) => void
  onLabelChange?: (label: LanguageType) => void
  onDelete?:()=> void
  length?:number
  isDetail?:boolean
}

const list: { label: string, value: SkillType }[] = [
  { label: '听', value: 'listen' },
  { label: '说', value: 'speak' },
  { label: '读', value: 'read' },
  { label: '写', value: 'write' }
]

export const LanguageSkill = ({ label, skill, readonly = false, onSkillChange, onLabelChange ,onDelete,length,isDetail}: LanguageSkillProps) => {


  const handleSkillChange = (value: SkillType) => {
    if (readonly) return

    const isSelect = !skill?.includes(value)
    const newSkill = isSelect ? [...skill ?? [], value] : skill?.filter(item => item !== value)
    const skillValues = list.filter(item => newSkill?.includes(item.value)).map(item => item.value)

    onSkillChange?.(skillValues)
  }

  return (
      <Box display="flex" gap="18px" alignItems="center">
        {
          readonly ? (
              <Text fontSize="14px" color="black">{label}</Text>
          ) : (
              <Select w="100px" value={label} onChange={e => onLabelChange?.(e.target.value as LanguageType)}>
                <option value="chinese">普通话</option>
                <option value="cantonese">粤语</option>
                <option value="english">英语</option>
                <option value="japanese">日语</option>
                <option value="french">法语</option>
                <option value="german">德语</option>
                <option value="thai">泰语</option>
                <option value="spanish">西班牙语</option>
                <option value="portuguese">葡萄牙语</option>
                <option value="russian">俄罗斯语</option>
                <option value="turkish">土耳其语</option>
                <option value="arabic">阿拉伯语</option>
                <option value="vietnamese">越南语</option>
                <option value="indonesian">印尼语</option>
                <option value="filipino">菲律宾语</option>
                <option value="korean">韩语</option>
                <option value="italian">意大利语</option>
              </Select>
          )
        }
        {
          list.map(({ label, value }) => {
            const isExist = skill?.includes(value as typeof skill[number])

            return (
                <Text
                    key={value}
                    display="inline-block"
                    px="12px"
                    color="#13172E"
                    fontSize="14px"
                    bgColor={isExist ? "#E7F9F0" : "#E6E7E9"}
                    lineHeight="28px"
                    rounded="4px"
                    cursor={readonly ? 'default' : 'pointer'}
                    onClick={() => handleSkillChange(value)}
                >
                  {label}
                </Text>
            )
          })
        }
        <Button
            hidden={isDetail}
            isDisabled={length===1}
            onClick={onDelete}
        >删除</Button>
      </Box>
  )
}

