import React, { useState } from 'react'
import { map } from 'lodash'
import './Home.scss'

const Home = () => {
  const[search, setSearch] = useState('')
  const[repos, setRepos] = useState([])

  const getRepos = async(e) => {
    setSearch(e.target.value)
    const response = await fetch(`https://api.github.com/users/${search}/repos`)
    .then(res => res.json())
    setRepos(response)
  }

  return(
    <div className="home-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Informe o nome do Repositorio que deseja encontrar</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 center">
            <input type="text" name="name" value={search} onChange={(e) => getRepos(e)}/>
          </div>
        </div>
        <div className="row">
          {map(repos, (value) => (
            <div className="col-12 border-container">
              <p><strong>Repo:</strong> {value.name}</p>
              <p><strong>Description:</strong> {value.description}</p>
              <p><strong>URL:</strong> <a href={value.html_url}>{value.html_url}</a></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home