import React from 'react'
import { observer } from 'mobx-react'
import LandingBody, { Left, Right } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const fb = require('../../../images/social-round-facebook.png')

const Form = observer(() =>
    (
        <article className="md-grid md-cell--10 no-padding download-container">
            <form className="form-container">
                <div className="input-wrapper">
                    <label className="label flex" htmlFor="name">{LandingStore.languagePack[LandingStore.currentLanguage].contact.form.name}</label>
                    <input value={LandingStore.model.title} onChange={(event) => { LandingStore.model.title = event.target.value }} className="input" id="name" type="text" />
                </div>
                <div className="input-wrapper">
                    <label className="label flex" htmlFor="email">{LandingStore.languagePack[LandingStore.currentLanguage].contact.form.email}</label>
                    <input value={LandingStore.model.email} onChange={(event) => { LandingStore.model.email = event.target.value }} className="input" id="email" type="email" />
                </div>
                <div className="input-wrapper">
                    <label className="label flex" htmlFor="menssage">{LandingStore.languagePack[LandingStore.currentLanguage].contact.form.message}</label>
                    <textarea value={LandingStore.model.message} onChange={(event) => { LandingStore.model.message = event.target.value }} id="menssage" className="input" rows={15} />
                </div>
                <button onClick={e => LandingStore.onSubmit(e)} className="submit" type="submit">{LandingStore.languagePack[LandingStore.currentLanguage].contact.form.btn[LandingStore.activeBtn]}</button>
            </form>
        </article>
    ))

const FaceLink = props =>
    (
        <a href="https://www.facebook.com/legapyapp/" target="_blank" rel="noopener noreferrer">
            <img className="btn-social-facebook" src={fb} alt="legapy facebook" />
        </a>
    )


const Contact = observer(() => 
    <LandingBody title={LandingStore.languagePack[LandingStore.currentLanguage].contact.title} footer={<Form />}>
        <Left title={LandingStore.languagePack[LandingStore.currentLanguage].contact.subtitle} description={LandingStore.languagePack[LandingStore.currentLanguage].contact.description} />
        <Right title={<FaceLink />} />
    </LandingBody>
)

export default Contact