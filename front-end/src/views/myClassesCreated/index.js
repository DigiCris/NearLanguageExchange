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
  
  export default function MyClassesCreated() {
    const [myClasses, setMyClasses] = useState([])


    useEffect(()=> {
      const getClasses = async () => {
        const listOfClasses = await viewClassesStartToStop(0, 10)
        const myAccount = await getAccountId()
        const listOfClassesCreatedByUser = listOfClasses.filter(myClass => myClass.Teacher === myAccount)
        console.log(listOfClassesCreatedByUser)
        setMyClasses(listOfClassesCreatedByUser)
      }
      getClasses()      
    },[])

    const convertBooleanToText = booleanInput => {
      if(booleanInput){
        return "Yes"
      } else {
        return "No"
      }
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
      <Td><Button disabled={myClass.Given} onClick={()=>markClassGiven(myClass.id)}>Mark</Button></Td>
    </Tr>
  ))}
  </Tbody>
</Table>
</div>
    )
  }