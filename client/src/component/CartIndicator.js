import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, Alert,Jumbotron} from 'reactstrap';
import axios from 'axios';
class CartIndicator extends React.Component {
    state = {
        dropdownOpen: false,
        emptyingCart: false,
        successModalOpen: false,
    };
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    onCheckout = () => {
        this.setState({emptyingCart: true}, 
            () => this.props.emptyCart().then(this.setState({emptyingCart: false, successModalOpen: true}))        
        )
    }
    closeSuccessModal = () => this.setState({successModalOpen: false})
    render() {
    return <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Cart: {this.props.cart.length} items
            </DropdownToggle>
            <DropdownMenu>
                {this.props.cart.map(product => <DropdownItem key={product._id} style={{height:"4em"}}>
                    <div style={{height:"3em", width:"40em",display: "inline-flex", alignItems:"center", justifyContent:"flex-start"}} >
                        <img src={product.image} style={{height:"3em", width:"3em"}} className="mr-2 img-thumbnail img-fluid" alt="" />

                        <h5 className="mr-5">{product.name}</h5>
                        <i>{product.category}</i>

                    </div>
                    </DropdownItem>
                )}
                <DropdownItem header>
                    <Button color="primary" disabled={this.state.emptyingCart || this.props.cart.length === 0} onClick={this.onCheckout}>Checkout</Button>
                </DropdownItem>

            </DropdownMenu>
        </ButtonDropdown>
        <Modal isOpen={this.state.successModalOpen} toggle={this.closeSuccessModal}>
            <Jumbotron color="success">Thanks for your purchase!</Jumbotron>
            <Button color="primary" onClick={this.closeSuccessModal}>Close</Button>
        </Modal>
        </div>
    }
}


export default CartIndicator;