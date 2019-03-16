import Vue from 'vue';
import {
  Checkbox,
  CheckboxGroup,
  Switch,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Circle
} from 'vant';

Vue.use(CheckboxGroup)
  .use(Checkbox)
  .use(Switch)
  .use(Dialog)
  .use(Tab)
  .use(Tabs)
  .use(Circle)
  .use(Popup)
  .use(Picker)
  .use(DatetimePicker);
