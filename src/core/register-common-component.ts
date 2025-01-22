import CButton from "@/components/Common/CButton.vue";
import DetailView from "@/components/Common/DetailView.vue";
import Vue, { ComponentOptions } from "vue";
import { ExtendedVue } from "vue/types/vue";

type VueComponent = ExtendedVue<
  Vue,
  Record<string, any>,
  Record<string, any>,
  any,
  any
> & { options?: ComponentOptions<Vue> };

const commonComponents = [CButton, DetailView] as VueComponent[];

export default {
  install: (VueInstance: typeof Vue) => {
    commonComponents.forEach((component) => {
      const name = component.options?.name;
      if (name) {
        VueInstance.component(name, component);
      }
    });
  },
};
