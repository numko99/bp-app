import BaseService from "./BaseService"
import firebase from '../firebase'

class CustomServicesService extends BaseService {
    collection = null;
    ref = null;
    constructor(collection) {
        super(collection)
        this.ref = firebase.firestore().collection(collection);

    }

    
    async goAheadPaging(services, orderField, ITEMS_PER_PAGE, ref = this.ref) {
        var index = services.length - 1;
        var last = services[index] ? services[index][orderField] : "";
        let items = await new Promise((resolve) => {
            ref.orderBy(orderField).startAfter(last).limit(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items);
            })
        });
        return items;
    }
    async goBackPaging(services, orderField, ITEMS_PER_PAGE, ref = this.ref) {
        var last = services[0] ? services[0][orderField] : "";
        let items = await new Promise((resolve) => {
            ref.orderBy(orderField).endBefore(last).limitToLast(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items);
            })
        });
        return items;
    }
}

export default CustomServicesService;