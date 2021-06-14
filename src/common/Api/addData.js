import firebase from '../firebase'

const addData = async (collection,data) => {
    const ref = firebase.firestore().collection(collection);
    ref.add(data).catch(err=>console.log(err));
    
}

export default addData;


