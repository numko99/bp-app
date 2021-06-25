import BaseService from '../../common/Api/BaseService';
import { serviceCategory } from '../../common/Collections';

export const  createServiceCategoryStore=()=>{
     var categoryService=new BaseService(serviceCategory);
    return{
        
        servicesCategories:[],

        async getServiceCategory(){
            var list=await categoryService.get();
            this.servicesCategories=list;
        },
        // addService(service){
        //     // this.filter=initialFilter;
        //     this.sorting=initialSorting;
        //     servicesService.add(service);
        //     this.getService();
        // },
        // removeService(id){
        //     servicesService.delete(id);
        //     this.getService();
        // },
       
        
    }
}