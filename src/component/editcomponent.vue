<template>
    <div>
        <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="detailContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)"
            >
            </quill-editor>
        </el-row>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>

        <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="img"
                :headers="header"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
    </div>
</template>

<script>
    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];

    export default {
        data: function(){
            return {
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '',  // 这里写你要上传的图片服务器地址
                header: {},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里 {token: sessionStorage.token}
                detailContent: "上传图片php 返回实例：<pre><span>header('Access-Control-Allow-Origin: *'); # </span><span>跨域处理<br></span><span><br></span><span>$portrait = request()-&gt;file('img'); //</span><span>头像<br></span><span>$data['portrait']='';<br></span><span>if ($portrait) {<br></span><span>$info = $portrait-&gt;move(ROOT_PATH . 'public' . DS . 'upload');<br></span><span>// </span><span>成功上传后 获取上传信息<br></span><span>$data['portrait'] = $info-&gt;getSaveName();<br></span><span>}<br></span><span>$result['code'] = '200';<br></span><span>$result['msg'] = '</span><span>加载成功</span><span>';<br></span><span>$result['info'] = $data['portrait'];<br></span><span>echo json_encode($result);</span></pre>", // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                console.log(html);
                this.content = html;
            },
            onEditorReady(){

            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            },
            // 上传图片前
            beforeUpload(res, file) {
                this.quillUpdateImg = true
            },
            // 上传图片成功
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据

                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res.code === '200' && res.info !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.info)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                console.log(res);
                this.quillUpdateImg = false;
                this.$message.error('图片插入失败')
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 50px;
    }
</style>