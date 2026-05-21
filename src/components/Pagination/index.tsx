import { Flex, Button, ButtonGroup, FlexProps } from "@chakra-ui/react";

interface PaginationProps extends FlexProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  ...containProps
}) => {
  let pageNumbers: number[] = [];
  if (totalPages <= 5) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, 5, 0, totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, 0, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPages];
    }
  }

  return (
    <Flex {...containProps}>
      <ButtonGroup>
        {currentPage > 1 && (
          <Button
            onClick={() => onPageChange(currentPage - 1)} borderRadius="50%" padding="0" width="32px" height="40px" bg="#D9D9D933" color="primary.900" _hover={{ bg: "primary.200" }} _active={{ bg: "primary.300" }}>
            {'<'}-
          </Button>
        )}
        {pageNumbers.map((page, index) => (
          page === 0 ? (
            <Button
              key={page + "+" + index}
              borderRadius="50%" padding="0" width="32px" height="40px"
              isDisabled

            >...</Button>
          ) : (
            <Button
              key={page + "+" + index}
              borderRadius="50%" padding="0" width="32px"
              height="40px"
              onClick={() => onPageChange(page)}
              _hover={{ bg: currentPage === page ? "primary.600" : "primary.200" }}
              _active={{ bg: currentPage === page ? "primary.700" : "primary.200" }}
              bg={currentPage === page ? "primary.900" : "#D9D9D933"}
              color={currentPage === page ? "white" : "#00000033"}
            >
              {page}
            </Button>
          )
        ))}
        {currentPage < totalPages && (
          <Button onClick={() => onPageChange(currentPage + 1)} borderRadius="50%" padding="0" width="32px" height="40px"
            bg="#D9D9D933" color="primary.900" _hover={{ bg: "primary.200" }} _active={{ bg: "primary.300" }}
          >
            -{'>'}
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Pagination;

