import Section from '../components/Section';
import DefaultLayout from '../layouts/DefaultLayout';
import styles from './About.module.css'
const ResponsiveIFrame = ({ src }) => {
    return (
      <div className="video-container">
        <iframe
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  };
function About(props){
    return <DefaultLayout>
    <div className={styles.spacer}></div>
    <Section title="About Us">

<div className={styles.parent}>
    <div className={styles.left} dangerouslySetInnerHTML={{__html:"<p>Edu Abroad is founded by former Professor of IIM Lucknow, Dr. Swati Abhishek Mishra. She holds a Master&rsquo;s in Management in a joint program with University of Cambridge and Massachusetts&nbsp;Institute of Technology, and a PhD. in Strategy and Marketing from University of Cambridge.&nbsp;She was the winner of various prestigious&nbsp;scholarships like Cambridge Commonwealth Trust Scholar, DFID (UK Government) Scholar, Hinduja Foundation Scholar, Worts Travellling Scholars Fund, and numerous other scholarships.&nbsp;She has been a keen educator, mentor and nurtured thousands of students over the last two decades. She has extensive corporate and government consulting experience in Strategy and Growth domain. She has taught on MDPs in IIM Ahmedabad IPS Phase V Mid Career Training Program at Sardar Vallabh Bhai Patel National Police Academy in Hyderabad, and many corporate training programs for a range of multinational and domestic clients. She was an external consultant to the Sixth Central Pay Commission appointed by Government of India for Ministry of Defence and Ministry of Home Affairs along with faculty from IIM Ahmedabad. She has also consulted state governments, and corporates on various projects over the years. She served as a Faculty Member in the area of Strategy Management at IIM Lucknow, teaching core courses, MDPs, and online strategy management course delivered by IIM Lucknow.</p>\r\n\r\n<p>Edu Abroad is the birth child of eminent prot&eacute;g&eacute;es from the world&rsquo;s top universities like Harvard, Massachusetts Institute of Technology, Cambridge, Cornell, Oxford, LSE, Michigan, UCLA, IIM Ahmedabad, IIM Lucknow, IITs, and many others. The vision behind Edu Abroad is to co-create and sculpt the best career path for each student and working professional, in a personalised context. Edu Abroad is a very rare platform, which guides you for admissions in the best Ivy League Universities around the world matched specifically to your academic and personal profile. Our founding experts have Masters and PhD. Degrees from the best institutions on the planet and then working experience as faculty members in top institutions in India like IIM Ahmedabad, IIM Lucknow and top institutions around the world. We have extensive and deep Strategy and Innovation consulting experience of almost two decades in the government and corporate sector, and bring that extensive understanding of global marketplace and competitive scenario to career counselling and admission process. Edu Abroad is the most exclusive set of admission consulting experts you will find anywhere in the world!</p>\r\n\r\n<p>Edu Abroad brings to you the best expert guidance and advice through our experts on board. Our expert panel is committed to excellence in what they do. We understand strategy and work to a plan of action to bring out your best potential. We will push you to the edge, and help you fly. You will interact with and be guided by experts who are alumni from some of the most prestigious and iconic institutions around the world like Harvard University, MIT, Cornell, Northeastern University Boston, University of Cambridge, University of Oxford, London School of Economics, University of Manchester, Glasgow University, University of Strathclyde, IIM Ahmedabad, and IIM Lucknow. All our experts that guide you are educated at top universities in the world &ndash; absolutely 100% of them. We are highly motivated to nurture and mentor individuals who will be recognised as leaders in their chosen fields at the world stage. We will provide in-depth, granular knowledge on your chosen (and ignored) field and will walk together with you through the entire application process, steering you to achieve success in this transformative and critically important but confusing state of life and career. We have been there, done that and understand the lifelong impact this decision will have on your professional and personal life. It&rsquo;s not hearsay. It&rsquo;s not training, it&rsquo;s not stories &ndash; we will tell you from our direct in-person experience of how we achieved it. Your success is our success. We will enable you to set out on your own journey and achieve your dream university and career. We have done it before. Many times &ndash; for thousands!</p>\r\n"
}}>

    </div>
    <div className={styles.right}>
    <ResponsiveIFrame
      src="https://www.youtube.com/embed/m_X9GraaA54"
    />
    </div>
</div>

    </Section>
    </DefaultLayout>
}

export default About;