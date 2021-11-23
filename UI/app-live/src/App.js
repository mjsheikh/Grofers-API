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
  let [statsInfo,setStatsInfo] = useState(null)

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
  const stats = () => {
    fetch("http://127.0.0.1:8000/rtickets/all")
    .then((response) => response.json())
    .then((data) => setStatsInfo(data));
  };
  return (
    <ChakraProvider>
      <Center bg="blue" color="white" padding={60}>
        <VStack>
          <Heading padding={4}>
            Raffle Ace!
          </Heading>

          {/* Fetch winners from lucky draws of last week */}

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

          {/* Fetch the next coming lucky and report its specifications */}

          <Button size="lg" color="black" onClick={next}>
            Coming up next!
          </Button>
          {nextLottery != null && (
            <VStack>
              <Text fontSize="3x1"> Notification : {nextLottery.message}</Text>
              <Text fontSize="3x1"> Raffle Ticket Name : {nextLottery.lottery}</Text>
              <Text fontSize="3x1"> Date : {nextLottery.date}</Text>
              <Text fontSize="3x1"> Prize : {nextLottery.prize}</Text>
              <Text fontSize="3x1"> Price : {nextLottery.price}</Text>
            </VStack>
          )}
          {nextLottery = null};

          {/* Fetch statistics of all tickets till date */}
          <Button size="lg" color="black" onClick={stats}>
            Statistics
          </Button>
          {statsInfo != null && (
           <Table variant="simple" size = "lg" colorScheme="white">
            <Thead>
              <Tr>
                <Th color = "white">Lottery</Th>
                <Th color = "white">Participants</Th>
                <Th color = "white">Winner</Th>
              </Tr>
            </Thead>
            <Tbody>
              {statsInfo.map(element => (
                <Tr>
                <Td>{element.lottery}</Td>
                <Td>{element.applicants.length}</Td>
                <Td>{element.winner}</Td>
                </Tr>
              ))}
            </Tbody>
            </Table> 
          )}
          {statsInfo = null}
        </VStack>
      </Center>
    </ChakraProvider>
  )
}

export default App;
