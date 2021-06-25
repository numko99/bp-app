import CustomServicesService from '../../common/Api/CusomServicesService';
import { service } from '../../common/Collections';

export const  createServiceStore=()=>{
     var servicesService=new CustomServicesService(service);
    const initialSorting={field:'CreatedAt',order:'desc'}
    return{
        
        services:[],
        sorting:initialSorting,
        filter:'',
        itemsPerPage:5,

        setSorting(field,order){
            this.sorting={field:field,order:order};
            this.getService();
        },
        setFilter(filter){
            this.filter=filter;
            this.getService();
        },
        async getService(){
            var list=await servicesService.CustomGet(this.sorting,this.itemsPerPage,this.filter);
            this.services=list;
        },
        addService(service){
            // this.filter=initialFilter;
            this.sorting=initialSorting;
            servicesService.add(service);
            this.getService();
        },
        removeService(id){
            servicesService.delete(id);
            this.getService();
        },
        async goAhead(){
            this.services=await servicesService.goAheadPaging(this.services,this.sorting,this.itemsPerPage,this.filter);
        },
       async goBack(){
            this.services=await servicesService.goBackPaging(this.services,this.sorting,this.itemsPerPage,this.filter);
        },
        
    }
}