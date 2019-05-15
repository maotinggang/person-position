import feathersClient from '@/api/feathersClient'
export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.handleSubmit()
  //   })
  // },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          feathersClient
            .service('users')
            .find({
              id: this.form.userName,
              password: this.form.password
            })
            .then(res => {
              if (res.data[0]) {
                this.$router.push({
                  name: 'real-time'
                })
              }
            })
            .catch(() => {
              this.$Message.error({
                content: '用户名或密码错误',
                duration: 5,
                closable: true
              })
            })
        }
      })
    }
  }
}
