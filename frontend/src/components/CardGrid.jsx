import { SimpleGrid, Box } from "@chakra-ui/react";

export default function CardGrid  ({ children }){
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      spacing="4"
      gap="2"
      px="4"
      w="full"
    >
      {children}
    </SimpleGrid>
  );
};