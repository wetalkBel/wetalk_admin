
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Modules</h4>
        
                <b-form-group
                    label="Name"
                    label-for="idm308428729904"
                >
                    <b-form-input
                       v-model="name"
                       type="text"
                       id="idm308428729904"
                    ></b-form-input>
                </b-form-group>
            
            <b-form-group
                    label="Page"
                    label-for="idm308428785440"
            >
                <v-select
                    inputId="idm308428785440"
                    v-model="page"
                    :options="optionsPage"
                    @search="searchPage"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
            <b-form-group
                    label="Module_type"
                    label-for="idm307624393056"
            >
                <v-select
                    inputId="idm307624393056"
                    v-model="module_type"
                    :options="optionsModule_type"
                    @search="searchModule_type"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
                <b-form-group
                    label="Data"
                    label-for="idm308428978480"
                >
                    <b-form-input
                       v-model="data"
                       type="text"
                       id="idm308428978480"
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
        page: '',
        module_type: '',
        data: '',
        
    }
  },
  computed: {
    ...mapState({
        data: state => state.modulesForm.data,
    
        optionsPage: state => state.modulesForm.searchResultPage,
        
        optionsModule_type: state => state.modulesForm.searchResultModule_type,
        
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
        getData: 'modulesForm/getData',
        
        searchPage: 'modulesForm/searchPage',
        
        searchModule_type: 'modulesForm/searchModule_type',
        
        edit: 'modulesForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        
        data.name = this.name
        data.page = this.page
        data.module_type = this.module_type
        data.data = this.data
        data.page  = this.page.value
        
        data.module_type  = this.module_type.value
        

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/modules')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    
        formatData() {
            
            this.name = this.data.name
            this.page = dataFormatter.pagesOneListFormatter(this.data.page)
            
            this.module_type = dataFormatter.module_typesOneListFormatter(this.data.module_type)
            
            this.data = this.data.data
        }
     },
    async beforeMount() {
        try {
        
                await this.searchPage()
            
                await this.searchModule_type()
            
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

