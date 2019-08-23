import React from 'react'
import { observer } from 'mobx-react'
import LandingBody, { Left, Right } from '../../../components/Landing/LandingBody'
import LandingStore from '../../../stores/Landing'

const apple = require('../../../images/apple.png')
const google = require('../../../images/google.png')

const Footer = observer(props => (
    <div className="md-grid md-cell--10 no-padding terms-container">
        <p className="terms-inner" style={{ backgroundColor: 'white', padding: '50px' }}>
            <h3>Privacy Policy</h3>
Pegasus operates the www.legapy.com website, which provides the SERVICE.
            <br /><br />
This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.<br />
If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.<br />
<br />The terms used in this Terms of use have the same meanings as in our Terms and Conditions, which is accessible at www.legapy.com.py , unless otherwise defined in this Privacy Policy.<br />
<br />Information Collection and Use<br />
For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.<br />
            <br />Log Data<br />
We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.<br />
            <br />Cookies<br />
Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.<br />
Our website uses these “cookies” to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.<br />
            <br />Service Providers<br />
We may employ third-party companies and individuals due to the following reasons:
To facilitate our Service;<br />
To provide the Service on our behalf;<br />
To perform Service-related services; or<br />
To assist us in analyzing how our Service is used.<br />
We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.<br />
<br />Security<br />
We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.<br />
<br />Links to Other Sites<br />
Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Terms of use of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.<br />
<br />Children’s Privacy<br />
Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.<br />
<br />Changes to This Privacy Policy<br />
We may update our Terms of use from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Terms of use on this page. These changes are effective immediately, after they are posted on this page.
<br />Contact Us<br />
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.<br />
This Terms of use page was created at Terms of use Template.net.<br />
        </p>
    </div>
))


const Privacy = observer(() =>
    <LandingBody footer={<Footer />} title={LandingStore.languagePack[LandingStore.currentLanguage].privacy.title} />)

export default Privacy
