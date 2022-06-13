import React, { useState, useEffect } from 'react'
import Navbar from '../utilities/Navbar'
import '../../styles/details.sass'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
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
import { parseISO } from 'date-fns'

import { FaCopy, FaBed, FaGasPump, FaWater } from 'react-icons/fa'
import { AiOutlineHeart, AiFillStar, AiFillCheckCircle } from 'react-icons/ai'
import { GiElectric } from 'react-icons/gi'
import axios from 'axios'
import { DateRangePicker } from 'react-date-range'
import * as moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

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
  let navigate = useNavigate()

  const [post, setPost] = useState({})
  const [globalRating, setGlobalRating] = useState(0)
  const [comments, setComments] = useState([])
  const [loadingP, setLoadingP] = useState(true)

  const [reservationDate, setReservationDate] = useState({
    dateDepart: '',
    dateDarive: '',
  })

  const [reservationPrice, setReservationPrice] = useState(true)

  //for calendar seting
  const [selectionRange, setSelectionRange] = useState([])

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
    getDates()
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

  const validDate = (st, en, tab) => {
    let cnt = 0
    if (en === '' || st === '' || en < st) {
      return false
    }

    for (let i = 0; i < tab.length; i++) {
      if (st > tab[i].endDate || en < tab[i].startDate) {
        cnt++
      }
    }
    if (cnt === tab.length) {
      return true
    } else {
      return false
    }
  }

  const getDates = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')
    axios
      .get(`http://localhost:8002/PostHasReservations?idpost=${id}`)
      .then((response) => {
        console.log(response.data.result)
        const tab = []
        // eslint-disable-next-line array-callback-return
        response.data.result.map((x) => {
          tab.push({
            startDate: parseISO(`${x.startDate}`),
            endDate: parseISO(`${x.endDate}`),
            key: 'selection',
          })
        })

        setSelectionRange(tab)
        console.log(tab)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const makeReservation = (e) => {
    e.preventDefault()
    const st = new Date(reservationDate.dateDepart)
    const en = new Date(reservationDate.dateDarive)

    console.log(st, en)
    if (!validDate(st, en, selectionRange)) {
      toast.error('remake your reservation date')
      return false
    }
    axios
      .post('http://localhost:8002/addreservation', {
        startDate: st,
        endDate: en,
        id_post: post.id,
      })
      .then((response) => {
        console.log(response)
        toast.success('reservation made')
      })
      .then(
        setTimeout(() => {
          navigate('/')
        }, 2000)
      )
      .catch((error) => toast.error('check your internet conection'))
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
              src={loadingP && !post.imageUser ? imgUrl : post.imageUser}
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
            <hr id='first-breaker' />
            <Row style={{ marginTop: '40px' }}>
              <DateRangePicker
                ranges={selectionRange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction='horizontal'
                onChange={(item) =>
                  // setSelectionRange(...selectionRange, ...item)
                  console.log('it changed')
                }
              />
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
              <Form onSubmit={makeReservation}>
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
                        DEPART
                      </Label>
                      <Input
                        id='dateDepart'
                        name='dateDepart'
                        placeholder='with a placeholder'
                        type='date'
                        onChange={(e) => {
                          const data = {
                            dateDepart: e.target.value,
                            dateDarive: reservationDate.dateDarive,
                          }
                          setReservationDate(data)
                          setReservationPrice(
                            moment(`${reservationDate.dateDarive}`).diff(
                              moment(`${e.target.value}`),
                              'days'
                            )
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='exampleEmail' style={{ fontWeight: 400 }}>
                        ARRIVE
                      </Label>
                      <Input
                        id='dateDarrive'
                        name='dateDarrive'
                        placeholder='with a placeholder'
                        type='date'
                        onChange={(e) => {
                          const data = {
                            dateDepart: reservationDate.dateDepart,
                            dateDarive: e.target.value,
                          }
                          setReservationDate(data)
                          setReservationPrice(
                            // parseISO(reservationDate.dateDepart) -
                            //   parseISO(reservationDate.dateDarive)
                            moment(`${e.target.value}`).diff(
                              moment(`${reservationDate.dateDepart}`),
                              'days'
                            )
                          )
                          // console.log(reservationPrice)
                        }}
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
                  <p className='title' style={{ margin: '17px 0' }}>
                    <span style={{ fontFamily: 'sans-serif' }}>
                      {isNaN(reservationPrice)
                        ? '0'
                        : reservationPrice * post.PricePerNight}
                      $
                    </span>
                  </p>
                </Row>

                <Row style={{ padding: '0 12px' }}>
                  <Button
                    style={{
                      backgroundColor: '#FF5A5F',
                      color: 'white',
                      margin: '12px 0',
                    }}
                    type='submit'
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
