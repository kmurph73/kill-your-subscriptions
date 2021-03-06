import React from 'react';
import bindAll from 'lodash/bindAll';
import clone from 'lodash/clone';
import classnames from 'classnames';

import { dollarStringToCents, centsToDollaString } from '../util.js';
import Toggle from 'react-toggle'

import App from 'models/app.js';
import SubscriptionModal from './subscription_modal.jsx';

import { UncontrolledTooltip, Button, Nav, NavItem, NavLink, Tooltip } from 'reactstrap';

export default class AppsView extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, ['renderItem', 'renderSelected', 'clickCheck', 'render', 'handleAmountModeChange', 'clickEdit', 'clickAddSubscription', 'onSubmitModal'])

    this.modalRef = React.createRef()

    this.state = {
      apps: App.allToJSON(),
      amountMode: 'starting'
    }
  }

  save() {
    localStorage.setItem('addresses', JSON.stringify(json || this.getAll()))
  }

  clickAddSubscription(e) {
    e.preventDefault()

    this.modalRef.current.openWith(App.blankApp());
  }

  clickApp(app) {
    if (!app.selected) {
      app.selected = true

      App.saveToLocalStorage()
      this.resetAppsState()
    }
  }

  resetAppsState() {
    App.saveToLocalStorage()

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
    let attr = `${this.state.amountMode}_amount_cents`;
    let val = e.currentTarget.value;
    let amount = dollarStringToCents(val);

    if (amount < 0) amount = 0

    app[`${this.state.amountMode}_amount_cents_value`] = val
    app[attr] = amount

    this.resetAppsState()
  }

  amountBlurred(e, app) {
    let val = e.currentTarget.value;

    if (val) {
      val = centsToDollaString(dollarStringToCents(val)).replace('$', '')
    }

    app[`${this.state.amountMode}_amount_cents_value`] = val
    this.resetAppsState()
  }

  renderSelected(app) {
    let amount = app[`${this.state.amountMode}_amount_cents_value`] || ''

    return (
      <div className="center-between" key={app.uuid}>

        <img onClick={e => this.clickCheck(e, app)} className="check mx-2" style={{width: 20}} src='check.svg' />
      </div>
    )
  }

  handleAmountModeChange(e) {
    this.setState({
      amountMode: this.state.amountMode === 'starting' ? 'current' : 'starting'
    })
  }

  clickTrash(e, app) {
    e.stopPropagation()

    if (app.current_amount_cents || app.starting_amount_cents) {
      if (!confirm("Are you sure?")) {
        return;
      }
    }

    App.remove(app)
    this.resetAppsState()
  }

  clickEdit(e, app) {
    e.stopPropagation()

    this.modalRef.current.openWith(app.clone(), app.uuid)
  }

  renderItem(app) {
    let amount = app[`${this.state.amountMode}_amount_cents_value`] || ''

    return (
      <div className={"center-between app-item"} key={app.uuid}>
        <div>
          <div>{app.name}</div>
        </div>

        <div className='center'>
          <div className="center money-div mr-2">
            <div>$</div>
            <input value={amount} type="number" className='money-box' placeholder='0.00' onChange={e => this.amountInputted(e, app)} onBlur={e => this.amountBlurred(e, app)} />
            <div className='per-what'>/{app.frequency == 'monthly' ? 'mo' : 'yr'}</div>
          </div>

          <img onClick={e => this.clickEdit(e, app)} className="check mx-2" style={{width: 20}} src='pencil.svg' />
          <img onClick={e => this.clickTrash(e, app)} className="check mx-2" style={{width: 20}} src='trash-empty.svg' />
        </div>
      </div>
    )
  }

  renderContent() {
    let mode = this.state.amountMode;
    let txt = mode === 'starting' ? 'Starting amounts' : 'Current amounts';

    let apps = App.getAll()

    return (
      <div>
        <div className="center-between mt-1">
          <Button size="sm" onClick={this.clickAddSubscription} outline color="primary">Add Subscription</Button>{' '}
          <div className="center">
            <Toggle
              id='amount-mode'
              defaultChecked={this.state.amountMode == 'starting'}
              icons={false}
              onChange={this.handleAmountModeChange} />
            <span className="ml-1" id='amount-mode' style={{width: 98}}>{txt}</span>
          </div>
        </div>

        <div className="center mt-1">
          <div className="list-group" className='mt-1' style={{width: 400}}>
            {apps.map(this.renderItem)}
          </div>
        </div>
      </div>
    )
  }

  onSubmitModal(data, uuid) {
    let errors = App.validateData(data);

    if (errors.length) {
      this.modalRef.current.setErrors(errors);
    } else {
      if (uuid) {
        let app = App.find(uuid);
        Object.assign(app, data)
      } else {
        data.starting_amount_cents = data.current_amount_cents = data.amount * 100;
        App.addApp(data);
      }

      this.modalRef.current.toggle()
      this.resetAppsState()
    }
  }

  render() {
    return (
      <div className='container' id="content" style={{maxWidth: 450}}>
        <SubscriptionModal ref={this.modalRef} onSubmitModal={this.onSubmitModal} />

        <h5 className='lets-kill'>Let's kill your subscriptions.</h5>

        <div className='my-2'>
          <span className='amount-label'>Starting amount:</span>
          <span className='ml-2 amount'>
            {centsToDollaString(App.sumStartingAmountsCents())} / mo
          </span>
        </div>

        <div className='my-2'>
          <span className='amount-label'>Current amount:</span>
          <span className='ml-2 amount'>
            {centsToDollaString(App.sumCurrentAmountsCents())} / mo
          </span>
        </div>

        {this.renderContent()}
      </div>
    );
  }
}
