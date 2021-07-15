<template>
  <el-form
    ref="ruleForm"
    v-loading="loading"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <!-- <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item> -->
    <el-form-item label="原密码" prop="oldPass">
      <el-input v-model="ruleForm.oldPass" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" />
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="submitForm('ruleForm')"
        >提交</el-button
      >
      <el-button type="warning" plain @click="resetForm('ruleForm')"
        >重置</el-button
      >
      <el-button type="success" plain @click="resetForm('ruleForm')"
        >忘记密码</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { resetPass } from "@/api/auth/auth";
import { mapGetters } from "vuex";

export default {
  props: {
    username: {
      type: String,
      default: null,
    },
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      loading: false,
      ruleForm: {
        name: "",
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入要管理的账号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        oldPass: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  methods: {
    submitForm(formName) {
      if (this.user.username == "root") this.ruleForm.name = this.username;
      else this.ruleForm.name = this.user.username;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          resetPass(this.ruleForm)
            .then((value) => {
              const { code, message } = value;
              if (code === 200) {
                this.$message({
                  message: "密码修改成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.loading = false;
                  // 判断是否为管理员
                  if (this.$store.getters.user.username != "root") {
                    this.$store.dispatch("user/logout").then(() => {
                      this.$message.info("退出登录成功");
                    });
                    this.$router.push({ path: this.redirect || "/login" });
                  }
                }, 0.1 * 1000);
              } else {
                this.$message.error("密码修改失败，" + message);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>