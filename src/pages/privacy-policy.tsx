import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'

import './style.css'
import useTheme from '../hooks/theme'

const PrivacyPolicy = () => {
  const theme = useTheme()
  return (
    <Layout>
      <SEO title="downloadsound.cloud - Privacy Policy"></SEO>

      <Section style={{ backgroundColor: theme.sky }}>
        <Container>
          <div style={{ color: theme.containerText, backgroundColor: theme.containerBackground, padding: '1rem', borderRadius: '5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <h1 style={{ color: theme.containerTitle, fontSize: '24px', fontWeight: 600 }}>Privacy Policy of downloadsound.cloud</h1>

            <p><b>downloadsound.cloud</b> operates the <a href="/">https://downloadsound.cloud</a> website, which provides the SERVICE.</p>

            <p>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the downloadsound.cloud website.</p>

            <p>If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Log Data</h2>

            <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol (&quot;IP&quot;) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Cookies</h2>

            <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</p>

            <p>Our website uses these &quot;cookies&quot; to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</p>

            <p>For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">&quot;What Are Cookies&quot;</a>.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Service Providers</h2>

            <p>We may employ third-party companies and individuals due to the following reasons:</p>

            <ul>
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>

            <p>We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Security</h2>

            <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Links to Other Sites</h2>

            <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Children&apos;s Privacy</h2>

            <p>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Changes to This Privacy Policy</h2>

            <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>

            <h2 style={{ color: theme.containerTitle, fontSize: '18px', fontWeight: 600, marginTop: '1rem' }}>Contact Us</h2>

            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default PrivacyPolicy
