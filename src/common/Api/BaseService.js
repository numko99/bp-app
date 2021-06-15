import firebase from '../firebase'


class BaseService {
    collection = null;
    ref = null;
    constructor(collection) {
        this.collection = collection;
        this.get = this.get.bind(this);
        this.ref = firebase.firestore().collection(this.collection);

    }
    async get(ref = this.ref) {
        let items = await new Promise((resolve, rejct) => {
            ref.onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items);
            });
        });
        return items;
    }
    async getById(id) {
        var ref = this.ref.where(firebase.firestore.FieldPath.documentId(), '==', id);
        let items = await new Promise((resolve, rejct) => {
            ref.onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items[0]);
            });
        });
        return items;
    }

    async delete(id) {
       await this.ref.doc(id).delete().catch(err => console.log(err));
    }
    async add(data) {
       await this.ref.add(data).catch(err => console.log(err));
    }
    async update(data) {
        await this.ref.doc(data.Id).update(data).catch(err => console.log(err));
    }
}
export default BaseService;