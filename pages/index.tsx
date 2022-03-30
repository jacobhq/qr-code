import { ViewIcon, TimeIcon, RepeatClockIcon, HamburgerIcon, EmailIcon, AttachmentIcon, CopyIcon } from '@chakra-ui/icons'
import { Text, Link, Box, Heading, ButtonGroup, Tooltip, IconButton, InputGroup, InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Slider, SliderTrack, SliderFilledTrack, SliderThumb, ModalFooter, Button, useColorMode, useDisclosure } from '@chakra-ui/react'
import { time } from 'console'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import { start } from 'repl'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [num, setNum] = useState(3)
  let [toolbar, setToolbar] = useState(true)

  const { colorMode, toggleColorMode } = useColorMode()

  function hideToolbar() {
    setToolbar(false)
  }

  function showToolbar() {
    setToolbar(true)
  }

  return (
    <div>
      <Head>
        <title>QR code</title>
      </Head>
      <Box position="fixed" transform="translate(-50%, -50%)" left="50%" top="50%">
        <Heading size="4xl">
          QR code
        </Heading>
      </Box>
      <ButtonGroup p={2} borderRadius={8} position="fixed" left={10} bottom={10} hidden={toolbar}>
        <Tooltip label="Show toolbar">
          <IconButton
            colorScheme="blue"
            variant="ghost"
            aria-label="Search database"
            icon={<ViewIcon />}
            onClick={showToolbar}
          />
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup p={2} borderRadius={8} position="fixed" transform="translate(-50%, 0)" left="50%" bottom={10} hidden={!toolbar}>
        <Tooltip label="Copy icon to clipboard">
          <IconButton
            colorScheme="blue"
            aria-label="Copy icon to clipboard"
            icon={<CopyIcon />}
          />
        </Tooltip>
        <Tooltip label="Press enter to submit">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <AttachmentIcon color={colorMode === 'light' ? 'blue.600' : 'blue.200'} />
            </InputLeftElement>
            <Input size="lg" variant="flushed" textAlign="center" />
          </InputGroup>
        </Tooltip>
        <Tooltip label='Reset timer'>
          <IconButton
            colorScheme="blue"
            variant="ghost"
            aria-label="Search database"
            icon={<RepeatClockIcon />}
          />
        </Tooltip>
        <Menu>
          <MenuButton as={IconButton} variant="ghost" icon={<HamburgerIcon />} colorScheme="blue" />
          <MenuList>
            <MenuItem onClick={toggleColorMode}>Toggle theme</MenuItem>
            <MenuItem onClick={hideToolbar}>Hide toolbar</MenuItem>
            <MenuItem onClick={() => router.push('https://id.jacob.omg.lol')}>Manage JHQ ID</MenuItem>
            <MenuDivider />
            <MenuItem onClick={onOpen}>Donate to JacobHQ</MenuItem>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Heading>{num}</Heading>
                  <Text>{num > 1 ? 'coffees' : 'coffee'}</Text>
                  <Slider aria-label='slider-ex-1' defaultValue={3} min={1} max={10} onChange={(val) => setNum(val)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </ModalBody>

                <ModalFooter>
                  <ButtonGroup>
                    <Link href={`https://buy.jacob.omg.lol/donate/${num}`} _hover={{ testDecoration: 'none' }}>
                      <Button colorScheme="blue">Donate {num} {num > 1 ? 'coffees' : 'coffee'}</Button>
                    </Link>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </div>
  )
}

export default Home
