import React, {useEffect, useState} from 'react';
import '../../assets/Admin/Menu.css';
import {BASE_CONFIG} from "../../service/BaseConfig.js";
import {APP_API} from "../../service/AppApi.js";
import Books from "../../pages/Books.jsx";
import {FaSearch} from "react-icons/fa";
import {FiMinus, FiPlus} from "react-icons/fi";
import {toast} from "react-toastify";
import {PiWarningOctagonBold} from "react-icons/pi";
import {AddBook} from "../../service/AppService.jsx";
import {IS_STATUS} from "../../utils/Chacked.js";
import Loading from "../Loading.jsx";
import axios from "axios";
import pdfPage from "../../pages/PdfPage.jsx";

const Menu = () => {
    const [books, setBooks] = useState([])
    const [bookName, setBookName] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookDescription, setBookDescription] = useState('')
    const [bookPdf, setBookPdf] = useState(null)

    let toastId = null;

    const [loading, setLoading] = useState(false)
    const [addBook, setAddBook] = useState(false)

    const toggleAdd = () => setAddBook(!addBook)

    const adBook = async (bookFileName) => {
        try {
            // let formData = new FormData();
            // formData.append("name", bookName);
            // formData.append("author", bookAuthor);
            // formData.append("description", bookDescription);
            // formData.append("pdfBookFileName", bookPdfName);
            let formData = {
                name: bookName,
                author: bookAuthor,
                description: bookDescription,
                pdfBookFileName: bookFileName
            }
            let set = {
                bookName: setBookName,
                bookAuthor: setBookAuthor,
                bookDescription: setBookDescription,
                bookPdf: setBookPdf,
                bookPdfName: bookFileName
            }
            const res = await AddBook(formData, getAll, set)
            if (res) {
                toggleAdd()
                setLoading(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAll = async () => {
        try {
            const res = await BASE_CONFIG.doGet(APP_API.book)
            setLoading(true)
            setBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBookPdf(file);
        } // Tanlangan faylni olish
    };

    const handleUpload = async () => {
        if (!bookPdf) {
            if (!toast.isActive(toastId)) {
                toastId = toast.warning("Fayl tanlanmagan !", {
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
                return;
            }
        }

        const formData = new FormData();
        formData.append('file', bookPdf);

        if (bookName.length === 0 || bookAuthor.length === 0 || bookDescription.length === 0) {
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
                return;
            }
        }
        if (bookDescription.length < 50) {
            if (!toast.isActive(toastId)) {
                toastId = toast.warning("Kitob tavsifi kam !", {
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
                return;
            }
        }

        try {
            // Faylni serverga yuborish
            const res = await axios.post(`http://localhost:9999/api/files/upload`, formData, {
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    // "Content-Type": "multipart/form-data", // Faylni yuborish uchun
                },
            });
            if (res.status === 200) {
                // Fayl muvaffaqiyatli yuklandi, filenameni olish
                await adBook(res.data)
            }
        } catch (error) {
            console.error('Fayl yuklashda xatolik yuz berdi', error);
            toast.error('Fayl yuklashda xatolik yuz berdi');
        }
    };


    return (
        !loading ? <Loading/> :
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
                        <input value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}
                               placeholder={"Kitob aftori"}
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
                        <input onChange={e => handleFileChange(e)}
                               placeholder={"Kitob file"}
                               type="file"
                               accept={"application/pdf"}
                               id={"file-upload"}
                               className="input "/>
                    </div>
                    <button className="btn save-btn" onClick={() => handleUpload()}>
                        Saqlash
                    </button>
                </div>
                <div className="books">
                    <Books books={books}/>
                </div>
            </div>
    );
};

export default Menu;