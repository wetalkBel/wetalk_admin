
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Calls</h4>
                <b-form-group
                    label="phoneNumber"
                    label-for="idm2725011536"
                >
                    <b-form-input
                       v-model="phoneNumber"
                       type="text"
                       id="idm2725011536"
                    ></b-form-input>
                </b-form-group>
            
<!--            <b-form-group-->
<!--                    label="User"-->
<!--                    label-for="idm2725396416"-->
<!--            >-->
<!--                <v-select-->
<!--                    inputId="idm2725396416"-->
<!--                    v-model="user"-->
<!--                    :options="optionsUser"-->
<!--                    @search="searchUser"-->
<!--                >-->
<!--                    <template #option="option">-->
<!--                        {{ option.label }}-->
<!--                    </template>-->
<!--                </v-select>-->
<!--            </b-form-group>-->
            
            <b-form-group
                    label="Psychologist"
                    label-for="idm2725243920"
            >
                <v-select
                    inputId="idm2725243920"
                    v-model="psy"
                    :options="optionsPsychologist"
                    @search="searchPsychologist"
                >
                    <template #option="option">
                        {{option.label}}
                    </template>
                </v-select>
            </b-form-group>
            
        <b-row>
            <b-col>
                <button type="submit" class="btn btn-primary">
                    Save
                </button>
                <button @click="formatData" type="button" class="btn btn-light ml-2">
                    Reset
                </button>
                <router-link :to="cancelUrl">
                    <button type="button" class="btn btn-light ml-2">
                        Cancel
                    </button>
                </router-link>
            </b-col>
        </b-row>
        </form>
    </Widget>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import dataFormatter from '@/use/dataFormatter.js'

export default {
    data () {
      return {
        id: null,
        phoneNumber: '',
        psy: '',
        
    }
  },
    computed: {
    ...mapState({
        data: state => state.callsForm.data,
    
        //optionsUser: state => state.chatsForm.searchResultUser,
        
        optionsPsychologist: state => state.callsForm.searchResultPsychologist,
        
      }),
    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
    },
    dataFormatter() {
        return dataFormatter
    }
   },
    methods: {
    ...mapActions({
        getData: 'callsForm/getData',
        
        //searchUser: 'chatsForm/searchUser',
        
        searchPsychologist: 'callsForm/searchPsychologist',
        
        edit: 'callsForm/edit'
    }),
    async submitHandler() {
        const data = this.data
        data.phoneNumber = this.phoneNumber
        //data.user = this.user
        //data.psyId = this.psy
        //data.user  = this.user.value
        
        data.psy = this.psy.value

        try {
            await this.edit({id: this.id, data})
            debugger;
            await this.$router.push('/admin/calls')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    
        formatData() {
            
            //this.name = this.data.name
            //this.user = dataFormatter.usersOneListFormatter(this.data.user)
            this.phoneNumber = this.data.phoneNumber
            this.psy = dataFormatter.usersNameOptionsListFormatter(this.data.psy)
            
        }
     },
    async beforeMount() {
        try {
        
                //await this.searchUser()
            
                await this.searchPsychologist()
            
            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)
            this.formatData()
        } catch (e) {
            this._vm.$toasted.show('Error ' + e, {
                type : 'error'
            })
        }
    },
    // components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

