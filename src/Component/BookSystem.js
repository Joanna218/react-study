import React, { Component } from 'react';
// react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select';
// bookData
import { bookData } from '../book-data';

const bookCategoryItems = [
  { text: "資料庫", value: "database" },
  { text: "網際網路", value: "internet" },
  { text: "家庭保健", value: "home" },
  { text: "應用系統整合", value: "system" },
  { text: "語言", value: "language" }
];
class BookSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: bookData,
      maxBookId: Math.max(...bookData.map(book => book.BookId)),
      bookName: '',
      bookAuthor: '',
      bookCategory: bookCategoryItems[0]
    }
  }

  addBook = e => {
    e.preventDefault();
    this.state.booksData.push({
      "BookId": this.state.maxBookId + 1,
      "BookCategory": this.state.bookCategory,
      "BookName": this.state.bookName,
      "BookAuthor": this.state.bookAuthor,
      "BookBoughtDate":"1990-06-18",
      "BookPublisher":"創創公司"
    });
    this.setState({
      booksData: this.state.booksData,
      maxBookId: this.state.maxBookId + 1,
      bookName: '',
      bookAuthor: '',
      bookCategory: bookCategoryItems[0]
    });

  }


  getBookChangeData = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  getDropDownChangeData = e => {
    const value = e.target.value;
    const data = bookCategoryItems.find(item => item.value == value);
    const a = {
      text: data.text,
      value: data.value
    }
  }


  render() {
    return (
      <div id="bookForm">
        <Form onSubmit={this.addBook}>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>書籍名稱</Form.Label>
            <Form.Control type="text" placeholder="書籍名稱..." name="bookName" value={this.state.bookName} onChange={this.getBookChangeData}/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>書籍作者</Form.Label>
            <Form.Control type="text" placeholder="書籍作者..." name="bookAuthor" value={this.state.bookAuthor} onChange={this.getBookChangeData}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            新增
          </Button>
        </Form>

        <BootstrapTable data={ this.state.booksData } pagination bordered={ false }>
          <TableHeaderColumn dataField='BookId' isKey width={'10%'}>書籍編號</TableHeaderColumn>
          <TableHeaderColumn dataField='BookName' width={'30%'}>書籍名稱</TableHeaderColumn>
          <TableHeaderColumn dataField='BookCategory' width={'20%'}>書籍種類</TableHeaderColumn>
          <TableHeaderColumn dataField='BookAuthor' width={'20%'}>書籍作者</TableHeaderColumn>
          <TableHeaderColumn dataField='BookBoughtDate' width={'20%'}>購書日期</TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default BookSystem;

// <Form.Group controlId="formBasicEmail">
// <Form.Label>書籍類別</Form.Label>
// <Form.Control name="bookCategory" as="select" value={this.state.bookCategory.value} onChange={this.getDropDownChangeData}>
//   {bookCategoryItems.map((e, key) => {
//     return <option key={key} value={e.value}>{e.text}</option>;
//   })}
// </Form.Control>
// </Form.Group>