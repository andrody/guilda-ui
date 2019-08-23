import React from 'react'
import { observer } from 'mobx-react'
import LandingBody, { Left, Right } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const apple = require('../../../images/apple.png')
const google = require('../../../images/google.png')

const Footer = observer(props => (
    <div className="md-grid md-cell--10 no-padding download-container">
        <div className="announcement">
            {LandingStore.languagePack[LandingStore.currentLanguage].download.subtitle}
        </div>
        <div className="download flex">
            {
        LandingStore.languagePack[LandingStore.currentLanguage].download.items.map(item =>
          (
              <div key={item.name} className="price-container">
                  <div>{item.name}</div>
                  <div>{item.price}</div>
              </div>
           ))
    }
        </div>
        <div className="flex stores">
            <a href="https://itunes.apple.com/py/app/legapy/id1250619827?l=en&mt=8" target="_blank" rel="noopener noreferrer">
                <img src={apple} className="icon" alt="apple store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.py.pegasus.legapy&hl=pt" target="_blank" rel="noopener noreferrer">
                <img src={google} className="icon" alt="play store" />
            </a>
        </div>
    </div>
))


const Download = observer(() => 
    <LandingBody footer={<Footer />} title={LandingStore.languagePack[LandingStore.currentLanguage].download.title} />
)

export default Download