import React from 'react'
import { observer } from 'mobx-react'
import LandingBody, { Left, Right } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const LeftDescription = observer(props => (
    <div>
        {
          LandingStore.languagePack[LandingStore.currentLanguage].funcionalidades.left.p.map(p =>
            (
                <div key={p}>
                    <p>
                        {p}
                    </p>
                    <br />
                </div>
            ))
      }
    </div>
))

const Footer = observer(props => (
    <div className="md-grid md-cell--10 no-padding funcionalidades flex">
        {
      LandingStore.languagePack[LandingStore.currentLanguage].funcionalidades.left.footer.map(item => (
          <div className="flex container" key={item.title}>
              <img className="icon" src={require(`../../../images/${item.icon}.png`)} alt="lupa" />
              <div className="wrapper">
                  <div className="title">{item.title}</div>
                  <div className="subtitle">{item.subtitle}</div>
              </div>
          </div>
      ))
  }
    </div>
))


const Functionalities = observer(() =>
    <LandingBody footer={<Footer />} title={LandingStore.languagePack[LandingStore.currentLanguage].funcionalidades.title}>
        <Left title={LandingStore.languagePack[LandingStore.currentLanguage].funcionalidades.left.title} description={<LeftDescription />} />
    </LandingBody>
)

export default Functionalities
