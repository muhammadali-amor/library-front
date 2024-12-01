import React, {useEffect, useState} from 'react';
import {BASE_CONFIG} from "../service/BaseConfig.js";
import {APP_API} from "../service/AppApi.js";
import '../assets/Books.css'
import rasm from '../assets/images/img_1.png'
import {FaStar} from "react-icons/fa";
import {ImDownload2} from "react-icons/im";
const Books = () => {

    const [books, setBooks] = useState([])

    const getAll = async () => {
        try {
            const res = await BASE_CONFIG.doGet(APP_API.book)
            setBooks(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className={"books"}>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
            <div className="card book">
                <img className={"img"} src={rasm} alt=""/>
                <div className="name">
                    Book Iyu
                </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea excepturi ipsam perspiciatis praesentium quo tempore.
                </div>
                <div className="footer">
                    <div className="author">
                        Viliam Shekspir
                    </div>
                    <span className="grade">
                        <button className="btn-download"><ImDownload2/></button>
                        <p className={"number"}>5</p>
                        <FaStar className={"icon"}/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Books;