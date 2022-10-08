import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  HStack,
  Box,
  Select
} from "@chakra-ui/react"
 import RateModal from "../../components/rateModal"
 import {viewClassesStartToStop, getProfiles} from "../../utils/contract"  
 import {getAccountId } from "../../utils/near"
  
  export default function MyClassesCreated() {
    const [myClasses, setMyClasses] = useState([])
    const [allMyClasses, setAllMyClasses] = useState([])
    const [isClassTaken, setIsClassTaken] = useState(true)

    const convertBooleanToText = booleanInput => {
      if(booleanInput){
        return "Yes"
      } else {
        return "No"
      }
    }  

    useEffect(()=> {
      const getClasses = async () => {
        const listOfClasses = await viewClassesStartToStop(0, 10)
        const accountId = await getAccountId()
        const listOfClassesAvaiable = await listOfClasses.filter(myClass => myClass.Student === accountId)
        const profilesList = await getProfiles()

        for(let i = 0; i < listOfClasses.length; i++){
          let teacherId = listOfClasses[i].Teacher 

          let profileOfTeacher = profilesList.find(profile => profile.wallet === teacherId)
          listOfClasses[i].Teach = profileOfTeacher.teach
          listOfClasses[i].Meet = profileOfTeacher.meet

        }
        setMyClasses(listOfClassesAvaiable)
        setAllMyClasses(listOfClassesAvaiable)
      }
      getClasses()      
    },[])
    
    useEffect(()=> {
      console.log(allMyClasses)
      const listOfClasses = allMyClasses.filter(currentClass => currentClass.Taken == isClassTaken)
      console.log(isClassTaken)
      setMyClasses(listOfClasses)
    },[isClassTaken])
    
return (
<div> 
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>Language</Th>
      <Th>Date</Th>
      <Th>Given</Th>
      <Th>Taken</Th>
      <Th>Released</Th>
      <Th>Teacher</Th>
      <Th>Meet</Th>
      <Th>Mark as taken</Th>
    </Tr>
  </Thead>
  <Tbody>
  {myClasses.map((myClass, i) => (
    <Tr key={i}>
      <Td>{myClass.Teach}</Td>
      <Td>{myClass.Date}</Td>
      <Td>{convertBooleanToText(myClass.Given)}</Td>
      <Td>{convertBooleanToText(myClass.Taken)}</Td>
      <Td>{convertBooleanToText(myClass.Released)}</Td>
      <Td>{myClass.Teacher}</Td>
      <Td>{myClass.Meet}</Td>
      <Td><RateModal myClass={myClass}/></Td>
    </Tr>
  ))}
  </Tbody>
</Table>
</div> 
    )
  }