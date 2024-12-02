import React, {useEffect, useState} from 'react';
import '../assets/Books.css'
import rasm from '../assets/images/img_1.png'
import {FaStar} from "react-icons/fa";
import {ImDownload2} from "react-icons/im";
import {MdOutlineReadMore} from "react-icons/md";
import axios from "axios";
import {BASE_URL} from "../service/BaseUrl.js";
import {useNavigate} from "react-router-dom";

const Books = ({books}) => {

    const navigate = useNavigate()

    const [bookImages, setBookImages] = useState({});
    const [error, setError] = useState("");

    const fetchPdf = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${id}`, {responseType: 'arraybuffer'});
            const pdfBlob = new Blob([response.data], {type: 'application/pdf'});
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error("PDFni olishda xato:", error);
        }
    };

    const downloadPdf = async (id, name, author) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${id}`, {responseType: 'arraybuffer'});
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${name} ${author}.pdf`;
            link.click();
        } catch (error) {
            console.error('PDFni yuklab olishda xato:', error);
        }
    };

    const getBookImage = async (bookName, authorName) => {
        // const query = ` Urush va Tinchlik  Lev Tolstoy`;
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
                    <div className="img-div" onClick={() => fetchPdf(item.id)}>
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
                                onClick={() => downloadPdf(item.id, item.name, item.author)}><ImDownload2/></button>
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