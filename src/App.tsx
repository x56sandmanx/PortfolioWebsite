import './App.css'
import githubLogo from './assets/githubLogo.png'
import linkedInLogo from './assets/linkedInLogo.png'

function App() {
  const scrollToElement = (id: string) => {
    const container = document.getElementById(id)!;
    container.scrollIntoView({ behavior: 'smooth' });
};

  return (
    <>
    <div id='home' className='homePageContainer'>
      <div className='navBar'>
        <p>Home</p>
        <p onClick={() => scrollToElement('about_me')}>About Me</p>
        <p onClick={() => scrollToElement('projects')}>Projects</p>
        <p onClick={() => scrollToElement('contact_me')}>Contact Me</p>
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
      <div className='aboutMeInfo'>
        <h1>About Me</h1>
      </div>
    </div>
    </>
  )
}

export default App
