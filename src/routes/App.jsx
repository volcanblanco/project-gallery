import {useState, useEffect} from 'react'
import ProjectsList from '../components/ProjectsList'
import axios from 'axios'
import './App.css'

function App(props) {

  return (
    <>
      <main className="main">
      <section>
        <h1>Hi, my name is Akif Volkan Ongun.</h1>
        <p>
          Here are some of my projects I&apos;ve worked on as a frontend
          developer, ui developer and some game jam games I&apos;ve worked as a
          team member in the past.
        </p> 
        <ProjectsList projectNames={props.projectNames} projectUrls={props.projectUrls} />
      </section>
    </main>
    </>
  )
}

export default App
