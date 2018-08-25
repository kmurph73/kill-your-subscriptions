import React from 'react';
import bindAll from 'lodash/bindAll';
import classnames from 'classnames';

import { Button, Nav, NavItem, NavLink } from 'reactstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, ['onInput', 'findMatches', 'switchTab', 'renderItem'])

    this.state = {
      apps: window.apps,
      activeTab: '1'
    }
  }

  onInput(e) {
    let val = e.currentTarget.value;

    let matches = this.findMatches(val);

    this.setState({
      apps: matches
    })
  }

  searchMatches(query) {
    let matches = [];

    window.apps.some((a) => {
      if (query.test(a.terse)) {
        matches.push(a)
      }

      return matches.length >= 20;
    })

    return matches
  }

  findFromQuery(query) {
    query = new RegExp(query.replace(/\s|\(|\)/, ''), "i")

    return this.searchMatches(query)
  }

  findFromStart(query) {
    query = new RegExp('^' + query.replace(/\s|\(|\)/, ''), "i")

    return this.searchMatches(query)
  }

  findMatches(query) {
    let matches = [];

    if (query.length > 2) {
      matches = this.findFromStart(query)
    }

    if (!matches.length) {
      matches = this.findFromQuery(query)
    }

    return matches;
  }

  clickAddSubscription(e) {
    e.preventDefault()
  }

  clickApp(app) {
    if (!app.selected) {
      app.selected = true

      this.setState(this.state)
    }
  }

  switchTab(tab) {
    this.setState({ activeTab: tab })
  }

  renderSelected() {
    return (
      <div className="center-between">
        <div className="center money-div mr-2">
          <div>$</div>
          <div className="center money-box">
            <input placeholder='0.00' />
          </div>
          <div className='per-what'>/mo</div>
        </div>

        <img className="mx-2" style={{width: 20}} src='/check.svg' />
      </div>
    )
  }

  renderItem(app) {
    let classes = classnames({selected: app.selected});

    return (
      <div className={"center-between app-item " + classes} onClick={() => this.clickApp(app)}  key={app.terse}>
        <div>{app.name}</div>

        {app.selected ? this.renderSelected() : null}
      </div>
    )
  }

  renderTabContent() {
    if (this.state.activeTab === '1') {
      return (
        <div>
          <div className="center mt-2">
            <input onInput={this.onInput} style={{width: '90%', height: 40}} className='form-control mb-2' placeholder="Search subscriptions" />
          </div>

          <div className="center mt-1">
            <Button onClick={this.clickAddSubscription} outline color="primary">Add Subscription</Button>{' '}
          </div>

          <div className="center mt-1">
            <div className="list-group" className='mt-1' style={{width: 400}}>
              {this.state.apps.map(this.renderItem)}
            </div>
          </div>
        </div>
      )
    } else {
      <p>your subs</p>
    }
  }

  render() {
    return (
      <div id="content">
        <h5 style={{textAlign: 'center'}}>Let's kill your subscriptions.</h5>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.switchTab('1'); }}
            >
              Subscriptions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.switchTab('2'); }}
            >
              Your Subscriptions
            </NavLink>
          </NavItem>
        </Nav>

        {this.renderTabContent()}

      </div>
    );
  }
}
