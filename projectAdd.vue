<template>
    <div class="project-add">
        <h1>新增项目</h1>
        <hr>
        <el-scrollbar tag="div" wrapClass="vue-scrollbar">
            <div class="form">
                <el-form label-position="top" label-width="80px" width="460px" :model="projectForm">
                    <el-form-item label="项目LOGO" required>
                        <el-upload
                            class="icon-uploader"
                            action="string"
                            :show-file-list="false"
                            :http-request="handleAvatarUpload"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="icon">
                            <i v-else class="el-icon-plus icon-uploader-icon"></i>
                        </el-upload>
                        <!-- <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>     -->
                    </el-form-item>
                    <el-form-item label="项目名称" required>
                        <el-input v-model="projectForm.name" placeholder="请输入项目名称,建议以IPM单号+下划线+项目名称，如 IPM20180524214_中新天津生态城运维管理中心监控平台升级改造项目"></el-input>
                    </el-form-item>
                    <span class="el-icon-plus plus" @click="addAddress()"></span>
                    <el-form-item label="项目地址" class="por-address" required>
                        <div  v-for="(item, index) in projectForm.proAddress" :key="index">
                            <el-input v-model="item.name" placeholder="请输入工程名称"></el-input>
                            <el-input v-model="item.repoUrl" placeholder="请输入工程git地址"></el-input>
                            <el-button @click.prevent="removeAddress(item)">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="项目描述" required>
                        <el-input v-model="projectForm.desc" placeholder="请输入项目描述" type="textarea"></el-input>
                    </el-form-item>
                    <div class="pro-btn">
                        <el-button @click="createPro()">创建项目</el-button>
                        <el-button @click="cancel()">取消</el-button>
                    </div>
                </el-form>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import api from '@/api/api';
export default {
    name: 'projectAdd',
    data () {
        return {
            projectForm: {
                name: '',
                proAddress: [
                    {
                        address: '',
                        desc: '',
                    }
                ],
                desc: ''
            },
            imageUrl: '',
        }
    },
    methods: {
        handleAvatarUpload (param) {
            const formData = new FormData();
            formData.append('file', param.file)
            this.$ajax({
                method: 'post',
                url: api.upload,
                data: formData
            }).then((res) => {
                param.onSuccess(res);
            }).catch((err) => {
                console.log(err);
            })
        },
        handleAvatarSuccess (res, file) {
            console.log(res.data.data);
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload (file) {
            console.log(file);
        },
        removeAddress (item) {
            if (this.projectForm.proAddress.length === 1) {
                this.$message({
                    type: 'warning',
                    message: '必须填写一个项目地址'
                })
                return;
            }
            let index = this.projectForm.proAddress.indexOf(item);
            if (index != -1) {
                this.projectForm.proAddress.splice(index, 1);
            }
        },
        addAddress () {
            this.projectForm.proAddress.push({
                name: '',
                repoUrl: '',
            })
        },
        cancel () {
            this.$router.push('/project');
        },
        createPro ()　{
            this.$ajax({
                method: 'post',
                url: api.creatPro,
                data: {
                    name: this.projectForm.name,
                    description: this.projectForm.desc,
                    subProjects: this.projectForm.proAddress,
                    logoUrl: '',
                    creator: {
                        userName: this.$store.state.userName,
                    }
                }
            }).then((res) => {
                if (res.data.code == '0') {
                    this.$router.push('/project');
                }
                console.log(res.data);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.project-add {
    height: 100%;
    overflow: hidden;
    color: #e3e6e8;
    h1 {
        margin-left: 40px;
    }
    .el-scrollbar {
        height: calc(100% - 27px);
    }
    .form {
        height: calc(100% - 27px);
        position: relative;
        width: calc(100% - 220px);
        margin: 30px 0 50px 40px;
        .plus {
            position: absolute;
            top: 275px;
            right: 0px;
            cursor: pointer;
        }
        .por-address {
            .el-input {
                width: 400px;
                margin: 0px 20px 30px 0px;
            }
            .el-button {
                margin-bottom: 30px;
            }
        }
    }
}
</style>

<style>
.project-add .el-button {
    background: #3b3b3b;
    border: 1px solid #666;
    color: #e3e6e8;
}
.project-add .el-button:focus, .project-add .el-button:hover {
    border-color: #666;
    background-color: #2b2b2b;
}
.project-add .el-form-item__label {
    color: #e3e6e8;
}
.project-add .icon-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.project-add .icon-uploader .el-upload:hover {
border-color: #409EFF;
}
.project-add .icon-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 60px;
height: 60px;
line-height: 60px;
text-align: center;
}
.project-add .icon {
width: 60px;
height: 60px;
display: block;
}
</style>


