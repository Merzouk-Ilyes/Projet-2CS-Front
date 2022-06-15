/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Navbar from '../utilities/Navbar'
import { Container, Row, Col } from 'reactstrap'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { BsCheck2Circle, BsSnow } from 'react-icons/bs'

import '../../styles/profile.sass'
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

const profile = () => {
  const [searchField, setSearchField] = useState('')
  const [user, setUser] = useState('')

  const [image, setImage] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [src, setSrc] = useState('')

  const getUser = () => {
    let userSession = JSON.parse(sessionStorage.getItem('USER'))
    setUser(userSession.user)
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleChange = (e) => {
    setSearchField(e.target.value)
  }

  return (
    <div>
      <Navbar searchInput={handleChange} />
      <Container>
        <Row>
          <Col>
            <h1>hello {user.firstname} , you wanna change your image ?</h1>

            <button
              type='button'
              className='upload-file101'
              onClick={() => {
                document.getElementById('file').click()
              }}
            >
              {' '}
              Upload image &nbsp;&nbsp;&nbsp; <BsFillCloudUploadFill />{' '}
            </button>
            <input
              type='file'
              id='file'
              name='file'
              value={image}
              onChange={(e) => {
                setProfilePic(e.target.files[0])
                setSrc(URL.createObjectURL(e.target.files[0]))
              }}
            />
            <button className='btn' type='submit'>
              Change image
            </button>
            <div className='profilePicDiv'>
              <img src={src} className='profilePic' />
            </div>
          </Col>
          <Col>
            {
              /* {loading ? <Spinner size='lg' /> : posts.map((post, i) => (*/
              <AdminPostCard
                key={0}
                id={0}
                imageUrl={src}
                title={'titre'}
                price={300}
                baths={3}
                beds={5}
                rating={4}
                verified={true}
                space={230}
                city={'sisidika'}
                // feedBack={post.feedBack.description ?? ""}
                feedBack={''}
              />
              /*  ))} */
            }
            {
              /* {loading ? <Spinner size='lg' /> : posts.map((post, i) => (*/
              <AdminPostCard
                key={0}
                id={0}
                imageUrl={src}
                title={'titre'}
                price={300}
                baths={3}
                beds={5}
                rating={4}
                verified={true}
                space={230}
                city={'sisidika'}
                // feedBack={post.feedBack.description ?? ""}
                feedBack={''}
              />
              /*  ))} */
            }
          </Col>
        </Row>
        <Row className='favourite_items'>
          <h1 style={{ fontWeight: '600' }}>Whihlist</h1>
        </Row>
      </Container>
    </div>
  )
}

export default profile

function AdminPostCard({
  imageUrl,
  title,
  price,
  baths,
  beds,
  rating,
  verified,
  space,
  city,
  id,
  agents,
  feedBack,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Center py={6}>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w={{ sm: '90%', md: '540px' }}
        height={{ sm: '400px', md: '300px' }}
        direction={{ base: 'row', md: 'row' }}
        bg={'white'}
        boxShadow={'2xl'}
        padding={4}
      >
        <Flex flex={1} bg='blue.200'>
          <Image objectFit='cover' boxSize='100%' src={imageUrl} />
        </Flex>
        <Stack
          flex={1}
          flexDirection='column'
          justifyContent='space-around'
          alignItems='center'
          p={1}
          pt={2}
        >
          <div className='flex justify-between'>
            <Heading fontSize={'2xl'} fontFamily={'body'} className='flex  '>
              {title}
            </Heading>

            {verified ? (
              <Badge
                display='flex'
                alignItems='center'
                borderRadius='full'
                px='2'
                mx='2'
                colorScheme='teal'
              >
                <BsCheck2Circle />
              </Badge>
            ) : (
              ''
            )}
          </div>
          <Text fontWeight={600} color={'gray.500'} size='sm' mb={4}>
            {city}
          </Text>
          <Text textAlign={'center'} color={'gray.700'} px={3}>
            {beds} BEDS • {baths} BATHS •{space} M°2
          </Text>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge px={2} py={1} bg={'gray.50'} fontWeight={'400'}>
              $ {price}/ night
            </Badge>
          </Stack>

          <Button
            width={'200px'}
            height={'45px'}
            fontSize={'sm'}
            rounded={'lg'}
            bg={'#FF5A5F'}
            color={'white'}
            className=''
            _hover={{
              bg: '#FF4A4F',
            }}
            _focus={{
              bg: '#FF4A4F',
            }}
            onClick={onOpen}
          >
            See details
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}
