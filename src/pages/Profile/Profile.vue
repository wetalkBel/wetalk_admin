

<template>
  <Widget>
    <form @submit.prevent="submitHandler">
    <b-form-group  class="abc-checkbox">
      <input
        type="checkbox"
        v-model="isOnline"
        id="idm308429364800"
      />
      <label for="idm308429364800">isOnline</label>
    </b-form-group>
    
        <b-form-group
          label="First Name"
          label-for="idm308429179120"
        >
          <b-form-input
              v-model="firstName"
              type="text"
              id="idm308429179120"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group
          label="Last Name"
          label-for="idm308428645584"
        >
          <b-form-input
              v-model="lastName"
              type="text"
              id="idm308428645584"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group
          label="Phone Number"
          label-for="idm308428424224"
        >
          <b-form-input
              v-model="phoneNumber"
              type="text"
              id="idm308428424224"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group
          label="E-mail"
          label-for="idm308428832608"
        >
          <b-form-input
              v-model="email"
              type="text"
              id="idm308428832608"
          ></b-form-input>
        </b-form-group>
  
      <div
      v-if="isAdmin"
      >
        <label>Role</label>
        <b-row>
          
            <b-col md="3">
              <b-form-group class="radio abc-radio">
                <input
                        type="radio"
                        name="role"
                value="admin"
                id="idm308429128848"
                v-model="role"
                />
                <label for="idm308429128848">Admin</label>
            </b-form-group>
          </b-col>
        
            <b-col md="3">
              <b-form-group class="radio abc-radio">
                <input
                        type="radio"
                        name="role"
                value="user"
                id="idm308428815424"
                v-model="role"
                />
                <label for="idm308428815424">User</label>
            </b-form-group>
          </b-col>
        
            <b-col md="3">
              <b-form-group class="radio abc-radio">
                <input
                        type="radio"
                        name="role"
                value="psychologist"
                id="idm308428427360"
                v-model="role"
                />
                <label for="idm308428427360">Psychologist</label>
            </b-form-group>
          </b-col>
        
      </b-row>
      </div>
    
    <b-form-group v-if="isAdmin" class="abc-checkbox">
      <input
        type="checkbox"
        v-model="disabled"
        id="idm308428427104"
      />
      <label for="idm308428427104">Disabled</label>
    </b-form-group>
    
    <ImageUploader
      label="Avatar"
      id="idm308428549616"
      url="users/avatar"
      :images="avatar"
      @change="avatarAdd"
      @del="avatarDel"
    />
    
        <b-form-group
          label="Video"
          label-for="idm308428703264"
        >
          <b-form-input
              v-model="video"
              type="text"
              id="idm308428703264"
          ></b-form-input>
        </b-form-group>
  
      <b-form-group
        label="Info"
        label-for="info"
      >
        <b-form-textarea
          :rows="3"
          id="idm308428553616"
          label="info"
          v-model="info"
        />
      </b-form-group>
    
      <b-form-group
        label="FAQ"
        label-for="faq"
      >
        <b-form-textarea
          :rows="3"
          id="idm308428638240"
          label="faq"
          v-model="faq"
        />
      </b-form-group>
    
    <b-form-group
      label="City"
      label-for="idm308428594224"
    >
      <v-select
        inputId="idm308428594224"
        v-model="city"
        :options="optionsCity"
        @search="searchCity"
      >
        <template #option="option">
        {{ option.label }}
        </template>
      </v-select>
    </b-form-group>
  
    <b-form-group
      label="Gender"
      label-for="idm308428951904"
    >
      <v-select
        inputId="idm308428951904"
        v-model="gender"
        :options="optionsGender"
        @search="searchGender"
      >
        <template #option="option">
        {{ option.label }}
        </template>
      </v-select>
    </b-form-group>
  
    <b-form-group
      label="Method"
      label-for="idm308429082896"
    >
      <v-select
        inputId="idm308429082896"
        :options="optionsMethod"
        v-model="method"
        @search="searchMethod"
        multiple
      >
        <template #option="option">
        {{ option.label }}
        </template>
      </v-select>
    </b-form-group>
    
    <b-form-group
      label="Targets"
      label-for="idm308428947616"
    >
      <v-select
        inputId="idm308428947616"
        :options="optionsTargets"
        v-model="targets"
        @search="searchTargets"
        multiple
      >
        <template #option="option">
        {{ option.label }}
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
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
components: {ImageUploader, FileUploader},
data () {
  return {
    id: '',
    isOnline: false,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: false,
    disabled: false,
    avatar: [],
    video: '',
    info: '',
    faq: '',
    city: '',
    gender: '',
    method:[],
    targets:[],
    
    }
  },
  computed: {
    ...mapState({
      isAdmin: state => {
        if (state.auth.currentUser) {
          return state.auth.currentUser.role === ['admin']
        }
        return false
      },
      data: state => state.usersForm.data,
      
          optionsCity: state => state.usersForm.searchResultCity,
        
          optionsGender: state => state.usersForm.searchResultGender,
        
          optionsMethod: state => state.usersForm.searchResultMethod,
        
          optionsTargets: state => state.usersForm.searchResultTargets,
        
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
    },
  },
  async beforeMount() {
    
        await this.searchCity()
      
        await this.searchGender()
      
        await this.searchMethod()
      
        await this.searchTargets()
      
    const { user } = JSON.parse(localStorage.getItem('user'))
    const id = user.id

    if (id) {
      this.id = id
      await this.getData(id)
      this.formatData()
    }
  },
  methods: {
    ...mapActions({
      getData: 'usersForm/getData',
    
        searchCity: 'usersForm/searchCity',
      
        searchGender: 'usersForm/searchGender',
      
        searchMethod: 'usersForm/searchMethod',
      
        searchTargets: 'usersForm/searchTargets',
      
      edit: 'usersForm/edit'
    }),
    avatarAdd(val) {
        this.avatar.push(val)
        },
        avatarDel(id) {
        this.avatar = this.avatar.filter(img => img.id !== id)
        },
      
    formatData() {
    
        this.firstName = this.data.firstName
        this.lastName = this.data.lastName
        this.phoneNumber = this.data.phoneNumber
        this.email = this.data.email
        this.role = this.data.role
        this.avatar = this.data.avatar
        this.video = this.data.video
        this.info = this.data.info
        this.faq = this.data.faq
        this.city = dataFormatter.citiesOneListFormatter(this.data.city)
      
        this.gender = dataFormatter.gendersOneListFormatter(this.data.gender)
      
        this.method = dataFormatter.methodsManyListFormatterEdit(this.data.method)
      
        this.targets = dataFormatter.targetsManyListFormatterEdit(this.data.targets)
      
    },
    async submitHandler() {
      const data = this.data
      
        data.isOnline = this.isOnline
        data.firstName = this.firstName
        data.lastName = this.lastName
        data.phoneNumber = this.phoneNumber
        data.email = this.email
        data.role = this.role
        data.disabled = this.disabled
        data.avatar = this.avatar
        data.video = this.video
        data.info = this.info
        data.faq = this.faq
        data.city = this.city
        data.gender = this.gender
        data.method = this.method
        data.targets = this.targets
          data.city  = this.city.value
        
          data.gender  = this.gender.value
        
          data.method = this.method.map(item => item.id)
        
          data.targets = this.targets.map(item => item.id)
        

      try {
        await this.edit({id: this.id, data})
        this.$router.push('/admin/users')
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type : 'error'
        })
      }
    }
  }
};
</script>

<style scoped>

    .image-preview {
    width: 191px;
    height: 141px;
    background-size: cover;
    background-position: 50% center;
    }
  
</style>

