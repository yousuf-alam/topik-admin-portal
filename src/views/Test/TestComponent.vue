<template>
    <div>Test Component</div>
</template>

<script>
export default {
    name: 'TestComponent',
    data() {
        return {
            allNotiCounter: 0,
            unreadNotiCounter: 0
        }
    },
    created() {
        console.log('created TestComponent ---',);
        this.countAllNoti();
        this.countUnreadNoti();
    },
    methods: {
        countAllNoti() {
           this.$store.dispatch('noti/countAllNoti')
                .then(res => {
                    console.log(res.data);
                    this.allNotiCounter = res.data;
                }).catch(error => {
                    console.log('Error  ==== ', error.response)
                })
            
            
        },
        countUnreadNoti() {

        }
    }

}
</script>

<style>

</style>
