<template>
    <div class="customcard">
        <h1>Test Lineitem Create</h1>
          <form-wizard 
          @on-complete="onComplete" shape="tab" color="#9b59b6"
          error-color="#e74c3c" title="Add new line item..." subtitle=""
          >
                <tab-content title="Basic Info" icon="ti-user" :before-change="beforeTabSwitch">
                    <BasicInfo />
                </tab-content>
                
                <tab-content title="Details" icon="ti-settings">
                    <Details />
                </tab-content>
                
                <tab-content title="Question Set"  icon="ti-settings">
                    <QuestionSet />
                </tab-content>
                <tab-content title="Pricing"  icon="ti-check">
                    <Pricing />
                </tab-content>
                <div v-if="errorMsg">
                    <span class="text-danger">{{errorMsg}}</span>
                </div>
        </form-wizard>
    </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import BasicInfo from './BasicInfo';
import Details from './Details';
import QuestionSet from './QuestionSet';
import Pricing from './Pricing';
export default {
    name: 'TestLineitemCreate',
    components: {
        FormWizard,
        TabContent,
        BasicInfo,
        Details,
        QuestionSet,
        Pricing
    },
    data() {
        return {
            count: 0,
            errorMsg: ''
        }
    },
    methods: {
        onComplete: function(){
           alert('Yay. Done!');
        },
        beforeTabSwitch(e) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if(this.count < 1){
               this.count ++
                    this.errorMsg = 'ppppppppppppppp';
                  reject('This is a custom validation error message. Click next again to get rid of the validation')
              }else{
               this.count = 0
               resolve(true)
              }   
            }, 1000)
          });

        }
    }


}
</script>

<style>

</style>
