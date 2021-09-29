/**
 * 菜单配置
 */
const menus = [
  {
    text: "模块一",
    icon: "el-icon-document",
    route: {
      name: "oneModule"
    },
    children: [
      {
        text: "测试页一",
        icon: "",
        route: {
          name: "testOne",
          path: "testOne"
        }
      },
      {
        text: "测试页二",
        icon: "",
        route: {
          name: "testTwo",
          path: "testTwo"
        }
      },
    ]
  },
  {
    text: "模块二",
    icon: "el-icon-document",
    route: {
      name: "twoModule"
    },
    children: [
      {
        text: "测试页三",
        icon: "",
        route: {
          name: "testThree",
          path: "testThree"
        }
      },
      {
        text: "测试页四",
        icon: "",
        route: {
          name: "testFour",
          path: "testFour"
        }
      },
    ]
  },
];

export default menus;
