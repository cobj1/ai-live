import { defineStore } from "pinia";
import spacegt from "spacegt";
import { computed, ref } from "vue";

export const useManageStore = defineStore(
  "lttest",
  () => {
    const accountStore = spacegt.stores.useAccountsStore();

    const defaultItems = ref([
      {
        type: "VListItem",
        prependIcon: "mdi-home-outline",
        title: "首页",
        to: "/manage",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-bank",
        title: "Orgs",
        to: "/accounts/orgs",
        link: true,
        color: "primary",
        hasAuthority: ["ORGS_LIST"],
      },
    ]);

    const defaultItemsDynamic = computed(() => {
      return defaultItems.value.filter((item) => {
        return accountStore.matchAuthorities(accountStore.authorities, item.hasAuthority);
      });
    });

    return { defaultItems: defaultItemsDynamic };
  },
  {
    persist: true,
  }
);
