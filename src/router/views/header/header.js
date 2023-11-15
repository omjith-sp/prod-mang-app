import Hls from 'hls.js';
// import axios from 'axios';
export default {
    data(){
        return{
            searchQuery:'',
            isRadioPlaying:false,
            hls: null,
            volume:3,
            mediaApiEndpoint:'https://air.pc.cdn.bitgravity.com/air/live/pbaudio230/playlist.m3u8',
            aud: new Audio,
            maxVol:5
            
        }
    },
    props:{
        route:String
    },
    mounted() {
        // isRadioPlaying= localStorage.getItem('isRadioPlaying');
    },
    methods:{
        handleSearch(){
            this.$emit('search-Query',this.searchQuery)
        },
        handleSearchReset() {
            this.searchQuery=''
            this.handleSearch(this.searchQuery);
        },
        async fetchMediaPlaylist(stat , api) {
            try {
                if(api.includes('m3u8')){
                    if(stat=='start'){
                        this.hls = new Hls();
                        this.hls.loadSource(api);
                        this.hls.attachMedia(this.aud);
                        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {});
                        if(api.includes('vobook')){
                            console.log('m3u8 + vobook')
                            this.aud.crossOrigin = 'crossorigin'
                        }
                        this.aud.play();
                        this.aud.muted=false;
                    }
                    else{
                        console.log(stat);
                        this.hls.detachMedia(this.aud);
                        this.hls.destroy()
                        this.aud.pause();
                        this.aud.muted=true;
                        this.hls.on(Hls.Events.ERROR, (event, data) => {
                            console.error('HLS error:', event, data);
                        });
                    }
                }
            } 
            catch (error) {
                console.error('! fetching playlist:', error);
            }
        },
        radioStreaming() {
            this.isRadioPlaying = !this.isRadioPlaying;
            localStorage.setItem('isRadioPlaying', 'this.isRadioPlaying');
            if(this.isRadioPlaying){
                this.fetchMediaPlaylist('start' ,this.mediaApiEndpoint);
            }
            else{
                this.fetchMediaPlaylist('stop', this.mediaApiEndpoint);   
            }
        },
        updateVolume(){
            this.aud.volume=this.volume/this.maxVol;
        }
    },
    watch:{
        volume(){
            this.updateVolume();
        }
    }
    
}

