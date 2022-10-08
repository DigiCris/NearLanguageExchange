import React, {useRef, useState} from "react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
  } from '@chakra-ui/react'

import {rateProfile} from "../../utils/contract"  

  function InitialFocus({myClass}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(0)
    
  
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    

    console.log(myClass)
  
    return (
      <>
        <Button onClick={onOpen} disabled={myClass.Taken}>Rate Class</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rate Class</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Input ref={initialRef} placeholder='Comment' value={comment} onChange={e => setComment(e.target.value)}/>
              </FormControl>
              <FormControl mt={4}>
                    <FormLabel>Rate between 0 and 5</FormLabel>
                    <NumberInput defaultValue={0} min={0} max={5} value={rate} onChange={e => setRate(e)} >
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>rateProfile(myClass.id, myClass.Teacher, comment, 5)}>
                Rate
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }  

export default InitialFocus