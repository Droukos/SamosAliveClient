<template>
    <div v-if="showRole">
        <v-list-item-title class="title text-wrap" style="color:#66BB6A">{{ $t('roles.'+profDat.role) }}</v-list-item-title>
        <v-list-item-subtitle v-if="profVis.isOnline" style="color:#18FFFF">{{ $t('user.online') }}</v-list-item-subtitle>
        <v-list-item-subtitle v-else style="color:#455A64">{{ $t('user.offline') }}</v-list-item-subtitle>
    </div>
</template>

<script>
export default {
    props: ['showRole', 'profDat', 'profVis'],
}
</script>