import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import {
  Center,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Table,
  Image,
  Link,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from "@chakra-ui/react";

import{ useState, React} from "react";

// Chakra-UI
function App() {
  let [appInfo, setAppInfo] = useState(null)
  let [nextLottery,setNextLotteryInfo] = useState(null)
  const winners = () => {
    fetch("http://127.0.0.1:8000/rtickets/winners")
    .then((response) => response.json())
    .then((data) => setAppInfo(data));
  };
  const next = () => {
    fetch("http://127.0.0.1:8000/rtickets/next")
    .then((response) => response.json())
    .then((data) => setNextLotteryInfo(data));
  };
  return (
    <ChakraProvider>
      <Center bg="blue" color="white" padding={48}>
        <VStack>
          <Heading padding={4}>
            Raffle Ace!
          </Heading>
          <Button size="lg" color="black" onClick={winners}>
            Last week's winners
          </Button>
          {appInfo != null && (
           <Table variant="simple" size = "lg" colorScheme="white">
            <Thead>
              <Tr>
                <Th color = "white">Lottery</Th>
                <Th color = "white">Prize</Th>
                <Th color = "white">Winner</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appInfo.map(element => (
                <Tr>
                <Td>{element.lottery}</Td>
                <Td>{element.prize}</Td>
                <Td>{element.winner}</Td>
                </Tr>
              ))}
            </Tbody>
            </Table> 
          )}
          {appInfo = null}
          <Button size="lg" color="black" onClick={next}>
            Coming Prizes
          </Button>
          {nextLottery != null && (
            <VStack>
              <Text fontSize="3x1"> Notification : {nextLottery.message}</Text>
              <Text fontSize="3x1"> Raffle Ticket Name : {nextLottery.lottery}</Text>
              <Text fontSize="3x1"> Date : {nextLottery.date}</Text>
              <Text fontSize="3x1"> Prize : {nextLottery.prize}</Text>
              <Text fontSize="3x1"> price : {nextLottery.price}</Text>
            </VStack>
          )}
          {nextLottery = null};
        </VStack>
      </Center>
    </ChakraProvider>
  )
}

export default App;
