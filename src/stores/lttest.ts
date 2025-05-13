import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { matchAuthorities, useAccountsStore } from "./data/accounts";

export const useManageStore = defineStore("lttest", () => {
    const accountStore = useAccountsStore();

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
        return matchAuthorities(accountStore.authorities, item.hasAuthority);
      });
    });

    return { defaultItems: defaultItemsDynamic };
  },
  {
    persist: true,
  }
);
