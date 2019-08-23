import React from 'react'
import { observer } from 'mobx-react'
import LandingBody, { Left, Right } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const auction = require('../../../images/auction.png')
const libra = require('../../../images/libra.png')
const father = require('../../../images/father.png')
const school = require('../../../images/school.png')
const work = require('../../../images/work.png')
const write = require('../../../images/write.png')
const text = require('../../../images/text.png')

const LeftDescription = observer(props => (
    <div>
        <p>
            {LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.left.p1}
        </p>
        <br />
        <p>
            {LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.left.p2}
        </p>
        <br />
        <p>
            {LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.left.p3}
        </p>
    </div>
))

const RightDescription = observer(props => (
    <div className="flex">
        <ul className="flex flex-column flex-wrap">
            <li className="flex aling-center item-list">
                <img src={school} alt="auction" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item1}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={school} alt="auction" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item2}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={auction} alt="auction" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item3}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={school} alt="auction" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item4}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={libra} alt="libra" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item5}</p>
            </li>
        </ul>
        <ul className="flex flex-column flex-wrap column-2">
            <li className="flex aling-center item-list">
                <img src={father} alt="libra" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item6}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={work} alt="libra" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item7}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={write} alt="libra" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item8}</p>
            </li>
            <li className="flex aling-center item-list">
                <img src={text} alt="libra" className="icon" />
                <p className="item">{LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.item9}</p>
            </li>
        </ul>
    </div>
))

const About = observer(() =>
    <LandingBody title={LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.title}>
        <Left title={LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.left.title} description={<LeftDescription />} />
        <Right title={LandingStore.languagePack[LandingStore.currentLanguage].aboutUs.body.right.title} description={<RightDescription />} />
    </LandingBody>
)

export default About
