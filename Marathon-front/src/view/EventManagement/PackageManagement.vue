<template>
  <div id="PackageManagement">
    <div class="management-container">
      <div style="margin-bottom: 30px;font-weight: bold;font-size: 26px;">{{ packageForm.eventName }}</div>
      <div class="existing-items">
        <h3>已有的物品</h3>
        <el-table v-if="existingItems.length" :data="existingItems" max-height="180">
          <el-table-column prop="id" label="物品ID"></el-table-column>
          <el-table-column prop="name" label="物品名"></el-table-column>
          <el-table-column prop="kind" label="物品类别"></el-table-column>
        </el-table>
        <div v-else style="text-align: center;height: 10vh;line-height: 10vh;font-size: 18px;">暂无数据</div>
      </div>

      <!-- 新添加物品 -->
      <div class="new-items">
        <h3>新添加的物品</h3>
        <el-table v-if="newItems.length" :data="newItems" max-height="180">
          <el-table-column prop="id" label="物品ID"></el-table-column>
          <el-table-column prop="name" label="物品名"></el-table-column>
          <el-table-column prop="kind" label="物品类别"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeNewItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-else style="text-align: center;height: 10vh;line-height: 10vh;font-size: 18px;">暂无数据</div>
      </div>

      <div class="button-group">
        <el-button type="primary" @click="showItemManagement">添加</el-button>
        <el-button type="primary" @click="savePackageDetails">保存</el-button>
      </div>
      <ItemManagement v-if="dialogVisible" ref="itemManagement" :show-category-select="true" @save="handleSaveItems" />
    </div>
  </div>
</template>

<script>
import ItemManagement from './ItemManagement.vue';
import { getPackageDetails, savePackageDetails, fetchEventName } from '@/api/PackageManagement';

export default {
  name: 'PackageManagement',
  components: {
    ItemManagement
  },
  data() {
    return {
      packageForm: {
        eventName: ''
      },
      existingItems: [], // 已有的物品列表
      newItems: [], // 新添加的物品列表
      dialogVisible: false
    };
  },
  methods: {
    async loadEvent() {
      const eventId = this.$route.params.event_id; // 固定的赛事ID
      try {
        const res = await fetchEventName(eventId);
        if (res && res.Event) {
          this.packageForm.eventName = res.Event.Name; // 获取赛事名称
        } else {
          throw new Error('未收到有效响应数据或数据格式不正确');
        }
      } catch (error) {
        console.error('加载赛事详情失败:', error);
        this.$message.error('加载赛事详情失败');
      }
    },
    async loadPackageDetails() {
      const eventId = this.$route.params.event_id; // 固定的赛事ID
      try {
        const response = await getPackageDetails(eventId);
        if (response && Array.isArray(response)) {
          this.existingItems = response.map(item => ({
            ...item,
            source: '已存在'  // 标记为已有物品
          }));
        } else {
          console.log('No items loaded or response was empty.');
        }
      } catch (error) {
        console.error('加载物资包详情失败:', error);
        this.$message.error('加载物资包详情失败');
      }
    },
    showItemManagement() {
      this.dialogVisible = true;
    },
    handleSaveItems(selectedItems) {
      selectedItems.forEach(selectedItem => {
        const existingItem = this.newItems.find(item => item.id === selectedItem.id && item.kind === selectedItem.kind);
        if (existingItem) {
          // 如果物品已经存在于 items 中，累加数量
          existingItem.quantity = parseInt(existingItem.quantity) + parseInt(selectedItem.quantity);
        } else {
          // 如果物品是第一次添加，直接推入 items 并设置数量和类别
          this.newItems.push({
            id: selectedItem.id,
            name: selectedItem.name,
            quantity: selectedItem.quantity,
            kind: selectedItem.category || selectedItem.kind,  // 确保类别(kind)被设置
            source: '新添加'
          });
        }
      });
      this.dialogVisible = false;
    },
    async savePackageDetails() {
      const eventId = this.$route.params.event_id; // 固定的赛事ID
      // 过滤出新添加的物品
      const newItems = this.newItems.filter(item => item.source === '新添加');

      const packageData = newItems.map(item => ({
        event_Id: eventId,
        item_Id: item.id,
        kind: item.kind || 'default_kind' // 确保 kind 字段被设置，必要时设置默认值
      }));

      if (packageData.length === 0) {
        this.$message.warning('没有需要保存的新物品');
        return;
      }

      try {
        console.log('Saving new package details with packageData:', packageData);
        const response = await savePackageDetails(packageData); // 捕获并使用 response 变量
        console.log('savePackageDetails response:', response); // 打印 response 进行调试或其他处理

        if (response.status) {
          this.$message.success('保存成功');
          // 保存成功后，将 newItems 中的物品移动到 existingItems 中
          this.existingItems = [...this.existingItems, ...this.newItems];
          this.newItems = []; // 清空 newItems
        } else {
          this.$message.error(`保存失败: ${response.message}`);
        }
      } catch (error) {
        console.error('保存物资包详情失败:', error);
        this.$message.error('保存失败');
      }
    },
    removeNewItem(item) {
      // 从 newItems 中移除指定的物品
      this.newItems = this.newItems.filter(newItem => newItem.id !== item.id || newItem.kind !== item.kind);
    },
    resetItemManagement() {
      this.$refs.itemManagement.resetItems();
    },
    formatSource(row) {
      return row.source || '未知';
    }
  },
  mounted() {
    this.loadEvent(); // 在组件挂载时加载赛事详情
    this.loadPackageDetails(); // 在组件挂载时加载物资包详情
  }
};
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';

#PackageManagement {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 105vh;
  height: 75vh;
  margin-right: 50px;
  margin-bottom: 75px;
  font-size: 15px;
}

#PackageManagement .el-button {
  font-size: 14px !important;
  background-color: #c63939;
  /*important是为了覆盖原有的Element UI 的按钮组件有默认的样式优先级*/
  color: white;
  border: none !important;
}

#PackageManagement .el-button:hover {
  background-color: #a62828;
  /* 悬停时的深红色背景 */
}

#PackageManagement .management-container {
  width: 100%;
  height: 87%;
  margin: 0 auto;
  padding: 30px 45px;
  padding-top: 10px;
}

#PackageManagement .button-group {
  text-align: right;
  margin: 35px 35px 0;
}

#PackageManagement .new-items .el-button {
  background-color: transparent;
  color: rgb(64, 158, 255);
  font-weight: bold;
  padding: 5px;
}

#PackageManagement .new-items .el-button:hover {
  background-color: transparent;
}
</style>
