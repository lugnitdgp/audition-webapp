<template>
    <div>
        <v-btn @click="logout" color="teal darken-3">Logout</v-btn>
        </div>
</template>

<script>

import axios from 'axios'
export default {
    name:'Landing',
    beforeCreate(){
        if(localStorage.getItem('token') ===  null){
            this.$router.push('/')
        }
        else{
            axios.get().then((res)=>{
                console.log(res.data)
                if(res.data.isAdmin === false){
                            console.log(res.data)
                        }
                else{
                    alert('You are the Admin. Accessing wrong route, re-routing')
                    this.$router.push('/AdLog')
                }
            })
           
        }
    },
    created(){
                      this.$vuetify.theme.dark = true

    },
    methods:{
        logout(){
            axios.get('http://localhost:3000/logout').then((res)=>{
                alert(res.data)
                this.$router.push('/StLog')
            })
        }
    }

}
</script>