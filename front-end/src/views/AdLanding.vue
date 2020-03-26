<template>
    <div>
        <v-btn @click="logout" color="teal darken-3">Logout</v-btn>
        </div>
</template>

<script>
import axios from '../axios'
import a from 'axios'
export default {
    name:'Landing',
    beforeCreate(){
        if(localStorage.getItem('token') ===  null){
            this.$router.push('/')
        }
        else{
            axios.get().then((res)=>{
                console.log(res.data)
                if(res.data.isAdmin === true){
                            console.log(res.data)
                        }
                else{
                    alert('You are trying to access higher level access and have been flagged in our audition process')
                    
                    a.post('http://localhost:3000/flag',res.data).then((response)=>{
                        console.log(response)
                    })
                    this.$router.push('/')
                }
            })
           
        }
    },
    methods:{
        logout(){
            localStorage.removeItem('token')
            a.get('http://localhost:3000/logout').then((res)=>{
                alert(res.data)
                                this.$router.push('/AdLog')

            })
        }
    }

}
</script>