import React, {useEffect, useState} from 'react';
import '../../assets/Admin/Menu.css';
import {BASE_CONFIG} from "../../service/BaseConfig.js";
import {APP_API} from "../../service/AppApi.js";
import Books from "../../pages/Books.jsx";
import {FaSearch} from "react-icons/fa";
import {FiMinus, FiPlus} from "react-icons/fi";
import {toast} from "react-toastify";
import {PiWarningOctagonBold} from "react-icons/pi";
import {AddBook} from "../../service/AppService.js";

const Menu = () => {
    const [books, setBooks] = useState([])
    const [bookName, setBookName] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookDescription, setBookDescription] = useState('')
    const [bookPdf, setBookPdf] = useState()

    let toastId = null;

    const [addBook, setAddBook] = useState(false)

    const toggleAdd = () => setAddBook(!addBook)

    const adBook = async () => {
        try {
            if (bookName.length === 0 || bookAuthor.length === 0 || bookDescription.length === 0 || bookPdf === undefined) {
                if (!toast.isActive(toastId)) {
                    toastId = toast.warning("Ma'lutmotlar to'liq emas !", {
                        icon: <PiWarningOctagonBold/>,
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                            backgroundColor: "darkblue",
                            color: "white"
                        },
                        progressStyle: {
                            background: "linear-gradient(to bottom, rgba(10, 129, 255), rgb(152, 168, 220))",
                        }
                    });
                }
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(bookPdf)
                reader.onload = async () => {
                    const base64 = reader.result.split(",")[1];
                    let data = {
                        name: bookName,
                        author: bookAuthor,
                        description: bookDescription,
                        pdfBook: base64
                    }
                    const res = await AddBook(data, getAll)
                }
                reader.onerror = () => {
                    toast.error("Faylni o'qishda xatolik yuz berdi!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                };
            }


        } catch (err) {

        }
    }

    const getAll = async () => {
        try {
            const res = await BASE_CONFIG.doGet(APP_API.book)
            setBooks(res.data)
            console.log(books)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    function updateFileName(e) {
        const fileInput = e.target
        const file = e.target.files[0]

        const fileNameDisplay = document.getElementById("file-name");

        if (file) {
            setBookPdf(file)
            fileNameDisplay.textContent = "Tanlangan fayl: " + fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = "Tanlangan fayl: Yo'q";
        }
    }


    return (
        <div className={'all-menu'}>
            <div className="control-p">
                <div className="control-panel">
                    <div className="search">
                        <FaSearch className={"search-icon"}/>
                        <input type={"search"} placeholder={"Kitob nomi"} className={"search-input"}/>
                    </div>
                    <button className="btn add" onClick={() => toggleAdd()}>
                        Kitob Qo'shish {addBook ? <FiMinus/> : <FiPlus/>}
                    </button>
                </div>
            </div>
            <div className={addBook ? 'add-book a-book' : 'a-book'}>
                <div className="book-input bookName">
                    <label htmlFor={"bookName"}>Kitob nomi</label>
                    <input value={bookName} onChange={e => setBookName(e.target.value)} placeholder={"Kitob nomi"}
                           type="text" id={"bookName"} className="input "/>
                </div>
                <div className="book-input bookAuthor">
                    <label htmlFor={"bookAuthor"}>Kitob avtori kim</label>
                    <input value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} placeholder={"Kitob aftori"}
                           type="text" id={"bookAuthor"} className="input "/>
                </div>
                <div className="book-input bookDescription">
                    <label htmlFor={"bookDescription"}>Kitob tavsifi</label>
                    <input value={bookDescription} onChange={e => setBookDescription(e.target.value)}
                           placeholder={"Kitob tavsifi"} type="text" id={"bookDescription"} className="input"/>
                </div>
                <div className="book-input bookFile">
                    <div className={'file-name'} id={"file-name"}>File nomi</div>
                    <label htmlFor={"file-upload"} className={'custom-file-input input'}>Kitob file</label>
                    <input onChange={e => updateFileName(e)} placeholder={"Kitob file"}
                           type="file" id={"file-upload"} className="input "/>
                </div>
                <button className="btn save-btn" onClick={() => adBook()}>
                    Saqlash
                </button>
            </div>
            <div className="books">
                <Books/>
            </div>
        </div>
    );
};

export default Menu;