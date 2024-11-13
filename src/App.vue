<template>

  <!-- <n-data-table :columns="columns" :data="filteredVersions" :pagination="{ pageSize: 10 }" /> -->

  <div class="container">
    <n-data-table :columns="columns" :data="filteredVersions" :pagination="pagination" />
  </div>

</template>

<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import type { DataTableColumns } from 'naive-ui';
import { NDataTable } from 'naive-ui';

import versionData from './assets/data.json';
import { VersionInfo } from './types/index';

const versions = ref<VersionInfo[]>(versionData);
const filteredVersions = computed(() => {
  return versions.value
    .filter(version => version.hasDoc)
    .sort((a, b) => b.sbVersion.localeCompare(a.sbVersion))
})

const columns: DataTableColumns<VersionInfo> = [
  {
    title: 'Spring Boot Version',
    key: 'sbVersion',
  },
  {
    title: 'Spring Version',
    key: 'springVersion',
  }
]

const pagination = {
  pageSize: 50
}
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