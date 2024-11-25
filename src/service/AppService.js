import {BASE_CONFIG} from "./BaseConfig.js";
import {APP_API} from "./AppApi.js";
import {IS_STATUS} from "../utils/Chacked.js";
import {toast} from "react-toastify";

export const AddBook = async (data, getAll) => {
    try {
        const res = await BASE_CONFIG.doPost(APP_API.book, data)
        if (IS_STATUS(res.status)) {
            await getAll()
            return toast.success("Kitob saqlandi")
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