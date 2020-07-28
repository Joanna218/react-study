import React, { Component } from 'react';
// react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Select from 'react-select';
// bookData
import { bookData } from '../book-data';
// css
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

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

    selectRef = React.createRef();

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

    // handleDelete = (rowId) => {
    //   console.log(rowId);
    // };

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
                            {/* <button
                className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row.id)}>
                編輯
              </button> */}
                            <button
                                className="btn btn-danger btn-xs"
                                onClick={() => handleDelete(row.BookId)} // 必須寫再一起 按了才註冊
                                // onClick={ this.handleDelete(row.BookId)} // render就註冊
                            >
                                刪除
                            </button>
                        </>
                    );
                }
            }
        ];

        const handleDelete = bookId => {
            const delBookIdIdx = this.state.booksData.findIndex(item => item.BookId === bookId);
            this.state.booksData.splice(delBookIdIdx, 1);
            this.setState({
                booksData: this.state.booksData
            });
        };

        return (
            <div id="bookForm">
                <Form onSubmit={this.addBook}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>書籍類別</Form.Label>
                        {/* <Form.Control name="bookCategory" as="select" ref={this.selectRef} value={this.state.bookCategory.value} onChange={this.getDropDownChangeData}>
              {bookCategoryItems.map((e, key) => {
                return <option key={key} value={e.value}>{e.text}</option>;
              })}
            </Form.Control> */}
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
