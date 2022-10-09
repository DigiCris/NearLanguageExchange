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
  FormLabel,
  Button
} from "@chakra-ui/react"

 import {viewClassesStartToStop, getProfiles, takeClasses} from "../../utils/contract" 
 import { useToast } from '@chakra-ui/react' 
  
  export default function GetAClass() {
    const [myClasses, setMyClasses] = useState([])
    const [allMyClasses, setAllMyClasses] = useState([])
    const [language, setLanguage] = useState("")
    const [teacher, setTeacher] = useState("")
    const [teachTime, setTeachTime] = useState("")
    const [actualizar, setActualizar] = useState(false);

    const toast = useToast();

    const convertBooleanToText = booleanInput => {
      if(booleanInput){
        return "Yes"
      } else {
        return "No"
      }
    }    

    useEffect(()=> {
      const getClasses = async () => {
        const listOfClasses = await viewClassesStartToStop(0, 1000)
        const listOfClassesAvaiable = await listOfClasses.filter(myClass => !myClass.Booked)
        const profilesList = await getProfiles()
        console.log(profilesList)

        console.log("Clase con error: ", listOfClasses[7])

        for(let i = 0; i < listOfClasses.length; i++){
          let teacherId = listOfClasses[i].Teacher 

          let profileOfTeacher = profilesList.find(profile => profile.wallet === teacherId)
          console.log("Aqui",profileOfTeacher)
          if(!profileOfTeacher){
            console.log("Error", i)
          }

          if(profileOfTeacher){
            listOfClasses[i].Teach = profileOfTeacher.teach
          }
          
        }
        console.log(listOfClassesAvaiable)
        setAllMyClasses(listOfClassesAvaiable)
        setMyClasses(listOfClassesAvaiable)
      }
      getClasses()      
    },[actualizar])    

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


    function takeClassesAux(myClass_id)
    {
      let prom=takeClasses(myClass_id);
      prom.then( ()=>{
        toast({
          title: 'The Class is now yours',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setActualizar(!actualizar);
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
      <Th>Take Class</Th>
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
      <Td><Button onClick={() => takeClassesAux(myClass.id)}>Take</Button></Td>
    </Tr>
  ))}
  </Tbody>
</Table>
</div> 
    )
  }