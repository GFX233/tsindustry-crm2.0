import { firebaseApp } from "./firebase";
import { getFirestore, collection, addDoc, getDocs, query, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"


// Initialize Firebase
const db = getFirestore(firebaseApp)

export const addData = async (where: string, body: object) => {
    try {
        const docRef = await addDoc(collection(db, where), body)
        console.log("Document added with ID: ", docRef.id)
        return docRef
    } catch (e) {
        console.error("Error adding doc: ", e)
    }
}

export const editData = async (where: string, id: string, data: object) => {
    const docRef = await setDoc(doc(db, where, id), data)
    console.log("Document with id: ", id, " edited!")
    return docRef
}

export const getInfo = async (from: string, id: string) => {
    const docData = await getDoc(doc(db, from, id))
    return docData.data()
}


export const deleteItem = async (id: string) => {
    try {
        const docDel = await deleteDoc(doc(db, "orders", id))
        return docDel
    } catch (e) {
        console.error("Error deleting doc: ", e)
    }
}

export const getOrders = async () => {
    const dataQuery = await getDocs(query(collection(db, "orders")))
    const data: object[] = []
    dataQuery.docs.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id })
    })
    return data
}

export const getCustomers = async () => {
    const dataQuery = await getDocs(query(collection(db, "customers")))
    const data: object[] = []
    dataQuery.docs.forEach(doc => data.push(doc.data()))
    return data
}




