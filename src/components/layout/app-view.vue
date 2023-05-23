<template>
  <section>
    <router-view>
      <template #default="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
        <!-- <keep-alive>
        </keep-alive> -->
      </template>
    </router-view>
  </section>
</template>
