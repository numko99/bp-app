import firebase from '../firebase'

const GetDataFromDatabase = async (collection) => {
    const ref = firebase.firestore().collection(collection);

    var returnData = await ref.get().
                    then((data) => {
                    var dataList = data.docs.map((doc) =>
                                 ({ Id: doc.id, ...doc.data() }));
        return dataList;
    });
    return returnData;
}

export default GetDataFromDatabase;

