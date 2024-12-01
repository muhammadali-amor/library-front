import {BASE_CONFIG} from "./BaseConfig.js";
import {APP_API} from "./AppApi.js";
import {IS_STATUS} from "../utils/Chacked.js";
import {toast} from "react-toastify";
import React from "react";
import {FaCheck} from "react-icons/fa";

let toastId = null;

export const AddBook = async (data, getAll, set) => {
    try {
        const res = await BASE_CONFIG.doPost(APP_API.book, data)
        if (IS_STATUS(res.status)) {
            await getAll()
            set.bookDescription('')
            set.bookName('')
            set.bookAuthor('')
            set.bookPdf(null)
            if (!toast.isActive(toastId)) {
                toastId = toast.success("Kitob saqlandi !", {
                    icon: `${<FaCheck style={{color: "green"}}/>}`,
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
        }
    } catch (err) {
        console.log(err)
        return toast.error("Kitob saqlashda xatolik")
    }
}

export const DeleteBook = async (id, getAll) => {
    try {
        const res = await BASE_CONFIG.doDelete(APP_API.book, id)
        if (IS_STATUS(res.status)) {
            await getAll()
            return toast.success("Kitob o'chirildi")
        }
    } catch (e) {
        console.log(e)
    }
}