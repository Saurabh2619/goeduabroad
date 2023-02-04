import Section from '../components/Section';
import DefaultLayout from '../layouts/DefaultLayout';
import styles from './About.module.css'

function About(props){
    return <DefaultLayout>
    <div className={styles.spacer}></div>
    <Section title="About Us"></Section>
    </DefaultLayout>
}

export default About;