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

    const [pdfData, setPdfData] = useState(null)

    const fetchPdf = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${id}`, { responseType: 'arraybuffer' });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error("PDFni olishda xato:", error);
        }
    };

    const downloadPdf = async (id, name, author) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${id}`, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${name} ${author}.pdf`;
            link.click();
        } catch (error) {
            console.error('PDFni yuklab olishda xato:', error);
        }
    };



    return (
        <div className={"books"}>
            {books.map(item => (
                <div className="card book">
                    <div className="img-div" onClick={() => fetchPdf(item.id)}>
                        <button className="read">
                            <MdOutlineReadMore className={'read-icon'} />
                        </button>
                        <img className={"img"} src={rasm} alt=""/>
                    </div>
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="description">
                        {item.description}
                    </div>
                    <div className="footer">
                        <div className="author">
                            {item.author}
                        </div>
                        <span className="grade">
                        <button className="btn-download" onClick={()=> downloadPdf(item.id, item.name, item.author)}><ImDownload2/></button>
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