import React from 'react';
import bindAll from 'lodash/bindAll';
import classnames from 'classnames';

import App from 'models/app.js';
import SubscriptionModal from './subscription_modal.jsx';

import { Button, Nav, NavItem, NavLink } from 'reactstrap';

export default class AppsView extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, ['onInput', 'findMatches', 'switchTab', 'renderItem', 'renderSelected', 'clickCheck', 'render', 'clickAddSubscription', 'onHideModal'])

    this.state = {
      apps: App.getAll(),
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

  save() {
    localStorage.setItem('addresses', JSON.stringify(json || this.getAll()))
  }

  clickAddSubscription(e) {
    e.preventDefault()

    this.setState({
      editingApp: {}
    })
  }

  clickApp(app) {
    if (!app.selected) {
      app.selected = true

      App.saveToLocalStorage()
      this.setState(this.state)
    }
  }

  switchTab(tab) {
    this.setState({ activeTab: tab })
  }

  clickCheck(e, app) {
    e.stopPropagation()
    e.preventDefault()

    app.selected = false;

    this.setState(this.state);
  }

  inputBlurred(e, app) {
  }

  renderSelected(app) {
    return (
      <div className="center-between" key={app.uuid}>
        <div className="center money-div mr-2">
          <div>$</div>
          <input type="number" className='money-box' placeholder='0.00' onBlur={e => this.inputBlurred(e, app) } />
          <div className='per-what'>/{app.type == 'monthly' ? 'mo' : 'year'}</div>
        </div>

        <img onClick={(e) => this.clickCheck(e, app)} className="check mx-2" style={{width: 20}} src='/cancel-inactive.svg' />
        <img onClick={(e) => this.clickCheck(e, app)} className="check mx-2" style={{width: 20}} src='/check.svg' />
      </div>
    )
  }

  renderItem(app) {
    let classes = classnames({selected: app.selected});

    return (
      <div className={"center-between app-item " + classes} onClick={() => this.clickApp(app)} key={app.uuid}>
        <div>
          <div>{app.name}</div>
          {app.selected &&
            <div>
              <a className='site' href={app.site} target='_blank'>{app.site}</a>
            </div>
          }
        </div>

        {app.selected ? this.renderSelected(app) : null}
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
      let apps = this.state.apps.filter(a => a.selected);
      return (
        <div>
          <div className="center mt-1">
            <Button onClick={this.clickAddSubscription} outline color="primary">Add Subscription</Button>{' '}
          </div>

          <div className="center mt-1">
            <div className="list-group" className='mt-1' style={{width: 400}}>
              {apps.map(this.renderItem)}
            </div>
          </div>
        </div>
      )
    }
  }

  onHideModal() {
    this.setState({
      editingApp: null
    })
  }

  render() {
    let your_apps = this.state.apps.filter(a => a.selected)

    return (
      <div className='container' id="content">
        <SubscriptionModal editingApp={this.state.editingApp} onHideModal={this.onHideModal} />

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
              Your Subscriptions ({your_apps.length})
            </NavLink>
          </NavItem>
        </Nav>

        {this.renderTabContent()}

      </div>
    );
  }
}
