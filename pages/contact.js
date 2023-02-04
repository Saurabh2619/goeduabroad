import Section from '../components/Section';
import DefaultLayout from '../layouts/DefaultLayout';
import styles from './Contact.module.css'

function Contact(props){
    return <DefaultLayout>
        <div className={styles.spacer}></div>
    <Section title={"Contact Us"}></Section>
    </DefaultLayout>
}

export default Contact;