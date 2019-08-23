import React, { Component } from 'react'
import { observer } from 'mobx-react'
import LandingStore from '../../../stores/Landing'

const Landing = observer((props) => 
    <section>
        <div className="bg-landing flex" />
        <h1 className="title-effect">
            {LandingStore.languagePack[LandingStore.currentLanguage].landing.title}
        </h1>
    </section>)

export default Landing
