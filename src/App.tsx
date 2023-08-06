import { useEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import './App.css'
import githubLogo from './assets/githubLogo.png'
import linkedInLogo from './assets/linkedInLogo.png'
import sandBotImage from './assets/sandBotImage.jpeg'
import uscLogo from './assets/USClogo.png'


interface VisibleElements {
  [elemendId: string]: boolean
}

function App() {
  const [visibleElements, setVisibleElements] = useState<VisibleElements>({})
  const carouselRef = useRef<HTMLDivElement>(null);
  let isMouseDown = false

  useEffect(() => {
    const carouselContainer = carouselRef.current;

    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      startX = e.pageX - carouselContainer!.offsetLeft;
      scrollLeft = carouselContainer!.scrollLeft;
      carouselContainer!.classList.add('grabbing-cursor');
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      carouselContainer!.classList.remove('grabbing-cursor');
    };

    const handleMouseLeave = () => {
      isMouseDown = false;
      carouselContainer!.classList.remove('grabbing-cursor');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - carouselContainer!.offsetLeft;
      const walk = x - startX;
      carouselContainer!.scrollLeft = scrollLeft - walk;
    };

    carouselContainer!.addEventListener('mousedown', handleMouseDown);
    carouselContainer!.addEventListener('mouseup', handleMouseUp);
    carouselContainer!.addEventListener('mouseleave', handleMouseLeave);
    carouselContainer!.addEventListener('mousemove', handleMouseMove);

    const elementIds: string[] = ['about_me', 'projects', 'contact_me']

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.id
        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
          setVisibleElements((prevVisibleElements) => ({
            ...prevVisibleElements,
            [elementId]: true,
          }))
        }
      })
    }

    const options: IntersectionObserverInit = {
      threshold: 0.75,
    }

    const observers: { [key: string]: IntersectionObserver } = {}

    elementIds.forEach((elementId) => {
      const element = document.getElementById(elementId)
      if (element) {
        observers[elementId] = new IntersectionObserver(handleIntersection, options)
        observers[elementId].observe(element)
      }
    })

    return () => {
      elementIds.forEach((elementId) => {
        if (observers[elementId]) {
          observers[elementId].disconnect();
        }
      })
      carouselContainer!.removeEventListener('mousedown', handleMouseDown);
      carouselContainer!.removeEventListener('mouseup', handleMouseUp);
      carouselContainer!.removeEventListener('mouseleave', handleMouseLeave);
      carouselContainer!.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  const scrollToElement = (id: string) => {
    const container = document.getElementById(id)!
    container.scrollIntoView({ behavior: 'smooth' })
  }

  function CardView({ link, image, header, text }: {link: string, image: string, header: string, text: string}) {
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMouseDown) {
        console.log("rejected")
        e.preventDefault();
      }
      console.log("hi")
      window.open(link)
    };
    
    return (
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} tiltReverse={true}>
        <div onClick={(e) => handleCardClick(e)} className='cardContainer'>
          <img src={image} alt='img' draggable={false} />
          <h2 draggable={false}>{header}</h2>
          <p draggable={false}>{text}</p>
        </div>
      </Tilt>
    )
  }

  return (
    <>
    <div id='home' className='homePageContainer'>
      <div className='navBar'>
        <span>Home</span>
        <span onClick={() => scrollToElement('about_me')}>About Me</span>
        <span onClick={() => scrollToElement('projects')}>Projects</span>
        <span onClick={() => scrollToElement('contact_me')}>Contact Me</span>
      </div>
      <div className='homePageIntro'>
        <h1>Hi, I'm Colin</h1>
        <p>Recent Graduate from USC in Computer Science and Junior Software Developer</p>
        <div className='homePageButtons'>
          <img className='gitHubButton' src={githubLogo} alt='githubLogo' onClick={() => window.open('https://github.com/x56sandmanx', '_blank')}/>
          <img className='linkedInButton' src={linkedInLogo} alt='linkedInLogo' onClick={() => window.open('https://www.linkedin.com/in/colin-sandman-047305237', '_blank')}/>
        </div>
        <div className='animateDown'>
          <div className='scrollDownImage' onClick={() => scrollToElement('about_me')}>
            <svg className='scrollDownImageSVG'>
              <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
            </svg>
          </div>
          <p className='scrollForMore'>Scroll For More</p>
        </div>
      </div>
    </div>
    <div id='about_me' className='aboutMeContainer'>
      <div className={`aboutMeInfo${visibleElements['about_me'] ? 'Animate' : ''}`}>
        <h1>About Me</h1>
        <p>My name is Colin Sandman, and I am a recent graduate from The University of South Carolina. I graduated Cum Laude,
           with a bachelors degree in Computer Science. I love to work with React and make Web Apps just like this one! On my
           free time I love to drum and learn new technologies!
        </p>
      </div>
    </div>
    <div id='projects' className='projectsContainer'>
      <div className={`projectsInfo${visibleElements['projects'] ? 'Animate' : ''}`}>
        <h1>Projects</h1>
        <div className='cardCarouselContainer'>
          <div ref={carouselRef} className='cardCarousel'>
            <CardView link='https://github.com/x56sandmanx/SandBot' image={sandBotImage} header='SandBot'
            text='SandBot is a Discord Bot made using Python. This bot was able to welcome new members
                  to the server, run moderation commands, and respond to members!'/>
            <CardView link='https://github.com/Baker-0502/CriminalDatabaseApp' image={uscLogo} header='Criminal Database App'
            text='The Criminal Database App was created with a group of 4 people in our Software Engineering class. Where we created
                  a local database that stored user data and could be retrieved from certian users!'/>
                  <CardView link='https://github.com/Baker-0502/CriminalDatabaseApp' image={uscLogo} header='Criminal Database App'
            text='The Criminal Database App was created with a group of 4 people in our Software Engineering class. Where we created
                  a local database that stored user data and could be retrieved from certian users!'/>
                  <CardView link='https://github.com/Baker-0502/CriminalDatabaseApp' image={uscLogo} header='Criminal Database App'
            text='The Criminal Database App was created with a group of 4 people in our Software Engineering class. Where we created
                  a local database that stored user data and could be retrieved from certian users!'/>
                  
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App
