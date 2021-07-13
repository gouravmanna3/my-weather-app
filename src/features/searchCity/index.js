import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input } from 'reactstrap';

import './search.css';

const SearchCity = () => {

  const inputRef = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
  }

  return (
    <div class="searchContainer">
      <Form class="searchForm" onSubmit={submitForm}>
        <FormGroup>
          <Input ref={inputRef} type="text" name="city" placeholder="Enter city" className="searchInput" bsSize="lg" />
        </FormGroup>
      </Form>
    </div>
  )
}

export default SearchCity;