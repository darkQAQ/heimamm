<template>
  <div>
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input style="width:150px;" v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input style="width:150px;" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:150px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select style="width:150px;" v-model="searchForm.status" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="default" @click="clear">清除</el-button>
          <el-button type="primary" @click="addEnterprise">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top:15px;text-align:center;">
      <el-table :data="enterpriseList">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status == 1?'#87cd67':'red'}"
            >{{scope.row.status == 1? '启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="primary" @click="editEnterprise(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status == 1?'info':'success'"
            >{{scope.row.status == 1? '禁用':'启用'}}</el-button>
            <el-button type="primary" @click="deleteEnterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <enter-edit ref="enterEdit"></enter-edit>
  </div>
</template>

<script>
import enterEdit from "./enterprise-add-or-updata";
export default {
  name: "enterpriseList",
  components: { enterEdit },
  data() {
    return {
      searchForm: {
        name: "", //企业名称
        eid: "", //企业id
        username: "", //创建者
        status: "" //状态
      },
      page: 1, //页码
      limit: 2, //一页显示多少
      enterpriseList: [], //企业列表
      total: 0 //总条数
    };
  },
  methods: {
    async getEnterpriseInfo() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    //搜索
    search() {
      this.page = 1;
      this.getEnterpriseInfo();
    },
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
    },
    // 点击每页显示多少条
    handleSizeChange(val) {
      this.limit = val;
      this.search();
      // console.log(`每页 ${val} 条`);
    },
    // 点击切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getEnterpriseInfo();
      // console.log(`当前页: ${val}`);
    },
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/enterprise/status", { id });
      if (res.data.code == 200) {
        this.getEnterpriseInfo();
      }
    },
    // 删除
    deleteEnterprise(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/enterprise/remove", { id });
          if (res.data.code == 200) {
            this.search();
          } else {
            this.$message.error(res.data.message);
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增企业
    addEnterprise() {
      //点击进入 清空数据
      this.$refs.enterEdit.enterpriseForm = {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //简称
        intro: "", //企业简介
        remark: "" //备注
      };
      this.$refs.enterEdit.dialogVisible = true;
      this.$refs.enterEdit.mode == "edit";
    },
    // 编辑企业
    editEnterprise(row) {
      const { id, eid, name, short_name, intro, remark } = row;
      this.$refs.enterEdit.enterpriseForm = {
        id,
        eid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.enterEdit.mode = "edit";
      this.$refs.enterEdit.dialogVisible = true;
    }
  },
  created() {
    this.getEnterpriseInfo();
  }
};
</script>

<style>
</style>