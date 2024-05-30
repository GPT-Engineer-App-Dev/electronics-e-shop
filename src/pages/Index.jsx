import { Box, Container, Flex, Heading, Image, SimpleGrid, Text, VStack, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    image: "smartphone.jpg",
    price: 699,
    category: "smartphone",
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    image: "laptop.jpg",
    price: 999,
    category: "laptop",
  },
  {
    id: 3,
    name: "Tablet",
    description: "Portable and powerful tablet",
    image: "tablet.jpg",
    price: 499,
    category: "tablet",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value.split("-");
    setPriceRange([parseInt(value[0]), parseInt(value[1])]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesPriceRange && matchesSearchQuery;
  });

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="lg">ElectroShop</Heading>
        <Flex>
          <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
          <Link to="/products">Products</Link>
        </Flex>
      </Flex>

      <VStack spacing={8} mt={8}>
        <Heading as="h1" size="2xl">Welcome to ElectroShop</Heading>
        <Text fontSize="lg">Your one-stop shop for the latest electronics</Text>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="lg"
          mt={4}
        />
      </VStack>

      <VStack spacing={4} mt={4}>
        <Select placeholder="Select category" value={category} onChange={handleCategoryChange}>
          <option value="smartphone">Smartphone</option>
          <option value="laptop">Laptop</option>
          <option value="tablet">Tablet</option>
        </Select>
        <Select placeholder="Select price range" onChange={handlePriceRangeChange}>
          <option value="0-499">0 - 499</option>
          <option value="500-999">500 - 999</option>
          <option value="1000-1499">1000 - 1499</option>
        </Select>
      </VStack>

      <Box mt={10}>
        <Heading as="h2" size="xl" mb={6}>Featured Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.image} alt={product.name} />
              <Box p={6}>
                <Heading as="h3" size="md">{product.name}</Heading>
                <Text mt={4}>{product.description}</Text>
                <Text mt={4} fontWeight="bold">${product.price}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;