import React, { useState, useEffect } from 'react'
import Navbar from '../utilities/Navbar'
import '../../styles/details.sass'
// import { StarIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { FaCopy, FaBed, FaGasPump, FaWater } from 'react-icons/fa'
import { AiOutlineHeart,AiFillStar,AiFillCheckCircle } from 'react-icons/ai'
import { GiElectric } from 'react-icons/gi'
import axios from 'axios'

import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  Label,
  FormGroup,
} from 'reactstrap'

function Detail() {
  const [searchField, setSearchField] = useState('')
  const url = 'http://localhost:8001/findPostById'
  const [post, setPost] = useState({})
  const [globalRating, setGlobalRating] = useState(0)
  const [comments, setComments] = useState([])

  const [loadingP, setLoadingP] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const imgUrl =
    'https://cloudfront-us-east-1.images.arcpublishing.com/gray/XVMKBJ7L7JAPVCWE2KGHIYBQ3I.jpg'

  const handleChange = (e) => {
    setSearchField(e.target.value)
    console.log(searchField)
  }

  const sumRating = (table) => {
    var a = 0
    table.map((x) => (a = a + x.ratingValue))
    console.log(a)

    return a / table.length
  }

  useEffect(() => {
    getPost()
  }, [])

  const getPost = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')
    axios
      .get(`${url}/${id}`)
      .then((response) => {
        const post = response.data
        setPost(post.result)
        setLoadingP(false)
        console.log(post)
        setGlobalRating(sumRating(response.data.result.rating))
        setComments(post.result.comment)
        console.log(globalRating)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbar searchInput={handleChange} />

      <div className='container'>
        <p className='title'>{loadingP ? 'title' : post.title}</p>
        <div className='subtitles'>
          <p>
            <AiFillStar className='icon' />
            {loadingP ? '' : globalRating}
            <span
              // eslint-disable-next-line no-undef
              onClick={onOpen}
              style={{
                marginLeft: '4px',
                textDecoration: 'underline',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {loadingP ? '' : comments.length} commentaires
            </span>
            <AiFillCheckCircle className='icon2' />
            Verified
            <span
              style={{
                marginLeft: '7px',
                textDecoration: 'underline',
                fontWeight: '600',
              }}
            >
              {loadingP ? '' : post.city + ' ' + post.street}
            </span>
          </p>
          <p style={{ marginLeft: 'auto', display: 'flex' }}>
            <FaCopy />
            <span
              style={{
                marginLeft: '5px',
                textDecoration: 'underline',
                fontWeight: '600',
                marginTop: '-3px',
              }}
            >
              Copier
            </span>
            <AiOutlineHeart style={{ marginLeft: '10px', fontSize: '17px' }} />
            <span
              style={{
                marginLeft: '5px',
                textDecoration: 'underline',
                fontWeight: '600',
                marginTop: '-3px',
              }}
            >
              Enregistrer
            </span>
          </p>
        </div>
        <div className='pics'>
          <div className='first'>
            <img src={loadingP ? { imgUrl } : post.images[0]} alt='pool' />
          </div>
          x{' '}
          <div>
            <img
              src={
                loadingP
                  ? { imgUrl }
                  : post.images[1]
                  ? post.images[1]
                  : post.images[0]
              }
              alt='pool'
            />
            <img
              src={
                loadingP
                  ? { imgUrl }
                  : post.images[2]
                  ? post.images[2]
                  : post.images[0]
              }
              alt='pool'
            />
          </div>
          <div>
            <img
              src={
                loadingP
                  ? { imgUrl }
                  : post.images[3]
                  ? post.images[3]
                  : post.images[0]
              }
              alt='pool'
            />
            <img
              src={
                loadingP
                  ? { imgUrl }
                  : post.images[4]
                  ? post.images[4]
                  : post.images[0]
              }
              alt='pool'
            />
          </div>
        </div>
      </div>
      <Container>
        <Row>
          <Col md='8'>
            <p className='title'>{post.nameUser}</p>
            <div className='subtitles'>
              <p style={{ fontFamily: '400', fontSize: '16px' }}>
                {`${post.nbrBeds} Lit et ${post.nbrBathes} douche , ${post.space} metres carre`}
              </p>
            </div>
            <img
              src={loadingP ? imgUrl : post.imageUser}
              alt='user'
              className='userImg'
            />
            <hr id='first-breaker' />
            <p className='title'>Description</p>
            <p style={{ fontFamily: '400', fontSize: '16px' }}>
              {loadingP ? '' : post.description}
            </p>
            <hr id='first-breaker' />
            <p className='title'>Ce que propose ce logement</p>
            <Row style={{ marginTop: '12px' }}>
              <Col className='colEqp'>
                <div className='colDv'>
                  <FaBed className='iconEquip' /> Furnish
                </div>
                <div className='colDv'>
                  <FaGasPump className='iconEquip' /> Gas
                </div>
              </Col>
              <Col>
                <div className='colDv'>
                  <FaWater className='iconEquip' /> Gas
                </div>
                <div className='colDv'>
                  <GiElectric className='iconEquip' /> Gas
                </div>
              </Col>
            </Row>
          </Col>

          <Col md='4'>
            <Card
              style={{
                padding: '0 15px',
                boxShadow: '0px 6px 16px rgb(0 0 0 / 12%)',
                borderRadius: '9px',
                margin: 'auto',
                width: '92%',
                marginRight: '-1px',
              }}
            >
              <Form>
                <p className='title' style={{ margin: '17px 0' }}>
                  <span style={{ fontFamily: 'sans-serif' }}>
                    {loadingP ? 'title' : post.PricePerNight}$
                  </span>{' '}
                  / nuit
                </p>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='exampleEmail ' style={{ fontWeight: 400 }}>
                        ARRIVE
                      </Label>
                      <Input
                        id='exampleEmail'
                        name='dateDarrive'
                        placeholder='with a placeholder'
                        type='date'
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='exampleEmail' style={{ fontWeight: 400 }}>
                        DEPART
                      </Label>
                      <Input
                        id='exampleEmail'
                        name='dateDarrive'
                        placeholder='with a placeholder'
                        type='date'
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <FormGroup>
                    <Label for='exampleEmail' style={{ fontWeight: 400 }}>
                      Kids
                    </Label>
                    <Input
                      id='nbKids'
                      name='nbKids'
                      placeholder='number of kids'
                      type='number'
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <Label for='exampleEmail' style={{ fontWeight: 400 }}>
                      Adults
                    </Label>
                    <Input
                      id='nbAdults'
                      name='nbAdults'
                      placeholder='number of Adults'
                      type='number'
                    />
                  </FormGroup>
                </Row>

                <Row style={{ padding: '0 12px' }}>
                  <Button
                    style={{
                      backgroundColor: '#FF5A5F',
                      color: 'white',
                      margin: '12px 0',
                    }}
                    onClick={(e) => e.preventDefault}
                  >
                    Verifier la disponibility
                  </Button>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {' '}
            <p>
              <AiFillStar className='icon' />
              {loadingP ? '' : globalRating}
              <span
                // eslint-disable-next-line no-undef
                onClick={onOpen}
                style={{
                  float: 'right',
                  marginRight: '50px',
                  textDecoration: 'underline',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {loadingP ? '' : comments.length} commentaires
              </span>
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingP
              ? ''
              : comments.length === 0
              ? 'there is no commnt'
              : 'there are cmnts'}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={onClose}
              style={{ float: 'left' }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Detail
