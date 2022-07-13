
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Notification</h4>
        
                <b-form-group
                    label="Name"
                    label-for="idm3759664704"
                >
                    <b-form-input
                       v-model="name"
                       type="text"
                       id="idm3759664704"
                    ></b-form-input>
                </b-form-group>
            
            <b-form-group
                    label="To"
                    label-for="idm3759551856"
            >
                <v-select
                    inputId="idm3759551856"
                    v-model="to"
                    :options="optionsTo"
                    @search="searchTo"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
            <b-form-group
                label="Body"
                label-for="body"
            >
                <b-form-textarea
                  :rows="3"
                  id="idm3759279040"
                  label="body"
                  v-model="body"
                />
            </b-form-group>
            
            <b-form-group class="abc-checkbox">
                <input
                    type="checkbox"
                    v-model="is_read"
                    id="idm3759036368"
                />
                <label for="idm3759036368">Is Read</label>
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
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
      return {
        id: null,
        name: '',
        to: '',
        body: '',
        is_read: false,
        
    }
  },
  computed: {
    ...mapState({
        data: state => state.notificationForm.data,
    
        optionsTo: state => state.notificationForm.searchResultTo,
        
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
        getData: 'notificationForm/getData',
        
        searchTo: 'notificationForm/searchTo',
        
        edit: 'notificationForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        
        data.name = this.name
        data.to = this.to
        data.body = this.body
        data.is_read = this.is_read
        data.to  = this.to.value
        

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/notification')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    
        formatData() {
            
            this.name = this.data.name
            this.to = dataFormatter.usersOneListFormatter(this.data.to)
            
            this.body = this.data.body
        }
     },
    async beforeMount() {
        try {
        
                await this.searchTo()
            
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
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

