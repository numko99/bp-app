import BaseService from "./BaseService"
import firebase from '../firebase'

class CustomServicesService extends BaseService {
    collection = null;
    ref = null;
    constructor(collection) {
        super(collection)
        this.ref = firebase.firestore().collection(collection);

    }
    async CustomGet(sorting,ITEMS_PER_PAGE,filter) {
        console.log(sorting.field,sorting.order)
        var tempRef=filter==''?this.ref:this.ref.where("ServiceCategoryId","==",filter);
        let items = await new Promise((resolve) => {
            tempRef.orderBy(sorting.field,sorting.order).
            limit(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                console.log(items.length)
                resolve(items);
            })
        });
        return items;
    }
    async goAheadPaging(services, sorting, ITEMS_PER_PAGE,filter) {
        var tempRef=filter==''?this.ref:this.ref.where("ServiceCategoryId","==",filter);
        var index = services.length - 1;
        var last = services[index] ? services[index][sorting.field] : "";
        let items = await new Promise((resolve) => {
            tempRef.orderBy(sorting.field,sorting.order).
            startAfter(last).limit(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                if(items.length!=0){
                    resolve(items);
                }
            })
        });
        return items;
    }

    async goBackPaging(services, sorting, ITEMS_PER_PAGE,filter) {
        var tempRef=filter==''?this.ref:this.ref.where("ServiceCategoryId","==",filter);

        var last = services[0] ? services[0][sorting.field] : "";
        let items = await new Promise((resolve) => {
            tempRef.orderBy(sorting.field,sorting.order).
            endBefore(last).limitToLast(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                if(items.length!=0){
                    resolve(items);
                }
            })
        });
        return items;
    }
    async getPreviousCount(services, sorting, ITEMS_PER_PAGE,filter) {
        var tempRef=filter==''?this.ref:this.ref.where("ServiceCategoryId","==",filter);
        var index = services.length - 1;
        var last = services[index] ? services[index][sorting.field] : "";
        let items = await new Promise((resolve) => {
            tempRef.orderBy(sorting.field,sorting.order).
            startAfter(last).limit(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items.length);
            })
        });
        return items;
    }
    async getNextCount(services, sorting, ITEMS_PER_PAGE,filter) {
        var tempRef=filter==''?this.ref:this.ref.where("ServiceCategoryId","==",filter);

        var last = services[0] ? services[0][sorting.field] : "";
        let items = await new Promise((resolve) => {
            tempRef.orderBy(sorting.field,sorting.order).
            endBefore(last).limitToLast(ITEMS_PER_PAGE).onSnapshot((querySnapshot) => {
                let items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ Id: doc.id, ...doc.data() });
                });
                resolve(items.length);
            })
        });
        return items;
    }
}

export default CustomServicesService;