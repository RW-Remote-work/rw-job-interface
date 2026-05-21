import { Box, BoxProps, Button, IconButton, Text, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";
import { ChevronLeftIcon } from "../Icons/ChevronLeft";
import { ChevronRightIcon } from "../Icons/ChevronRight";

interface SimplePaginationProps extends Omit<BoxProps, 'onChange'> {
    page?: number;
    pageSize?: number
    total?: number
    onChange?: (page: number, pageSize: number) => void;
}

export const SimplePagination = ({ page = 1, pageSize = 10, total = 0, onChange, ...otherProps }: SimplePaginationProps) => {
    // 响应式断点，根据屏幕宽度调整显示的页码数量
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    
    // 根据屏幕宽度设置最大显示页码数量
    const MAX_PAGE_RANGE = useMemo(() => {
        if (isLargerThan1200) {
            return 7; // 大屏幕显示7个页码
        } else if (isLargerThan768) {
            return 5; // 中等屏幕显示5个页码
        } else {
            return 3; // 小屏幕显示3个页码
        }
    }, [isLargerThan1200, isLargerThan768]);

    const totalPage = Math.ceil(total / pageSize) || 1

    const pageRange = useMemo(() => {
        if (totalPage <= MAX_PAGE_RANGE) {
            return Array(totalPage).fill(null).map((_, i) => i + 1)
        }


        if (page <= (Math.ceil(MAX_PAGE_RANGE / 2) + 1)) {
            const size = page === (Math.ceil(MAX_PAGE_RANGE / 2) + 1) ? MAX_PAGE_RANGE + 1 : MAX_PAGE_RANGE
            return Array(size).fill(null).map((_, i) => i + 1)
        }

        // 末尾逻辑
        if (page >= (totalPage - Math.floor(MAX_PAGE_RANGE / 2) - 1)) {
            const threshold = totalPage - Math.floor(MAX_PAGE_RANGE / 2) - 1
            const size = page === threshold ? MAX_PAGE_RANGE + 1 : MAX_PAGE_RANGE

            return Array(size).fill(null).map((_, i) => {
                const localPage = totalPage - MAX_PAGE_RANGE + i;

                if (page === threshold) {
                    return localPage
                }
                return localPage + 1
            })
        }


        return Array(MAX_PAGE_RANGE).fill(null).map((_, i) => {
            return page - Math.floor(MAX_PAGE_RANGE / 2) + i
        }).flat()
    }, [page, totalPage, MAX_PAGE_RANGE])

    const isShowPrevDots = useMemo(() => {
        return page >= Math.ceil(MAX_PAGE_RANGE / 2) + 2
    }, [page, MAX_PAGE_RANGE])

    const isShowNextDots = useMemo(() => {
        return page <= (totalPage - Math.ceil(MAX_PAGE_RANGE / 2) - 1)
    }, [page, totalPage, MAX_PAGE_RANGE])

    const renderItem = (innerPage: number) => {

        const activeStyle = {
            bg: "primary.900",
            color: "white",
            _hover: { bg: "primary.600" },
            _active: { bg: "primary.700" }
        }

        const inactiveStyle = {
            bg: "rgba(217, 217, 217, 0.20)",
            color: "#333",
            _hover: { bg: "primary.200" },
            _active: { bg: "primary.300" }
        }


        const isActive = page === innerPage
        return <Button
            key={Math.random()}
            borderRadius="50%" padding="0" width="32px"
            height="40px"
            onClick={() => onChange?.(innerPage, pageSize)}
            {...isActive ? activeStyle : inactiveStyle}
        >
            {innerPage}
        </Button>
    }

    const prev = () => {
        if (page === 1) {
            return
        }

        onChange?.(page - 1, pageSize)
    }

    const next = () => {
        if (page === totalPage) {
            return
        }

        onChange?.(page + 1, pageSize)
    }
    return (
        <Box display="flex" gap="8px" alignItems="center" {...otherProps}>
            <IconButton
                isDisabled={page === 1}
                rounded="50%"
                bg="rgba(217, 217, 217, 0.20)"
                aria-label="prev page"
                icon={<ChevronLeftIcon />}
                onClick={prev}
            />

            {
                isShowPrevDots ? (
                    <>
                        {renderItem(1)}
                        <Text fontSize="22px" letterSpacing="2px">...</Text>
                    </>
                ) : null
            }

            {
                pageRange.map((item) => {
                    return renderItem(item)
                })
            }

            {
                isShowNextDots ? (
                    <>
                        <Text fontSize="22px" letterSpacing="2px">...</Text>
                        {renderItem(totalPage)}
                    </>
                ) : null
            }

            <IconButton
                isDisabled={page === totalPage}
                rounded="50%"
                bg="rgba(217, 217, 217, 0.20)"
                aria-label="next page"
                icon={<ChevronRightIcon />}
                onClick={next}
            />
        </Box>
    )
}
