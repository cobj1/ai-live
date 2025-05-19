import { defineStore } from "pinia";
import spacegt from "spacegt";
import { computed, ref } from "vue";

export const useNavigationStore = defineStore(
  "navigationcourse",
  () => {
    const accountStore = spacegt.stores.useAccountsStore();

    const defaultItems = ref([
      {
        type: "VListItem",
        prependIcon: "mdi-home-outline",
        title: "TeacherHome",
        to: "/course/TeacherHome",
        link: true,
        color: "primary",
      },

      {
        type: "VListItem",
        prependIcon: "mdi-account-multiple-outline",
        title: "Users Manage USER",
        subtitle: "The user who manages the User role.",
        to: "/accounts/users/USER",
        link: true,
        color: "primary",
        hasAuthority: ["USERS_MANAGE_USER"],
      },

      {
        type: "VListGroup",
        fluid: true,
        activator: {
          prependIcon: "mdi-account-circle-outline",
          subtitle: "Manage your account",
          title: "Accounts",
        },
        childrenItems: [
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "Downloads",
          },
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "Subscriptions",
          },
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "History",
          },
        ],
      },
    ]);

    const appendItems = ref([
      {
        type: "VListItem",
        prependIcon: "mdi-cog-outline",
        title: "Settings",
        to: "/settings",
        link: true,
        nav: true,
      },
    ]);

    const defaultItemsDynamic = computed(() => {
      return defaultItems.value.filter((item) => {
        return accountStore.matchAuthorities(
          accountStore.authorities,
          item.hasAuthority
        );
      });
    });

    return { defaultItems: defaultItemsDynamic, appendItems };
  },
  {
    persist: true,
  }
);
