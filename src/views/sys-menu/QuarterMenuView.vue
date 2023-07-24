<template>
  <div class="asset-tree-panel-container">
    <div class="main-container">
      <lazy-search-tree-panel
          ref="treePanel"
          key-field="menuId"
          label-field="menuName"
          is-leaf-field="isLeaf"
          accordion
          :search-option-handler="handleSearchOption"
          :load-root-handler="handleLoadRoot"
          :load-child-handler="handleLoadChild"
          :query-path-handler="handleQueryPath"
          :inspect-button-visible="false"
          :edit-button-visible="false"
          :delete-button-visible="false"
          :operate-area-visible="!readonly"
          @onCurrentChanged="handleCurrentChanged"
      >
      </lazy-search-tree-panel>
    </div>
  </div>
</template>

<script>
import LazySearchTreePanel from './LazySearchTreePanel.vue';
import axios from "axios";

export default {
  name: 'AssetBomTreePanel',
  components: { LazySearchTreePanel },
  props: {
    assetCatalogKey: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      validator(value) {
        return ['ASSET_BOM', 'GENERAL', 'DEFAULT', 'DRIVER_SETTING'].indexOf(value) !== -1;
      },
      default: 'DEFAULT',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    assetCatalogKey(value) {
      if (value !== '') {
        const { treePanel } = this.$refs;
        if (treePanel) {
          treePanel.refresh();
        }
      }
    },
  },
  methods: {
    async handleSearchOption(pattern, accept) {
      // 如果 pattern 是空字符串，则接受空数组
      if (pattern === '') {
        accept([]);
      }
      const monthMenuId = 54;
      let url = `http://localhost:8081/treeMenu/menus/${monthMenuId}/${pattern}`;
      const res = await axios.get(url); // const res = mock;
      const data = res.data.data.menus; // const data = res.data.menus;
      accept(data)
    },
    async handleLoadRoot(accept) {
      // 在这里进行mock测试，数据为mock.json中从后端拿回来的数据
      const quarterMenuId = 54;
      let url = `http://localhost:8081/treeMenu/menus/${quarterMenuId}`;
      const res = await axios.get(url); // const res = mock;
      const data = res.data.data.menus; // const data = res.data.menus;
      data.forEach((entity)=>{
        entity.children = [];
      });
      accept(data)
    },
    async handleLoadChild(key, accept) {
      let url = `http://localhost:8081/treeMenu/${key}`;
      const res = await axios.get(url);
      accept(res.data.data.menus);
    },
    async handleQueryPath(key, accept) {
      let url = `http://localhost:8081/treeMenu/menus/queryPath/${key}`;
      const res = await axios.get(url);
      accept(res.data.data.menus);
    },
    appendEntitiesProperties(res) {
      const entities = [];
      res.data.forEach((entity) => {
        this.$set(entity, 'menuId', entity.menuId);
        entities.push(entity);
      });
      return Promise.resolve(entities);
    },
    handleCurrentChanged(node, data) {
      this.$emit('onCurrentChanged', node, data);
    },
    handleEntityDelete(node, data) {
      const accept = () => {
        this.$refs.treePanel.remove(node);
      };
      this.$emit('onEntityDelete', node, data, accept);
    },
    appendRoot(item) {
      this.appendEntityProperties(item);
      this.treeData.push(item);
    },
    append(nodeRef, item) {
      this.appendEntityProperties(item);
      this.$refs.treePanel.append(nodeRef, item);
    },
    insertBefore(nodeRef, item) {
      this.appendEntityProperties(item);
      this.$refs.treePanel.insertBefore(nodeRef, item);
    },
    insertAfter(nodeRef, item) {
      this.appendEntityProperties(item);
      this.$refs.treePanel.insertAfter(nodeRef, item);
    },
    update(item) {
      this.appendEntityProperties(item);
      const node = this.$refs.treePanel.getNode(item);
      const { data } = node;
      this.syncEntity(data, item);
    },
    syncEntity(target, neoValue) {
      this.$set(target, 'name', neoValue.name);
      this.$set(target, 'remark', neoValue.remark);
    },
    remove(item) {
      this.appendEntityProperties(item);
      this.$refs.treePanel.remove(item);
    },
    appendEntityProperties(item) {
      this.$set(item, 'menuId', item.menuId);
    },
  },
};
</script>

<style scoped>
.asset-tree-panel-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.placeholder {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #BFBFBF;
  user-select: none;
}

.main-container {
  width: 100%;
  height: 100%;
}

.button {
  padding: 7px;
}
</style>
