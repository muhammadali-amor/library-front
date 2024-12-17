import React, {useEffect, useState} from 'react';
import '../assets/Books.css'
import rasm from '../assets/images/img_1.png'
import {FaCheck, FaStar} from "react-icons/fa";
import {ImDownload2} from "react-icons/im";
import {MdOutlineReadMore} from "react-icons/md";
import axios from "axios";
import {BASE_URL} from "../service/BaseUrl.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {PiWarningOctagonBold} from "react-icons/pi";

const Books = ({books}) => {

    const navigate = useNavigate()

    const [bookImages, setBookImages] = useState({});
    const [error, setError] = useState("");

    let toastId = null

    const downloadPdf = async (fileName, name, author) => {
        try {
            const res = await axios.get(`http://localhost:9999/api/files/${fileName}`, {
                responseType: 'blob', // Faylni blob formatida olish
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}));
            link.download = `${name}_${author}.pdf`; // Fayl nomini o'zgartirish
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (!toast.isActive(toastId)) {
                toastId = toast.success(`${name} saqlandi !`, {
                    icon: <FaCheck style={{color: "green"}}/>,
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
                        background: "linear-gradient(to bottom, rgba(10, 229, 55), rgb(52, 255, 100))",
                    }
                });
                return toastId
            }
        } catch (error) {
            console.error('PDFni yuklab olishda xato:', error);
        }
    };

    const getBookPdf = async (fileName) => {
        try {
            const res = await axios.get(`http://localhost:9999/api/files/${fileName}`, {
                responseType: 'arraybuffer',  // Faylni binary formatda olish
            });

            // Yangi oynada PDF faylini ko'rsatish
            const fileURL = URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}));
            window.open(fileURL, '_blank');  // Yangi oynada ochish

        } catch (err) {
            toast.error("get pdf xatolik")
        }
    }

    const getBookImage = async (bookName, authorName) => {
        // const query = ` Urush va Tinchlik  Lev Tolstoy`;+
        const query = `${bookName} ${authorName}`;
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const imageUrl = data.items[0].volumeInfo.imageLinks?.thumbnail;
                return imageUrl;
            }
            return null;
        } catch (error) {
            console.error("Kitob rasmiga ulanishda xato:", error);
            return null;
        }
    };

    useEffect(() => {
        const getBookImages = async () => {
            const images = {};
            for (const book of books) {
                const img = await getBookImage(book.name, book.author)
                // images[book.id] = img;
                if (img !== null) {
                    images[book.id] = img;
                } else {
                    images[book.id] = rasm;
                }
            }
            setBookImages(images);
        };

        getBookImages();
    }, [books]);


    return (
        <div className={"books"}>
            {books.map((item, i) => (
                <div className="card book">
                    <div className="img-div" onClick={() => getBookPdf(item.pdfBookFileName)}>
                        <button className="read">
                            <MdOutlineReadMore className={'read-icon'}/>
                        </button>
                        <img className={"img"} src={bookImages[item.id] !== null ? bookImages[item.id] : rasm} alt=""/>
                        {/*<img className={"img"} src={bookImages[item.id]}     alt=""/>*/}
                    </div>
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="description">
                        <p className="description-p">
                            {item.description}
                        </p>
                    </div>
                    <div className="footer">
                        <div className="author">
                            {item.author}
                        </div>
                        <span className="grade">
                        <button className="btn-download"
                                onClick={() => downloadPdf(item.pdfBookFileName, item.name, item.author)}><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Books;