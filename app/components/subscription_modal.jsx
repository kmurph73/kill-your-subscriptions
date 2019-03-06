import React from 'react';
import bindAll from 'lodash/bindAll';
import App from '../models/app';
import classnames from 'classnames';

import { FormGroup, Label, Form, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

class SubscriptionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      errors: [],
      app: App.blankApp()
    };

    bindAll(this, ['onSubmit', 'toggle', 'openWith', 'onInput']);
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.onSubmitModal(this.state.app, this.state.uuid)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setErrors(errors) {
    this.setState({
      errors: errors
    })
  }

  openWith(app, uuid) {
    this.setState({
      modal: true,
      uuid: uuid,
      app: app
    })

    this.toggle();
  }

  onInput(e) {
    let val = e.currentTarget.value
    let name = e.currentTarget.getAttribute('name')

    this.state.app[name] = val;
    this.setState(this.state)
  }

  render() {
    let classes = classnames({hidden: !this.state.errors.length});

    return (
      <Modal toggle={this.toggle} isOpen={this.state.modal} className={this.props.className}>
        <ModalHeader>Add a subscription</ModalHeader>
        <ModalBody>
          <Alert color="danger" className={classes}>
            <h5>The following errors occurred:</h5>
            <ul>
              {this.state.errors.map(e => <li>{e}</li>)}
            </ul>
          </Alert>

          <Form onSubmit={this.onSubmit}>
            <FormGroup className='d-flex'>
              <Input name='name' placeholder="subscription name" value={this.state.app.name} onChange={this.onInput} />

              {this.state.uuid &&
                <Input type="select" name="frequency"  value={this.state.app.frequency} onChange={this.onInput} style={{width: 100, marginLeft: 10}} >
                  <option>monthly</option>
                  <option>yearly</option>
                </Input>
              }
            </FormGroup>

            {!this.state.uuid &&
              <FormGroup className="center">
                <Input type="select" name="frequency"  value={this.state.app.frequency} onChange={this.onInput} style={{width: 100}} >
                  <option>monthly</option>
                  <option>yearly</option>
                </Input>

                  <Input placeholder="0.00" className="ml-2" type="number" name='amount' value={this.state.app.blah} onChange={this.onInput} />
              </FormGroup>
            }

            <div className='center-between mt-3'>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              <Button color="primary">{this.state.uuid ? 'Update' : 'Add'}</Button>{' '}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default SubscriptionModal;
