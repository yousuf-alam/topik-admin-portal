<template>
    <div>
        <!-- For Test Purpose Only -->
    </div>
</template>

<script>
export default {
    name: 'TestDesktopNoti',
    data() {
        return {

        }
    },

    created() {
        console.log('TestDesktopNoti: called: ')
        this.notifyMe();
    },
    methods: {

         notifyMe() {
            if (!('Notification' in window)) {
            alert('This browser does not support system notifications');
            } else if (Notification.permission === 'granted') {
                this.notify();
            } else if(Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission){
                    if (permission === 'granted') {
                        this.notify();
                    } 
                });    
            }
        },


         notify() {
            console.log('NOTIFY_CALLED_NOTIFY_CALLED:. ', Notification.permission);
            let noti = new Notification("This is the text", {
                tag: 'greeting-notify',
                icon: 'http://icons.iconarchive.com/icons/webalys/kameleon.pics/256/Online-Shopping-icon.png',
                body: 'This IS THE BODY'
            });
            noti.onclick = function () {
                window.open('https://www.facebook.com/');
            }
            console.log('noti::::::::::::::::...: ', noti);
            setTimeout(noti.close.bind(noti), 7000);
        }

    }

}





</script>

