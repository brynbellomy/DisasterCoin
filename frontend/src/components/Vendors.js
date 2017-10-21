import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Table } from 'reactstrap'
import { fetchVendors, registerVendor } from '../actions/vendorActions'
import * as _ from 'lodash'
var mnid = require('mnid')

class Vendors extends React.Component {
  constructor () {
    super()
    this.state = {
      modal: false,
      name: '',
      tags: [],
      userAddress: ''
    }
    // this.vendorRegistration = this.vendorRegistration.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    this.props.fetchVendors()
  }
  toggle () {
    this.setState({modal: !this.state.modal})
  }
  handleChange (e) {
    let tags = this.state.tags
    tags.indexOf(e.target.options[e.target.options.selectedIndex].value) < 0 ? tags.push(e.target.options[e.target.options.selectedIndex].value) : null
    this.setState({tags: tags})
  }
  handleSubmit (e) {
    // e.preventDefault()
    this.toggle()
    this.props.registerVendor({user: this.state.userAddress, name: this.name.value, tags: this.state.tags})
    this.setState({tags: []})
  }
  componentWillReceiveProps (props) {
    props.user.address ? this.setState({userAddress: mnid.decode(props.user.address)}) : null
  }
  render () {
    // console.log(this.props.vendors)
    // const vendors = this.props.vendors.map((vendor) => {
    //   return (
    //     <tr>
    //       <td>{vendor.name}</td>
    //       <td>{vendor.tags}</td>
    //     </tr>
    //   )
    // })

    return (
      // <div style={{display: 'flex', justifyContent: 'center'}}>
        <Container style={{marginTop: 30}}>
          <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
            <ModalHeader toggle={this.toggle}>Register Vendor</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for='name'>Vendor Name</Label>
                  <Input type='text' name='name' id='name' getRef={(input) => this.name = input} placeholder='Vendor Name' />
                </FormGroup>
                <FormGroup>
                  <p>{this.state.tags.join(', ')}</p>
                  <Label for='exampleSelectMulti'>Select Multiple</Label>
                  <Input type='select' name='selectMulti' id='exampleSelectMulti' multiple getRef={(input) => this.tags = input} onChange={this.handleChange}>
                    <option>Medical</option>
                    <option>Construction</option>
                    <option>Education</option>
                    <option>Food</option>
                    <option>Sanitation</option>
                  </Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.handleSubmit}>Register Vendor</Button>{' '}
              <Button color='danger' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col>
              <h4>Available Vendors</h4>
              <Table striped>
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {vendors} */}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Button onClick={this.toggle} color='primary' style={{marginTop: 30}}>Register Vendor</Button>
          </Row>
        </Container>
    )
  }

}

const mapStatetoProps = (state) => {
  return {
    user: state.user.user,
    vendors: state.vendors.vendors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVendors: () => dispatch(fetchVendors()),
    registerVendor: (vendorObj) => dispatch(registerVendor(vendorObj))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Vendors)
