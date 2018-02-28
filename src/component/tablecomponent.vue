<template>
    <div class="table">
    <el-table
            :data="tableData3"
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            height="500"
            border
            style="width: 100%">
        <el-table-column
                prop="ct"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="title"
                label="标题">
        </el-table-column>
        <el-table-column
                align="center"
                prop="text"
                label="内容">
        </el-table-column>
    </el-table>
        <div class="pagination">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalDataNumber">
        </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [],
                currentPage: 1,
                totalDataNumber: 0,//数据的总数,
                pageNum:10,
                loading2: false
            }
        },mounted: function() {
            this.loading2=true;
            this.getData();
        },methods: {
            handleSizeChange(val) {
                this.loading2=true;
                console.log(`每页 ${val} 条`);
                this.pageNum=val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.loading2=true;
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getData();
            },
            getData(){
                let count=this.currentPage*this.pageNum;
                let start=this.pageNum;
                this.$http.post('http://route.showapi.com/341-1', {
                    showapi_appid: '57399', //这里需要改成自己的appid
                    showapi_sign: 'fc710dcad7774cbc98e6121267009bdc',  //这里需要改成自己的应用的密钥secret
                    page:start,
                    maxResult:count}, {
                    headers: {

                    },
                    emulateJSON: true
                }).then(function(response) {
                    // 这里是处理正确的回调
                    console.log(response.body.showapi_res_body);
                    this.tableData3 = response.body.showapi_res_body.contentlist;
                    this.totalDataNumber = response.body.showapi_res_body.allNum;
                    this.loading2=false;
                    // this.articles = response.data["subjects"] 也可以

                }, function(response) {
                    // 这里是处理错误的回调
                    console.log(response)
                });

            }
        },
    }
</script>