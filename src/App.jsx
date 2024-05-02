import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import downloadResume from './helpers/downloadResume';
import useScroll from './hooks/useScroll';

import Blob from './components/Blob';
import Home from './components/Home';
import Navbar from './components/home/Navbar';
import Logo from './components/Logo';

function App() {
  const location = useLocation();
  const { scrollY, scrollDir } = useScroll();

  const [showingAppLoader, setShowingAppLoader] = useState(true);
  const [loadingNavBar, setLoadingNavBar] = useState(false);
  const [loadedNavBar, setLoadedNavBar] = useState(false);
  const [loadingHero, setLoadingHero] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [stickNavbar, setStickNavbar] = useState(false);
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (scrollDir === 'up' && scrollY > 200) {
      setStickNavbar(true);
    } else if (scrollDir === 'down' || scrollY <= 10) {
      setStickNavbar(false);
    }
  }, [scrollDir, scrollY]);

  const closeHamburger = () => {
    setShowHamburger(false)
  }

  const openHamburger = () => {
    setShowHamburger(true)
  }

  const initialLoad = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowingAppLoader(false);
        resolve();
      }, 3600);
    })
  }

  const loadNavBar = () => {
    setLoadingNavBar(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoadingNavBar(false);
        setLoadedNavBar(true);
        resolve();
      }, 2200);
    })
  }

  const loadHero = () => {
    setLoadingHero(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoadingHero(false);
        resolve();
      }, 2000);
    })
  }

  const loadPage = () => {
    if (showingAppLoader || loadingNavBar || loadingHero) return;

    setLoadingNavBar(false);
    setLoadedNavBar(false);
    setLoadingHero(false);
    setAllLoaded(false);
    setShowingAppLoader(true);

    initialLoad()
      .then(() => {
        return loadNavBar();
      })
      .then(() => {
        return loadHero();
      })
      .then(() => {
        setAllLoaded(true);
      })
  }

  useEffect(() => {
    loadPage();
  }, [])

  return (
    <div className="App-Container">
      {isHome ? (
        <>
          <div className={`App-Loader ${showingAppLoader ? 'App-Loader--loading' : ''}`}>
            <Logo animationClassName="Logo--animate" />
          </div>

          {!showingAppLoader && (
            <Blob />
          )}

          <div className={`App ${showingAppLoader ? 'App--hide' : ''}`}>
            <div className={`App__navbar ${stickNavbar ? 'App__navbar--sticky' : ''}`}>
              <Navbar
                loadingNavBar={loadingNavBar}
                loadedNavBar={loadedNavBar}
                loadPage={loadPage}
              />

              <nav id="hamburger-nav" className="Hamburger-Menu">
                <div className="Hamburger-Menu__logo">
                  <Logo />
                </div>

                <button className="Hamburger-Menu__button Button Button--icon" onClick={openHamburger}>
                  <i className="fa-solid fa-bars" />
                </button>

                <div className={`Hamburger-Menu__slideover ${showHamburger ? 'Hamburger-Menu__slideover--open' : ''}`}>
                  <div className="Hamburger-Menu__slideover-close">
                    <button className="Hamburger-Menu__button Button Button--icon" onClick={closeHamburger}>
                      <i className="fa-solid fa-x" />
                    </button>
                  </div>

                  <div className="Hamburger-Menu__slideover-links">
                    <ScrollLink
                      className="Hamburger-Menu__slideover-link"
                      to="about"
                      smooth={true}
                      duration={500}
                      onClick={closeHamburger}
                    >
                      About me
                    </ScrollLink>

                    <ScrollLink
                      className="Hamburger-Menu__slideover-link"
                      to="experience"
                      smooth={true}
                      duration={500}
                      onClick={closeHamburger}
                    >
                      Experience
                    </ScrollLink>

                    <ScrollLink
                      className="Hamburger-Menu__slideover-link"
                      to="skills"
                      smooth={true}
                      duration={500}
                      onClick={closeHamburger}
                    >
                      Skills
                    </ScrollLink>

                    {/* <ScrollLink
                      className="Hamburger-Menu__slideover-link"
                      to="projects"
                      smooth={true}
                      duration={500}
                    >
                      Projects
                    </ScrollLink> */}

                    <ScrollLink
                      className="Hamburger-Menu__slideover-link"
                      to="contact"
                      smooth={true}
                      duration={500}
                      onClick={closeHamburger}
                    >
                      Contact me
                    </ScrollLink>

                    <button className="Hamburger-Menu__slideover-button Button Button--default" onClick={downloadResume}>Download resume</button>
                  </div>
                </div>
              </nav>
            </div>

            <div className="App__body">
              <Home allLoaded={allLoaded} loadingHero={loadingHero} />
            </div>

            <div className="App__footer">
              <p>Built by Thendup Tsering</p>
            </div>
          </div>
        </>
      ) : (
        <div className="App">
          <div className="App__body">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
