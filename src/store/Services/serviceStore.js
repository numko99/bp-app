import CustomServicesService from '../../common/Api/CusomServicesService';
import { service } from '../../common/Collections';

export const  createServiceStore=()=>{
     var servicesService=new CustomServicesService(service);
    
    return{
        
        services:[],
        async getService(){
            var sorting={field:'Price',order:'asc'}
            var list=await servicesService.CustomGet(sorting,5,'PDlR8naMBrC124E3rAyA');
            this.services=list;
        },
        addService(service){
            servicesService.add(service);
            this.getService();
        },
        removeService(id){
            servicesService.delete(id);
            this.getService();

        }
      
        
    }
}