import React from 'react';
import bindAll from 'lodash/bindAll';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SubscriptionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    bindAll(this, ['toggle', 'onSubmit']);

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a subscription</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Input placeholder="subscription name" />

              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              <Button color="primary" onClick={this.toggle}>Add</Button>{' '}
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SubscriptionModal;
