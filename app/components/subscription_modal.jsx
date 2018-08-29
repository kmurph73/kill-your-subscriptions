import React from 'react';
import bindAll from 'lodash/bindAll';
import { FormGroup, Label, Form, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SubscriptionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    bindAll(this, ['onSubmit']);
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <Modal isOpen={!!this.props.editingApp} className={this.props.className}>
        <ModalHeader>Add a subscription</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input placeholder="subscription name" />
            </FormGroup>

            <FormGroup className='d-flex'>
              <Input className='mr-2' name="select" type="number" placeholder='0.00' style={{width: 90}}></Input>

              <Input type="select" name="frequency" className='ml-2'>
                <option>monthly</option>
                <option>yearly</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Website</Label>
              <Input placeholder="https://blah.com" />
            </FormGroup>

            <FormGroup className='ml-4'>
              <Label check>
                <Input type="checkbox" />{' '}
                I have cancelled this membership.
              </Label>
            </FormGroup>

            <div className='center-between mt-3'>
              <Button color="secondary" onClick={this.props.onHideModal}>Cancel</Button>
              <Button color="primary">Add</Button>{' '}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default SubscriptionModal;
