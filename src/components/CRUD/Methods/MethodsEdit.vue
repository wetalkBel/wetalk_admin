
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Methods</h4>
        
                <b-form-group
                    label="Name"
                    label-for="idm308429328528"
                >
                    <b-form-input
                       v-model="name"
                       type="text"
                       id="idm308429328528"
                    ></b-form-input>
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
        
    }
  },
  computed: {
    ...mapState({
        data: state => state.methodsForm.data,
    
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
        getData: 'methodsForm/getData',
        
        edit: 'methodsForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        
        data.name = this.name

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/methods')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    
        formatData() {
            
            this.name = this.data.name
        }
     },
    async beforeMount() {
        try {
        
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

