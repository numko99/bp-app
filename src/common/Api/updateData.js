import firebase from '../firebase'

const updateData = async (collection,data) => {
    const ref = firebase.firestore().collection(collection);
    ref.doc(data.Id).update(data).catch(err=>console.log(err));
}
export default updateData;


