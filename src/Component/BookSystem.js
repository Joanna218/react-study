import React, { Component } from 'react';
// react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
// bookData
import { bookData } from '../book-data';
// css
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// images
// import database from '../images/database.jpg';
const bookCategoryItems = [
  { label: '資料庫', value: 'database' },
  { label: '網際網路', value: 'internet' },
  { label: '家庭保健', value: 'home' },
  { label: '應用系統整合', value: 'system' },
  { label: '語言', value: 'language' }
];

const defaultSorted = [
  {
    dataField: 'BookId',
    order: 'asc' // desc
  }
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
    };
  }

  addBook = e => {
    e.preventDefault();
    this.state.booksData.push({
      BookId: this.state.maxBookId + 1,
      BookCategory: this.state.bookCategory.label,
      BookName: this.state.bookName,
      BookAuthor: this.state.bookAuthor,
      BookBoughtDate: '1990-06-18',
      BookPublisher: '創創公司'
    });
    this.setState({
      booksData: this.state.booksData,
      maxBookId: this.state.maxBookId + 1,
      bookName: '',
      bookAuthor: '',
      bookCategory: bookCategoryItems[0]
    });
  };

  getBookChangeData = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  getDropDownChangeData = bookCategory => {
    this.setState({ bookCategory });
    console.log(`Option selected:`, bookCategory);
  };

  handleDelete = (bookId) => {
    const delBookIdIdx = this.state.booksData.findIndex(item => item.BookId === bookId);
      this.state.booksData.splice(delBookIdIdx, 1);
      this.setState({
        booksData: this.state.booksData
      });
  };

  handleEdit = (bookId) => {
    console.log(bookId);
  }

  render() {
    const columns = [
      { dataField: 'BookId', text: 'BookId', sort: true },
      { dataField: 'BookCategory', text: 'BookCategory', sort: true },
      { dataField: 'BookName', text: 'BookName', sort: true },
      { dataField: 'BookAuthor', text: 'BookAuthor', sort: true },
      {
        dataField: 'deleteBookId',
        text: 'actions',
        formatter: (cellContent, row) => {
          return (
            <>
              <button
                className="btn btn-danger btn-xs"
                onClick={() =>this.handleEdit(row.BookId)}>
                編輯
              </button>
              <button
                className="btn btn-danger btn-xs"
                onClick={() => this.handleDelete(row.BookId)}>
                刪除
              </button>
            </>
          );
        }
      }
    ];
    return (
      <div id="bookForm">
      <Modal
          show={true}
          // onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <Modal.Header closeButton>
            <Modal.Title>新增書籍</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addBook}>
              <Form.Group controlId="formBasicEmail">
                <Image src={require('../images/'+this.state.bookCategory.value+'.jpg')} width="465" height="250" rounded/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>書籍類別</Form.Label>
                <Select
                  name="bookCategory"
                  options={bookCategoryItems}
                  value={this.state.bookCategory}
                  onChange={this.getDropDownChangeData}
                  isSearchable={false}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>書籍名稱</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="書籍名稱..."
                  name="bookName"
                  value={this.state.bookName}
                  onChange={this.getBookChangeData}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>書籍作者</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="書籍作者..."
                  name="bookAuthor"
                  value={this.state.bookAuthor}
                  onChange={this.getBookChangeData}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                新增
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
              取消
            </Button>
            <Button variant="primary">新增</Button>
        </Modal.Footer>

        </Modal>

        <BootstrapTable
          bootstrap4
          keyField="BookId"
          data={this.state.booksData}
          columns={columns}
          pagination={paginationFactory()}
          defaultSorted={defaultSorted}
        />
      </div>
    );
  }
}

export default BookSystem;
