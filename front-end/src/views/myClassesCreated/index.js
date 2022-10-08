import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  HStack,
  Box
} from "@chakra-ui/react"

 import {viewClassesStartToStop, markClassGiven} from "../../utils/contract"  
 import {getAccountId} from "../../utils/near"
 import { useToast } from '@chakra-ui/react'
  
  export default function MyClassesCreated() {
    const [myClasses, setMyClasses] = useState([])
    const [reload, setReload] = useState(false);

    const toast = useToast()

    useEffect(()=> {
      const getClasses = async () => {
        const listOfClasses = await viewClassesStartToStop(0, 10)
        const myAccount = await getAccountId()
        const listOfClassesCreatedByUser = listOfClasses.filter(myClass => myClass.Teacher === myAccount)
        console.log(listOfClassesCreatedByUser)
        setMyClasses(listOfClassesCreatedByUser)
      }
      getClasses()      
    },[reload])

    const convertBooleanToText = booleanInput => {
      if(booleanInput){
        return "Yes"
      } else {
        return "No"
      }
    }    

function markClassGivenAux(myClass_id)
{
  let prom=markClassGiven(myClass_id)
  prom.then( ()=>{
    toast({
      title: 'Class Marked as given',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    setReload(!reload);
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


return (
<div>
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>Is Booked</Th>
      <Th>Date</Th>
      <Th>Given</Th>
      <Th>Taken</Th>
      <Th>Released</Th>
      <Th>Student</Th>
      <Th>Mark class as given</Th>
    </Tr>
  </Thead>
  <Tbody>
  {myClasses.map((myClass, i) => (
    <Tr key={i}>
      <Td>{convertBooleanToText(myClass.Booked)}</Td>
      <Td>{myClass.Date}</Td>
      <Td>{convertBooleanToText(myClass.Given)}</Td>
      <Td>{convertBooleanToText(myClass.Taken)}</Td>
      <Td>{convertBooleanToText(myClass.Released)}</Td>
      <Td>{myClass.Student}</Td>
      <Td><Button disabled={myClass.Given} onClick={()=>markClassGivenAux(myClass.id)}>Mark</Button></Td>
    </Tr>
  ))}
  </Tbody>
</Table>
</div>
    )
  }