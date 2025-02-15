import styles from './Legals.module.css'
import {useRouter} from 'next/router'
import DefaultLayout from '../../layouts/DefaultLayout';
import Link from 'next/link';
import Head from 'next/head';
function Legals(props) {

    

    const router = useRouter();

const contentLinks = [
    {
        slug: 'tnc',
        content:"<ol>\r\n\t<li>\r\n\t<p>Introduction Welcome to EduAbroad, an abroad career and educational counselling firm. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the use of the services offered by EduAbroad (&ldquo;Services&rdquo;). By accessing and using the Services, you agree to be bound by these Terms and any additional terms to which you agree when using specific Services. If you do not agree to these Terms, you may not use the Services.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Services EduAbroad provides a range of Services, including but not limited to career counselling, educational counselling, information on study abroad programs, and assistance with the application process. EduAbroad reserves the right to change, modify, or discontinue any of the Services at any time, with or without notice.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Fees The use of EduAbroad&rsquo;s Services may be subject to fees, which will be clearly communicated to you before you use the Services. You are responsible for paying all fees associated with the Services, including any taxes or other charges.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Accuracy of Information While EduAbroad makes every effort to provide accurate information, it does not guarantee the accuracy of the information provided in the Services. You are responsible for independently verifying the information and making your own decisions based on that information.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>User Conduct You agree to use the Services only for lawful purposes and in accordance with these Terms. You may not use the Services to:</p>\r\n\t</li>\r\n</ol>\r\n\r\n<ul>\r\n\t<li>Post or transmit any content that is defamatory, abusive, obscene, fraudulent, or otherwise illegal</li>\r\n\t<li>Infringe any third-party intellectual property rights</li>\r\n\t<li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>\r\n\t<li>Attempt to gain unauthorized access to the Services or user accounts</li>\r\n</ul>\r\n\r\n<ol start=\"6\">\r\n\t<li>\r\n\t<p>Disclaimer of Warranties THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTY FOR INFORMATION, SERVICES, UNINTERRUPTED ACCESS, OR PRODUCTS PROVIDED THROUGH OR IN CONNECTION WITH THE SERVICES, INCLUDING WITHOUT LIMITATION THE SOFTWARE LICENSED TO YOU AND THE RESULTS OBTAINED THROUGH THE SERVICES. SPECIFICALLY, EDUABROAD DISCLAIMS ANY AND ALL WARRANTIES, INCLUDING WITHOUT LIMITATION: 1) ANY WARRANTIES CONCERNING THE AVAILABILITY, ACCURACY, USEFULNESS, OR CONTENT OF INFORMATION, AND 2) ANY WARRANTIES OF TITLE, WARRANTY OF NON-INFRINGEMENT, WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Limitation of Liability EDUABROAD WILL NOT BE LIABLE FOR ANY DAMAGES OR LOSSES, INCLUDING WITHOUT LIMITATION DIRECT, INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, OR PUNITIVE DAMAGES, IN CONNECTION WITH THE SERVICES OR YOUR USE THEREOF, OR YOUR INABILITY TO USE THE SERVICES, OR FOR ANY OTHER CLAIM RELATED IN ANY WAY TO YOUR USE OF THE SERVICES, INCLUDING, BUT NOT LIMITED TO, ERRORS OR OMISSIONS IN ANY CONTENT, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT (OR PRODUCT) POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT EDUABROAD IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Indemnification You agree to indemnify and hold EduAbroad, its affiliates, and its and their officers, directors, employees, agents, licensors, and partners harmless from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney&#39;s fees and costs, arising out of or in any way connected with your use of the Services, or your violation of these Terms.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Termination EduAbroad may, at its sole discretion, at any time terminate or suspend all or a portion of the Services, or your use of all or a portion of the Services, with or without notice and with or without cause.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Governing Law and Dispute Resolution These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which EduAbroad is located, without giving effect to any principles of conflicts of law. In the event of any dispute arising under or in connection with these Terms, the parties will attempt to resolve the dispute through good-faith negotiations. If the parties are unable to resolve the dispute through negotiations, the dispute will be resolved through arbitration in accordance with the rules of the American Arbitration Association.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>General Terms These Terms constitute the entire agreement between you and EduAbroad and govern your use of the Services, superseding any prior agreements between you and EduAbroad. If any provision of these Terms is found to be invalid, the parties agree that the remaining provisions shall be enforced to the fullest extent permitted by law. You may not assign these Terms without the prior written consent of EduAbroad. EduAbroad may assign these Terms without your prior written consent to a subsidiary or affiliated company, or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of its assets.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Contact Information If you have any questions about these Terms or the Services, please contact EduAbroad at <a href=\"mailto:info@goeduabroad.com\">info@goeduabroad.com</a>.</p>\r\n\t</li>\r\n</ol>\r\n",
        title:'Terms & Conditions'

    },
    {
        slug: 'refund',
        content:"<p>At EduAbroad, we are dedicated to providing the best possible educational experiences for our students. However, we understand that unexpected circumstances may arise and cause the need for a refund. The following policy outlines our refund policy and procedures.</p>\r\n\r\n<ol>\r\n\t<li>\r\n\t<p>Request for Refund A request for a refund must be made in writing to EduAbroad, either by email or mail. The request must include the student&#39;s name, address, phone number, and reason for the refund request.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Refund Eligibility Refunds will only be granted for the following reasons:</p>\r\n\t</li>\r\n</ol>\r\n\r\n<ul>\r\n\t<li>The program is cancelled by EduAbroad</li>\r\n\t<li>The student is unable to participate due to a medical emergency or illness, supported by a doctor&#39;s note</li>\r\n\t<li>The student is unable to obtain a necessary visa</li>\r\n\t<li>The student is unable to participate due to a death in the immediate family, supported by a death certificate</li>\r\n</ul>\r\n\r\n<ol start=\"3\">\r\n\t<li>Refund Amount The amount of the refund will depend on the reason for the refund request and the timing of the request.</li>\r\n</ol>\r\n\r\n<ul>\r\n\t<li>If the program is cancelled by EduAbroad, a full refund will be provided to the student.</li>\r\n\t<li>If the student is unable to participate due to a medical emergency or illness, a refund of 80% of the program fee will be provided, after deducting administrative costs.</li>\r\n\t<li>If the student is unable to obtain a necessary visa, a refund of 50% of the program fee will be provided, after deducting administrative costs.</li>\r\n\t<li>If the student is unable to participate due to a death in the immediate family, a refund of 80% of the program fee will be provided, after deducting administrative costs.</li>\r\n</ul>\r\n\r\n<ol start=\"4\">\r\n\t<li>\r\n\t<p>Timing of Refund Refunds will be processed within 30 days of the receipt of the written request.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Limitations Refunds will not be granted for any other reason, including but not limited to:</p>\r\n\t</li>\r\n</ol>\r\n\r\n<ul>\r\n\t<li>A change of mind or personal circumstances</li>\r\n\t<li>The student&#39;s academic or personal performance</li>\r\n\t<li>Unused program components or services</li>\r\n</ul>\r\n\r\n<ol start=\"6\">\r\n\t<li>Questions If you have any questions or concerns about this refund policy, please contact EduAbroad at info@goeduabroad.com.</li>\r\n\t<li>\r\n\t<p>Dispute Resolution In the event of a dispute over a refund, EduAbroad will make a final determination within 60 days of the dispute. If the student is not satisfied with the final determination, the student may seek mediation through a neutral third-party mediator, or take legal action, but only in a court located in the jurisdiction in which EduAbroad is located.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>Changes to Refund Policy EduAbroad reserves the right to change this refund policy at any time, with or without notice. The latest version of the refund policy will be available on the EduAbroad website.</p>\r\n\t</li>\r\n\t<li>\r\n\t<p>By participating in an EduAbroad program, the student agrees to be bound by this refund policy. If you have any questions about this policy, please contact EduAbroad at info@goeduabroad.com.</p>\r\n\t</li>\r\n</ol>\r\n",
        title:'Refund Policy'

    },
    {
        slug: 'privacy',
        content:"<p>At EduAbroad, we take the privacy of our users seriously and are committed to protecting their personal information. This Privacy Policy outlines how we collect, use, and share personal information in accordance with the applicable laws.</p>\r\n\r\n<p><strong>Information Collection</strong></p>\r\n\r\n<p>EduAbroad collects personal information when you create an account, use our services, or interact with us in any other way. This information may include, but is not limited to:</p>\r\n\r\n<ol>\r\n\t<li>Contact information, such as your name, email address, postal address, and phone number</li>\r\n\t<li>Demographic information, such as your age, gender, and educational background</li>\r\n\t<li>Financial information, such as payment information for our services</li>\r\n\t<li>Technical information, such as IP address, device type, and browser type</li>\r\n\t<li>Information about your use of our services, such as your browsing and search history</li>\r\n</ol>\r\n\r\n<p><strong>Information Use</strong></p>\r\n\r\n<p>EduAbroad uses your personal information for the following purposes:</p>\r\n\r\n<ol>\r\n\t<li>To provide and improve our services</li>\r\n\t<li>To communicate with you about your account and our services</li>\r\n\t<li>To process transactions and send invoices</li>\r\n\t<li>To personalize your experience on our platform</li>\r\n\t<li>To detect, prevent, and respond to fraud, security, or technical issues</li>\r\n\t<li>To comply with legal obligations</li>\r\n</ol>\r\n\r\n<p><strong>Information Sharing</strong></p>\r\n\r\n<p>EduAbroad may share your personal information with third parties for the following purposes:</p>\r\n\r\n<ol>\r\n\t<li>To provide and improve our services, we may share your information with service providers and partners who assist us in operating our business.</li>\r\n\t<li>In case of a merger, acquisition, or sale of all or a portion of our assets, we may transfer your personal information to the new owner.</li>\r\n\t<li>To comply with legal obligations, we may be required to disclose your personal information to law enforcement, government agencies, or other third parties.</li>\r\n</ol>\r\n\r\n<p><strong>Security Measures</strong></p>\r\n\r\n<p>EduAbroad takes appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use industry-standard encryption to secure your information and regularly review our security practices to ensure that your information is protected.</p>\r\n\r\n<p><strong>Your Rights</strong></p>\r\n\r\n<p>You have the right to access, correct, delete, or restrict the processing of your personal information at any time. You also have the right to receive a copy of your personal information in a portable format. To exercise these rights, please contact us at [contact email].</p>\r\n\r\n<p><strong>Changes to Privacy Policy</strong></p>\r\n\r\n<p>EduAbroad may update this Privacy Policy from time to time to reflect changes in our privacy practices. We will notify you of any material changes by posting the revised policy on our website.</p>\r\n\r\n<p><strong>Contact Us</strong></p>\r\n\r\n<p>If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at info@goeduabroad.com.</p>\r\n",
        title:'Privacy Policy'

    }
]


    return <DefaultLayout>
       
        <Head>
        <title>Legals | Study Abroad</title>
        <meta name="description" content="Study in Abroad" />
      
        
      </Head>

      
<div className={styles.parent}>
<div className={styles.content}>
<div className={styles.left}>

    <ul>{
        contentLinks && contentLinks.map((i,d)=>{
            return <Link href={i.slug}><li>{i.title}</li></Link>
        })
        }</ul>
</div>
<div className={styles.right}>
    {contentLinks && contentLinks.filter((i,d)=>{

        if(i.slug == router.query.slug){
            return i 
        }else{}
    }).map((i,d)=>{

        return <><h2>{i.title}</h2>
        <div dangerouslySetInnerHTML={{__html:i.content}}></div>
        </>
    })
    
    
    }</div>
</div>

</div>

    </DefaultLayout>
}

export default Legals;