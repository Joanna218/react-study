import React, { Component } from 'react';
// react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select';
// bookData
import { bookData } from '../book-data';

const bookCategoryItems = [
  { label: "資料庫", value: "database" },
  { label: "網際網路", value: "internet" },
  { label: "家庭保健", value: "home" },
  { label: "應用系統整合", value: "system" },
  { label: "語言", value: "language" }
];
class BookSystem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booksData: bookData
    }
  }

  render() {
    return (
      <div id="bookForm">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>書籍類別</Form.Label>
            <Select options={bookCategoryItems}
              defaultValue={bookCategoryItems[0]} isSearchable={false} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>書籍名稱</Form.Label>
            <Form.Control type="text" placeholder="書籍名稱..." />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>書籍作者</Form.Label>
            <Form.Control type="text" placeholder="書籍作者..." />
          </Form.Group>
          <Button variant="primary" type="submit">
            新增
          </Button>
        </Form>

        <BootstrapTable data={ this.state.booksData } pagination bordered={ false }>
          <TableHeaderColumn dataField='BookId' isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='BookName'>Product Name</TableHeaderColumn>

        </BootstrapTable>

      </div>
    );
  }
}

export default BookSystem;