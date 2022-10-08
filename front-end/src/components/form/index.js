import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    useColorModeValue,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
import {createProfile} from "../../utils/contract"  
import { getAccountId } from '../../utils/near';
import { useState } from 'react';

import { logout } from "../../utils/near";

  
  export default function FormCard() {
    const [age, setAge] = useState(18)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [sex, setSex] = useState(true)
    const [country, setCountry] = useState("")
    const [learn, setLearn] = useState("")
    const [teach, setTeach] = useState("")
    const [fromTeachTime, setFromTeachTime] = useState("")
    const [fromTeachHour, setFromTeachHour] = useState(0)
    const [toTeachTime, setToTeachTime] = useState("")
    const [toTeachHour, setToTeachHour] = useState(0)    
    const [meet, setMeet] = useState("")

    const getPeriodOfClasses = () => {
      let period = fromTeachTime + "-hour:" + fromTeachHour + "/" + toTeachTime + "-hour:" + toTeachHour
      console.log(period)
      return period
    }

    const createProfileWithForm = () => {
      const period = getPeriodOfClasses()
      return createProfile(name, description, age, country, learn, teach, period,meet)
    }

    return (
        <Flex
        minH={'100vh'}
        minW={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="description">
                    <FormLabel>Description</FormLabel>
                    <Input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                <FormControl id="Teaching">
                    <FormLabel>Age</FormLabel>
                    <NumberInput defaultValue={18} min={18} max={122}>
                    <NumberInputField value={age} onChange={e => setAge(e.target.value)}/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="sex">
                  <Select placeholder='Select option' value={sex} onChange={e => setSex(e.target.value)}>
                      <option value={true}>Masculine</option>
                      <option value={false}>Femenine</option>
                  </Select>
                  </FormControl>
                </Box>                
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="country">
                    <FormLabel>Country</FormLabel>
                    <Input type="text" value={country} onChange={e => setCountry(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="learning">
                    <FormLabel>Learning</FormLabel>
                    <Input type="text" value={learn} onChange={e => setLearn(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="teaching">
                    <FormLabel>Teaching</FormLabel>
                    <Input type="text" value={teach} onChange={e => setTeach(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meeting">
                    <FormLabel>Meeting Link</FormLabel>
                    <Input type="text" value={meet} onChange={e => setMeet(e.target.value)}/>
                  </FormControl>
                </Box>                
              </HStack>         
              <HStack>
                <Box>
                  <FormControl id="Teaching">
                    <FormLabel>Teach Time From</FormLabel>
                    <Input type="date" value={fromTeachTime} onChange={e => setFromTeachTime(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="Teaching" >
                    <FormLabel>Teach Hour From</FormLabel>
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
                  <FormControl id="Teaching">
                    <FormLabel>Teach Time To</FormLabel>
                    <Input type="date" value={toTeachTime} onChange={e => setToTeachTime(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="Teaching">
                    <FormLabel>Teach Hour To</FormLabel>
                    <NumberInput defaultValue={0} min={0} max={23} onChange={e => setToTeachHour(e)}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </FormControl>
                </Box>                             
              </HStack>                        
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=> createProfileWithForm()}
                  >
                  Create
                </Button>
              </Stack>
            </Stack>
        </Box>   
    </Flex>    
    );
  }