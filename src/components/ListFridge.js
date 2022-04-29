import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Page.module.css'
import './css/MyBootstrap.css'

const ListFridge = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)

  const ref = firebase
    .firestore()
    .collection('product')
    .doc('userID')
    .collection('category')
  const [dataUser, setDataUser] = useState([{}])
  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
        // console.log("items",doc.data())
      })
      setDataUser(items)
      // console.log('Output_dataUser', dataUser)
    })
  }, [])
  //   console.log("Output",ref)
  if (dataUser.length !== 0) {
    console.log('Output_dataUser', dataUser)
  } else {
    console.log('null')
  }
  return (
    <div className='container'>
      {dataUser.map((item, index) => (
        <div style={{ borderRadius: '18px' }} className='row py-2' key={index}>
          <a
            href='#'
            className={`list-group-item d-flex gap-3 ${styles.itemFridge}`}
            aria-current='true'
            onClick={() => {
              setModalData(item)
              toggle()
            }}
          >
            <FontAwesomeIcon icon='fa-solid fa-snowflake' size='4x' />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className='mb-0'>Fridge 1</p>
                <Button
                  className='w-100'
                  color='warning'
                  style={{ borderRadius: '10px' }}
                >
                  Default
                </Button>
              </div>
            </div>
          </a>
        </div>
      ))}
      <div>
        <Modal size='sm' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Name :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {modalData.name}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Total Food :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {modalData.totalfood} 14 {/*test */}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Notification :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {modalData.noti}
                </h6>
              </div>

              <div className='row py-2'>
                <Button
                  className='w-100 py-3 fw-bold'
                  color='warning text-white'
                  style={{ borderRadius: '16px' }}
                >
                  Share&nbsp;&nbsp;
                  <FontAwesomeIcon
                    icon='fa-solid fa-share-nodes'
                    size='xl'
                    style={{ color: 'black' }}
                  />
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataCategory,
  }
}

export default connect(mapStateToProps)(ListFridge)
