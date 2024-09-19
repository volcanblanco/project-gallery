import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import ErrorPage from "./error-page"
import Project from './routes/Project'
import axios from 'axios'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

async function fetchAPI (){
  let assets
  
  return axios.get(`http://localhost:5174`)
      .then(res => {
        assets = res.data.assets

        return assets
      })
}

let data = await fetchAPI()

let routeLink = function(){
  let routes = []

  for(let i=0;i<data.length;i++){
    routes.push({
      path: `/${data[i].url}`,
      element: <Project projectName={data[i].projectName} content={data[i].content} images={data[i].images} url={data[i].url}/>
    })
  }

  return routes
}

const projectNames = () => {
  return data.map((asset) => asset.projectName)
}

const projectUrls = () => {
  return data.map((asset) => asset.url)
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App projectNames={projectNames()} projectUrls={projectUrls()} />,
    errorElement: <ErrorPage />
  },
  ...routeLink()
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
