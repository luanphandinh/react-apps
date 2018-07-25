import * as React from 'react';

import { Navbar, NavItem, Nav } from 'react-bootstrap';

export interface NavbarProps {
  items: any[];
  selectItem: Function;
}

export class LupaNavbar extends React.Component<NavbarProps, { selectedId: number }> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      selectedId: 0,
    };
  }

  onSelectItem(selectedId: number) {
    this.props.selectItem(selectedId);
    this.setState({ selectedId });
  }

  renderNavItem() {
    const { items } = this.props;
    const { selectedId } = this.state;
    const navItems = items.map((item: any, index: number) =>
        <NavItem
          key={index}
          eventKey={index}
          onClick={() => this.onSelectItem(index)}
          className={index === selectedId ? 'active--bold-green' : ''}>
          {item}
        </NavItem>,
      );
    return navItems;
  }

  render() {
    return (
      <Navbar collapseOnSelect>

        <Navbar.Header>
          {/* <Navbar.Brand>
            <a href="#brand">React-Bootstrap</a>
          </Navbar.Brand> */}
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse className="text-grey text-md text-bold">
          <Nav>
            {this.renderNavItem()}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}
