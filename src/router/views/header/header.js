export default {
    data(){
        return{
            searchQuery:''
        }
    },
    props:{
        route:String
    },
    methods:{
        handleSearch(){
            this.$emit('search-Query',this.searchQuery)
        },
        handleSearchReset() {
            this.searchQuery=''
            this.handleSearch(this.searchQuery);
        },
    }
    
}

