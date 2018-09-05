import React from 'react';
import bindAll from 'lodash/bindAll';
import classnames from 'classnames';

import { dollarStringToCents, centsToDollaString } from '../util.js';
import Toggle from 'react-toggle'

import App from 'models/app.js';
import SubscriptionModal from './subscription_modal.jsx';

import { UncontrolledTooltip, Button, Nav, NavItem, NavLink, Tooltip } from 'reactstrap';

export default class AppsView extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, ['onInput', 'findMatches', 'switchTab', 'renderItem', 'renderSelected', 'clickCheck', 'render', 'clickAddSubscription', 'onHideModal', 'handleAmountModeChange'])

    this.state = {
      apps: App.allToJSON(),
      activeTab: '1',
      amountMode: 'starting'
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
      this.resetAppsState()
    }
  }

  switchTab(tab) {
    this.setState({ activeTab: tab })
  }

  resetAppsState() {
    this.setState({
      apps: App.allToJSON()
    })
  }

  clickCheck(e, app) {
    e.stopPropagation()
    e.preventDefault()

    app.selected = false;

    this.resetAppsState()
  }

  amountInputted(e, app) {
    app.amount_cents = dollarStringToCents(e.currentTarget.value)

    this.resetAppsState()
  }

  renderSelected(app) {
    return (
      <div className="center-between" key={app.uuid}>
        <div className="center money-div mr-2">
          <div>$</div>
          <input type="number" className='money-box' placeholder='0.00' onInput={e => this.amountInputted(e, app)} />
          <div className='per-what'>/{app.type == 'monthly' ? 'mo' : 'year'}</div>
        </div>

        {this.state.activeTab === '1' &&
          <img onClick={e => this.clickCheck(e, app)} className="check mx-2" style={{width: 20}} src='/check.svg' />
        }
      </div>
    )
  }

  handleAmountModeChange(e) {
    this.setState({
      amountMode: this.state.amountMode === 'starting' ? 'current' : 'starting'
    })
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
    let mode = this.state.amountMode;
    let txt = mode === 'starting' ? 'Showing starting amounts' : 'Showing current amounts';

    if (this.state.activeTab === '1') {
      return (
        <div>
          <div className="center mt-2">
            <input onInput={this.onInput} style={{width: '90%', height: 40}} className='form-control mb-2' placeholder="Search subscriptions" />
          </div>

          <div className="center-between mt-1">
            <Button onClick={this.clickAddSubscription} outline color="primary">Add Subscription</Button>{' '}
            <div className="center">
              <Toggle
                id='amount-mode'
                defaultChecked={this.state.amountMode == 'starting'}
                icons={false}
                onChange={this.handleAmountModeChange} />
              <span className="ml-1" id='amount-mode'>{txt}</span>
            </div>
          </div>

          <div className="center mt-1">
            <div className="list-group" className='mt-1' style={{width: 400}}>
              {App.getAll().map(this.renderItem)}
            </div>
          </div>
        </div>
      )
    } else {
      let apps = App.getAll().filter(a => a.selected);

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
    let your_apps = App.getAll().filter(a => a.selected)

    return (
      <div className='container' id="content">
        <SubscriptionModal editingApp={this.state.editingApp} onHideModal={this.onHideModal} />

        <h5 className='lets-kill'>Let's kill your subscriptions.</h5>

        <div className='starting-amount my-2'>
          Starting amount: {centsToDollaString(App.sumAmountsCents())}
        </div>

        <div className='current-amount my-2'>
          Current amount: $0
        </div>

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
