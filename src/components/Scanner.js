import React from 'react'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Scanner = ({ master }) => {
  const [checked, setChecked] = useState('Not_Found')
  const [data, setData] = useState('Not Found')
  if (checked == 'Not_Found') {
    return (
      <div style={{ backgroundColor: '#010101', height: '100vh' }}>
        <header>
          <div className='container'>
            <div className='row'>
              <div className='col-2'>
                <NavLink to='/'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-arrow-left-long'
                    size='xl'
                  />
                </NavLink>
              </div>
              <div
                className='col-8 text-center fw-bold'
                style={{ fontSize: '22px' }}
              >
                Add Product
              </div>
              <div className='col-2'>{/*  */}</div>
            </div>
          </div>
        </header>
        <section>
          <div className='container'>
            <div className='row'>
              <div className='px-0'>
                <BarcodeScannerComponent
                  width={'100%'}
                  height={500}
                  onUpdate={(err, result) => {
                    if (result) {
                      master.masterProduct.map((val) => {
                        if (val.barcode == result.text) {
                          setChecked('Master_Data')
                          setData(result.text)
                        } else {
                          setChecked('New_Data')
                          setData(result.text)
                        }
                      })
                    } else setData('Not Found')
                  }}
                />
              </div>

              <p>{data}</p>
            </div>
          </div>
        </section>
      </div>
    )
  } else if (checked == 'Master_Data') {
    return (
      <div>
        <h1>มีข้อมูลเก่า map หา master</h1>
      </div>
    )
  } else if (checked == 'New_Data') {
    return (
      <div>
        <h1>ไม่มีข้อมูลเก่า สร้างใหม่เลย</h1>
      </div>
    )
  } else {
    return (
      <div>
        <h1>fail</h1>
      </div>
    )
  }
  // return()
}
const mapStateToProps = (state) => {
  return {
    master: state.dataProduct,
  }
}
export default connect(mapStateToProps)(Scanner)
