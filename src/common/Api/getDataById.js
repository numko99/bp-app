import firebase from '../firebase'

const getDataById = async (collection,serviceId) => {
    const ref = firebase.firestore().collection(collection).where(firebase.firestore.FieldPath.documentId(), '==', serviceId);
    var returnData = await ref.get().
                    then((data) => {
                    var dataList = data.docs.map((doc) =>
                                 ({ Id: doc.id, ...doc.data() }));
        return dataList[0];
    }).catch(err=>console.log(err));
    return returnData;
}

export default getDataById;

