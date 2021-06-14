import firebase from '../firebase'

const getData = async (collection) => {
    const ref = firebase.firestore().collection(collection);

    var returnData = await ref.get().
                    then((data) => {
                    var dataList = data.docs.map((doc) =>
                                 ({ Id: doc.id, ...doc.data() }));
        return dataList;
    }).catch(err=>console.log(err));
    return returnData;
}

export default getData;

