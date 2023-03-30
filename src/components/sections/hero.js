import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Ganapathi Naik.</h2>;
  const three = <h3 className="medium-heading">I love building software of Internet scale!</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer specializing in building (and occasionally designing) large scale Distributed systems & Softwares. I have an entrepreneurial mindset and I am interested in building exceptional products & experiences.
        <br/>
        <br/>
        Currently working as a Software Engineer at
        {' '}
        <a href="https://www.amazon.com/" target="_blank" rel="noreferrer">
          Amazon
        </a> and as a Freelance Content Writer for
        {' '}
        <a href="https://www.peppercontent.io/" target="_blank" rel="noreferrer">
        Pepper Content
        </a>.
        <br/>
        <br/>
        Outside work, I occasionally blog on
        {' '}
        <a href="https://ganapathi-naik.medium.com/" target="_blank" rel="noreferrer">
        Medium
        </a>. Off-screen, I sketch my thoughts
        {' '}
        <a href="https://instagram.com/its_ganapathi" target="_blank" rel="noreferrer">
        here
        </a>!
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:iamganapathinaik@gmail.com"
      target="_blank"
      rel="noreferrer">
      Contact Me
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
