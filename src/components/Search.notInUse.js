import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import { FormGroup, FormControl, Navbar } from "react-bootstrap";

export class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      error: null
    };
  }
  getInitialState() {
    return {
      value: ""
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>
        </Navbar.Form>
      </Navbar.Collapse>
    );
  }
}
