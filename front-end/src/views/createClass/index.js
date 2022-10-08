import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  } from '@chakra-ui/react';
  import { setClasses } from '../../utils/contract';
  import { useState } from 'react';
  import { useToast } from '@chakra-ui/react'
  
  export default function CreateClass() {
  const [fromTeachHour, setFromTeachHour] = useState(0)
  const [toTeachHour, setToTeachHour] = useState(0)
  const [teachDay, setToTeachDay] = useState("")

  const toast = useToast()

    const createClass = () => {
        const stringDate = getRightStringDate()
        if(stringDate === null) {
            console.log("Not valid")
        }
        let prom=setClasses(stringDate)
        prom.then( ()=>{
          toast({
            title: 'Class created',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } ).catch(function(e) {
          console.log("toast error");
          console.log(e.kind.ExecutionError); // "oh, no!"
            toast({
              title: 'Failed.',
              description: e.kind.ExecutionError,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
        });
    }

    const getRightStringDate = () => {
        if(teachDay.length === 0) {
            return null
        }

        if(toTeachHour <= fromTeachHour) {
            return null
        }

        return teachDay + "/" + fromTeachHour + "-" + toTeachHour
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Create a class
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Tell us when you can teach your language
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>From hour</FormLabel>
                    <NumberInput defaultValue={0} min={0} max={23}  onChange={e => setFromTeachHour(e)} >
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>To hour</FormLabel>
                    <NumberInput defaultValue={0} min={0} max={23}  onChange={e => setToTeachHour(e)} >
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Day</FormLabel>
                <Input type="date" value={teachDay} onChange={e => setToTeachDay(e.target.value)}/>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={() => createClass()}
                  >
                  Create Class
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }