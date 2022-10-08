import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack, 
  Link as DefaultLink
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Log from '../log';

const NavLink = ({to, name} ) => (
  <DefaultLink
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={`${to}`}
    >
    {name}
  </DefaultLink>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Links = [{name:'Home', to: ""}, {name:'Profile', to: "profile"}, {name:'My classes created', to: "created"}, {name:"My classes taken", to: "taken"}, {name:"Get a class", to: "get"}, {name:"Exchange",to: "exchange"}];

  return (
    <div>
      <Box bg={useColorModeValue('blue.400', 'blue.400')} px={4}><Log />
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, i) => (
                <NavLink key={i} to={link.to} name={link.name} />
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, i) => (
                <NavLink key={i} to={link.to} name={link.name} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box> 
    </div>
  );
}