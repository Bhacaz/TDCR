import React from "react";
import './Menu.css';
import { Dropdown } from 'react-bootstrap'
import colors from '../colors';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'Tournée des Canton Rawdon'
        }
        this.data = props.layer.features.map(pro => {
            return { id: pro.properties.id, name: pro.properties.name }
        });
    }

    dropdownItems() {
        return this.data.map((data, index) => {
            return <Dropdown.Item eventKey={data.name} onSelect={this.itemSelected}>
                <div class="dot" style={{backgroundColor: colors[index]}}/>
                <span>{data.name}</span>
            </Dropdown.Item>
        })
    }

    itemSelected = (eventKey) => {
        this.setState({ selectedItem: eventKey })
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.selectedItem}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.dropdownItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default Menu;
