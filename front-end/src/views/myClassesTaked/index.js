import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'

  import {MdCheckCircle} from "@chakra-ui/icons"

  import React from 'react'
  
  export default function MyClassesTaked() {
    return (
        <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        {/* You can also use custom icons from react-icons */}
        <ListItem>
          <ListIcon as={MdSettings} color='green.500' />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    )
  }
  