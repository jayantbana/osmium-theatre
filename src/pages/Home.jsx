import React from 'react';
import Hero from '../components/Hero';
import Acts from '../components/Acts';
import IlhaamTeaser from '../components/IlhaamTeaser';
import Performances from '../components/Performances';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Acts />
      <IlhaamTeaser />
      <Performances />
      <Contact />
    </>
  );
}
