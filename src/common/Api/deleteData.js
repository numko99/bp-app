import firebase from '../firebase'

const deleteData = async (collection,id) => {
    const ref = firebase.firestore().collection(collection);
    ref.doc(id).delete().catch(err=>console.log(err));

}

export default deleteData;


