import React from 'react';
import bindAll from 'lodash/bindAll';
import App from '../models/app';
import serialize from 'form-serialize';
import { FormGroup, Label, Form, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SubscriptionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
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
    return (
      <Modal toggle={this.toggle} isOpen={this.state.modal} className={this.props.className}>
        <ModalHeader>Add a subscription</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup className='d-flex'>
              <Input name='name' placeholder="subscription name" value={this.state.app.name} onChange={this.onInput} />

              <Input type="select" name="frequency" className='ml-2' value={this.state.app.frequency} onChange={this.onInput} style={{width: 100}} >
                <option>monthly</option>
                <option>yearly</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Website</Label>
              <Input placeholder="https://blah.com" name='website' value={this.state.app.website} onChange={this.onInput} />
            </FormGroup>

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
