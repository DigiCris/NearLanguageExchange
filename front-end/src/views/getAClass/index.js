import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  HStack, 
  FormControl,
  FormLabel
} from "@chakra-ui/react"

 import {viewClassesStartToStop, getProfiles, takeClasses} from "../../utils/contract"  
  
  export default function GetAClass() {
    const [myClasses, setMyClasses] = useState([])
    const [allMyClasses, setAllMyClasses] = useState([])
    const [language, setLanguage] = useState("")
    const [teacher, setTeacher] = useState("")
    const [teachTime, setTeachTime] = useState("")

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
        const listOfClassesAvaiable = await listOfClasses.filter(myClass => !myClass.Booked)
        const profilesList = await getProfiles()

        for(let i = 0; i < listOfClasses.length; i++){
          let teacherId = listOfClasses[i].Teacher 

          let profileOfTeacher = profilesList.find(profile => profile.wallet === teacherId)

          console.log(profileOfTeacher)
          listOfClasses[i].Teach = profileOfTeacher.teach


        }
        console.log(listOfClassesAvaiable)
        setAllMyClasses(listOfClassesAvaiable)
        setMyClasses(listOfClassesAvaiable)
      }
      getClasses()      
    },[])    

    useEffect(()=> {
      filterData()
    },[language, teacher, teachTime])
    
    const filterData = () => {
      let myCurrentClasses = allMyClasses


      if(language) {
        myCurrentClasses = myCurrentClasses.filter(myClass => myClass.Teach.toLowerCase().includes(language.toLowerCase()))
      } 

      if(teacher) {
        myCurrentClasses = myCurrentClasses.filter(myClass => myClass.Teacher.toLowerCase().includes(teacher.toLowerCase()))
      }

      if(teachTime){
        myCurrentClasses = myCurrentClasses.filter(myClass => myClass.Date.includes(teachTime))
      }

      setMyClasses(myCurrentClasses)
    }

return (
<div> 
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>Teacher Name</FormLabel>
                    <Input type="text" value={teacher} onChange={e => setTeacher(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="description">
                    <FormLabel>Language</FormLabel>
                    <Input type="text" value={language} onChange={e => setLanguage(e.target.value)}/>
                  </FormControl>
                </Box>  
                <Box>
                  <FormControl id="description">
                    <FormLabel>Date</FormLabel>
                    <Input type="date" teachTime={teachTime} onChange={e => setTeachTime(e.target.value)}/>
                  </FormControl>
                </Box>                        
              </HStack> 
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>Language</Th>
      <Th>Date</Th>
      <Th>Teacher stars</Th>
      <Th>Taken</Th>
      <Th>Released</Th>
      <Th>Teacher</Th>
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
      <button onClick={() => takeClasses(myClass.id)}>Take class</button>
    </Tr>
  ))}
  </Tbody>
</Table>
</div> 
    )
  }