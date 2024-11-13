<template>

  <!-- <n-data-table :columns="columns" :data="filteredVersions" :pagination="{ pageSize: 10 }" /> -->

  <div class="container">
    <!-- 版本列表 -->
    <div v-if="!currentVersion">
      <n-data-table :columns="columns" :data="filteredVersions" :pagination="pagination" />
    </div>

    <!-- 依赖列表 -->
    <div v-else>
      <n-space vertical>
        <n-button @click="handleBack">返回版本列表</n-button>
        <n-data-table :columns="depsColumns" :data="dependencies" :pagination="{ pageSize: 20 }" />
      </n-space>
    </div>
  </div>

</template>

<script setup lang="ts">
import {
  computed,
  h,
  ref,
} from 'vue';

import type { DataTableColumns } from 'naive-ui';
import { NDataTable } from 'naive-ui';

import versionData from './assets/data.json';
import {
  Dependency,
  VersionInfo,
} from './types/index';

const versions = ref<VersionInfo[]>(versionData);
const currentVersion = ref('')
const dependencies = ref<Dependency[]>([])

const filteredVersions = computed(() => {
  return versions.value
    .filter(version => version.hasDoc)
    .sort((a, b) => b.sbVersion.localeCompare(a.sbVersion))
})

// 加载依赖数据
const loadDependencies = async (version: string) => {
  try {
    const module = await import(`./assets/data/${version}.json`)
    dependencies.value = module.default
  } catch (error) {
    console.error('加载依赖失败:', error)
    dependencies.value = []
  }
}

const handleVersionClick = async (row: VersionInfo) => {
  currentVersion.value = row.sbVersion
  await loadDependencies(row.sbVersion)
}

const handleBack = () => {
  currentVersion.value = ''
  dependencies.value = []
}

const columns: DataTableColumns<VersionInfo> = [
  {
    title: 'Spring Boot Version',
    key: 'sbVersion',
    render: (row) => {
      return h(
        'a',
        {
          href: '#',
          onClick: (e: Event) => {
            e.preventDefault()
            handleVersionClick(row)
          }
        },
        row.sbVersion
      )
    }
  },
  {
    title: 'Spring Version',
    key: 'springVersion'
  }
]

const pagination = {
  pageSize: 50
}


const depsColumns: DataTableColumns<Dependency> = [
  {
    title: 'Group ID',
    key: 'groupId'
  },
  {
    title: 'Artifact ID',
    key: 'artifactId'
  },
  {
    title: 'Version',
    key: 'version'
  }
]
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.version-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.version-table th,
.version-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.version-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.version-table tr:hover {
  background-color: #f8f9fa;
}
</style>