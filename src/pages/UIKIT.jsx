import React, {useEffect, useState} from 'react';
import rasm from '../assets/images/rasm.png'
import rasm1 from '../assets/images/rasm1.png'
import rasm2 from '../assets/images/digital-nature-blue-4k-g8-1680x1050.jpg'

import '../assets/User/UiKit.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BASE_CONFIG} from "../service/BaseConfig.js";
import {APP_API} from "../service/AppApi.js";
import Loading from "../component/Loading.jsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

UIkit.use(Icons);


function UIKit() {

    const [books, setBooks] = useState([])
    const [bookImages, setBookImages] = useState([])

    let toastId = null;

    const [loading, setLoading] = useState(false)

    const itemsPerPage = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(books.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

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

        const getAll = async () => {
            try {
                const res = await BASE_CONFIG.doGet(APP_API.book)
                setLoading(true)
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getAll()
        getBookImages()
    }, [])

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

    return (
        loading ? <div className={'all'}>
            <div className="uikit">
                <nav className="uk-navbar-container">
                    <div className="uk-container">
                        <div uk-navbar={'true'}>
                            <div className="uk-navbar-left">
                                <ul className="uk-navbar-nav">
                                    <li className="uk-active"><a href="#">Home</a></li>
                                    <li>
                                        <a href="#">Janrlar <span uk-navbar-parent-icon={'true'}></span></a>
                                        <div className="uk-navbar-dropdown">
                                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                                <li className="uk-active"><a href="#">Badiy Asarlar</a></li>
                                                <li className="uk-nav-divider"></li>
                                                <li className="uk-nav-header">Fantastik</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li><a href="#">Contact</a></li>
                                </ul>

                            </div>
                            <div className="uk-navbar-right">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/library!admin-dashboard">Log IN</Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </nav>
                <div>
                    <div className=" uk-position-relative uk-visible-toggle uk-light" tabIndex="-1"
                         uk-slideshow="animation: fade" uk-slider="autoplay: true; autoplay-interval: 600;">
                        <div className="imgs uk-slideshow-items">
                            <div>
                                <img src={rasm} alt="" uk-cover={'true'}/>
                            </div>
                            <div>
                                <img src={rasm2} alt="" uk-cover={'true'}/>
                            </div>
                        </div>
                        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href={'true'}
                           uk-slidenav-previous={'true'} uk-slideshow-item="previous"></a>
                        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href={'true'}
                           uk-slidenav-next={'true'}
                           uk-slideshow-item="next"></a>
                    </div>
                </div>
                <ul className="uk-grid-small  uk-child-width-1-2 uk-child-width-1-4@s" uk-sortable="handle: .uk-card"
                    uk-grid={'true'}>
                    {currentItems.map((item, index) => (
                        <li onClick={()=>getBookPdf(item.pdfBookFileName)} key={index}>
                            <div className="uk-card">
                                <img src={bookImages[item.id]} alt=""/>
                                <h5>{item.name}</h5>
                                <h6>{item.author}</h6>
                            </div>
                        </li>
                    ))}
                </ul>
                <nav aria-label="Pagination" className={'pagination'}>
                    <ul className="uk-pagination" uk-margin={'true'}>
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous"
                            >
                                <span uk-pagination-previous="true"></span>
                            </button>
                        </li>
                        {pageNumbers.map((number) => (
                            <li key={number} className={currentPage === number ? 'uk-active' : ''}>
                                <button onClick={() => handlePageChange(number)}>{number}</button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pageNumbers.length}
                                aria-label="Next"
                            >
                                <span uk-pagination-next="true"></span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div> : <Loading/>

    );
}

export default UIKit;


// {/*<div className="carousel uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="true"*/}
// {/*     uk-slider="autoplay: true; autoplay-interval: 1000;">*/}
// {/*    <div className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">*/}
// {/*        {[rasm, rasm, rasm, rasm, rasm, rasm].map((image, index) => (*/}
// {/*            <div key={index}>*/}
// {/*                <div className="uk-panel ml-6">*/}
// {/*                    <img src={image} width="400" height="600" alt={`Slider ${index + 1}`}/>*/}
// {/*                    <div className="uk-position-center uk-panel ">*/}
// {/*                        <h1>{index + 1}</h1>*/}
// {/*                    </div>*/}
// {/*                </div>*/}
// {/*            </div>*/}
// {/*        ))}*/}
// {/*    </div>*/}
//
// {/*    <a*/}
// {/*        className="uk-position-center-left uk-position-small uk-hidden-hover"*/}
// {/*        href="#"*/}
// {/*        uk-slidenav-previous="true"*/}
// {/*        uk-slider-item="previous"*/}
// {/*    ></a>*/}
// {/*    <a*/}
// {/*        className="uk-position-center-right uk-position-small uk-hidden-hover"*/}
// {/*        href="#"*/}
// {/*        uk-slidenav-next="true"*/}
// {/*        uk-slider-item="next"*/}
// {/*    ></a>*/}
// {/*</div>*/}