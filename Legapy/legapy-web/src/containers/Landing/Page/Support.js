import React from 'react'
import { observer } from 'mobx-react'
import ReactIframeResizer from 'react-iframe-resizer-super'
import LandingBody, { Left } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const Footer = observer(() => (
    <div className="md-grid md-cell--10 no-padding download-container">
        <div className="flex support flex-wrap">
            <div className="video-container">
                <ReactIframeResizer
                  style={{ height: '100%', width: '100%' }}
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Flegapyapp%2Fvideos%2F155042808534771%2F&show_text=0&width=560"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                />
            </div>
            <div className="video-container">
                <ReactIframeResizer
                  style={{ height: '100%', width: '100%' }}
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Flegapyapp%2Fvideos%2F2061595773880743%2F&show_text=0&width=560"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                />
            </div>
            <div className="video-container">
                <ReactIframeResizer
                  style={{ height: '100%', width: '100%' }}
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Flegapyapp%2Fvideos%2F2016157021757952%2F&show_text=0&width=560"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                />
            </div>
            <div className="video-container">
                <ReactIframeResizer
                  style={{ height: '100%', width: '100%' }}
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Flegapyapp%2Fvideos%2F2061599690547018%2F&show_text=0&width=560"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                />
            </div>
        </div>
    </div>
))

const Support = observer(() => 
    <LandingBody footer={<Footer />} title={LandingStore.languagePack[LandingStore.currentLanguage].support.title} >
        <Left
          title={LandingStore.languagePack[LandingStore.currentLanguage].support.subtitle}
          description={LandingStore.languagePack[LandingStore.currentLanguage].support.description}
        />
    </LandingBody>
)

export default Support
