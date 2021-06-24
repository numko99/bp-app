export const  createComputedDataStore=()=>{
    
    return{
        search:"",
        filter:"",
        setSearch(text){
            this.search=text;
        },
        setFilter(text){
            this.filter=text;
        },
        
    }
}