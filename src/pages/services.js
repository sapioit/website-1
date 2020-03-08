import React, { Component } from "react"

import fetch from 'node-fetch'

import Layout from "../components/layout"
import SEO from "../components/seo"

class ServicesPage extends Component {
  state = {
    services: [],
    search: '',
  }

  componentDidMount() {
    // Get list of services from GitHub
    fetch('https://cdn.jsdelivr.net/gh/getferdi/recipes/all.json')
      .then(data => data.json())
      .then(services => {
        this.setState({
          services,
        });
      })
  }

  updateSearch(search) {
    this.setState({
      search,
    });
  }

  render() {
    const { services, search } = this.state;

    const query = search.toLowerCase().trim();

    const shownServices = search ?
      services.filter(e => e.name.toLowerCase().includes(query))
      : services;

    return (
      <Layout>
        <SEO title="Services"/>

        <div className={"container services"}>
            <div className={"targets"}>
                <div className={"title"}>
                  <h2>Services</h2>
                  <p>Ferdi is compatible with all your favourite services</p>
                </div>

                <input
                  type="text"
                  onChange={evt => this.updateSearch(evt.target.value)}
                  placeholder="Search"
                  className={"search-box"}
                />

                <div className={"service-grid"}>
                  {shownServices.map(service => (
                    <div className={"service-item"} key={service.key}>
                        <div className={"item"}>
                            <img 
                              src={service.icons.svg}
                              alt={`${service.name} logo`}
                            />
                            <p>{service.name}</p>
                        </div>
                    </div>
                  ))}
                </div>

                {!shownServices.length && (
                  <div>
                    <p style={{ textAlign: 'center' }}>
                      It looks like this service is not yet part of Ferdi - but you can still add it using the "Custom Website" option!
                    </p>
                    <div className={"service-not-found-service"}>
                      <img 
                        src="https://cdn.jsdelivr.net/gh/getferdi/recipes/uncompressed/franz-custom-website/icon.svg"
                        alt="Custom website logo"
                      />
                      <p>Custom Website</p>
                    </div>
                  </div>
                )}

            </div>
        </div>
      </Layout>
    )
  }
}


export default ServicesPage
