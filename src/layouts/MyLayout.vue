<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="goHome" aria-label="Go to home page">
          May4th Poem
        </q-toolbar-title>

        <div v-if="!isLoggedIn">
          <q-btn flat>
            登录
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">邮箱</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="userEmail"
                      type="email"
                      :rules="emailValidation"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="userPassword"
                      :type="showPassword ? 'text' : 'password'"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="showPassword ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row justify-center" style="padding-top: 10px;">
                  <q-btn
                    color="primary"
                    :disable="!validateLogIn"
                    @click="logIn"
                    >登录</q-btn
                  >
                </div>
                <error-banner
                  v-if="wrongEmailOrPassword"
                  error-message="邮箱或密码错误"
                />
              </div>
            </q-popup-proxy>
          </q-btn>
          <q-btn flat>
            注册
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">用户名</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserName"
                      :rules="[
                        val => val.length <= 16 || '用户名长度不能超过16个字符',
                      ]"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">邮箱</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserEmail"
                      type="email"
                      :rules="emailValidation"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserPassword"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordValidation"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="showPassword ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">确认</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserPasswordConfirmation"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordConfirmationValidation"
                    />
                  </div>
                </div>
                <div class="row justify-center" style="padding-top: 10px;">
                  <q-btn
                    color="primary"
                    :disable="!validateSignUp"
                    @click="signUp"
                    >注册</q-btn
                  >
                </div>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
        <div v-else class="flex">
          <q-btn flat>欢迎来到May4th，{{ name }}</q-btn>
          <q-btn flat @click="writePoem">写诗</q-btn>
          <q-btn flat @click="logOut">
            退出
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar style="justify-content: center;">
        <div>洗心革面的未来生活 | May4th Poem © 2019</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import gql from 'graphql-tag'
import {LOG_IN, LOG_OUT} from '../common/mutation-types'
import {MAY4TH_USER, MAY4TH_AUTH_TOKEN} from '../common/constants'
import {EMAIL_REGEX, PASSWORD_REGEX} from '../common/regex'
import ErrorBanner from '../components/ErrorBanner'

export default {
  name: 'MyLayout',
  components: {ErrorBanner},
  data() {
    return {
      userEmail: '',
      userPassword: '',
      newUserName: '',
      newUserEmail: '',
      newUserPassword: '',
      newUserPasswordConfirmation: '',
      showPassword: false,
      wrongEmailOrPassword: false,
      emailValidation: [
        val => !val || EMAIL_REGEX.test(val) || '请输入合法的邮箱地址',
      ],
      passwordValidation: [
        val =>
          !val ||
          PASSWORD_REGEX.test(val) ||
          '密码须为8-16位，包含数字、大写字母和小写字母',
      ],
      passwordConfirmationValidation: [
        val => val === this.newUserPassword || '两次输入密码不一致',
      ],
    }
  },
  computed: {
    name() {
      return this.$store.state.user.name
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
    validateLogIn() {
      if (this.userName !== '' && this.userPassword !== '') return true
      else return false
    },
    validateSignUp() {
      if (
        this.newUserName !== '' &&
        this.newUserEmail !== '' &&
        this.newUserPassword !== '' &&
        this.newUserPasswordConfirmation === this.newUserPassword
      )
        return true
      else return false
    },
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    writePoem() {
      this.$router.push('write')
    },
    handleError({graphQLErrors, networkError}) {
      if (graphQLErrors) {
        graphQLErrors.map(({message}) => {
          if (message.error && message.error === 'Not Found') {
            this.wrongEmailOrPassword = true
            setTimeout(() => {
              this.wrongEmailOrPassword = false
            }, 2000)
          }
        })
      }
      if (networkError) {
        console.log('网络错误')
      }
    },
    clearUserInput() {
      this.userEmail = ''
      this.userPassword = ''
      this.newUserName = ''
      this.newUserEmail = ''
      this.newUserPassword = ''
      this.newUserPasswordConfirmation = ''
    },
    logIn() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation logInMutation($email: String!, $password: String!) {
              logIn(email: $email, password: $password) {
                jwt {
                  token
                  expiresAt
                }
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            email: this.userEmail,
            password: this.userPassword,
          },
        })
        .then(res => {
          this.$store.commit(LOG_IN, res.data.logIn)
          this.clearUserInput()
        })
        .catch(err => this.handleError(err))
    },
    signUp() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation signUpMutation(
              $password: String!
              $name: String!
              $email: String!
            ) {
              signUp(
                newUser: {password: $password, name: $name, email: $email}
              ) {
                jwt {
                  token
                  expiresAt
                }
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            password: this.newUserPassword,
            name: this.newUserName,
            email: this.newUserEmail,
          },
        })
        .then(res => {
          this.$store.commit(LOG_IN, res.data.signUp)
          this.clearUserInput()
        })
        .catch(err => console.log(err))
    },
    logOut() {
      localStorage.removeItem(MAY4TH_USER)
      localStorage.removeItem(MAY4TH_AUTH_TOKEN)
      this.$store.commit(LOG_OUT)
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
