import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onFindPetsClick = () => {
    let BaseUrl = '/api/pets'
    if (this.state.filters.type !== 'all'){
      BaseUrl += `?type=${this.state.filters.type}`
    }

    fetch(BaseUrl)
      .then(res => res.json())
      .then(data => this.setState({ pets: data }))

    // console.log(this.state.pets)
  }

  onAdoptPet = (id) => {
    const pets = [...this.state.pets]
    this.setState({pets: pets.map(pet => pet.id !== id ? pet : {...pet, isAdopted: true})})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType} 
              onFindPetsClick={this.onFindPetsClick}
              />
              
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
