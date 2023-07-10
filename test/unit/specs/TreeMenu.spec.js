// import { shallowMount } from "@vue/test-utils";
// import TreeMenu from "../../src/components/TreeMenuView.vue";
// import axios from "axios";
// jest.mock("axios", () => ({
//     get: jest.fn(),
// }));
// const data = [
//     {
//         id: 1,
//         menuId: 1,
//         menuName: "menu1",
//         isLeaf: false,
//         children: [
//             {
//                 id: 2,
//                 menuId: 2,
//                 menuName: "menu2",
//                 isLeaf: true,
//                 children: [],
//             },
//         ],
//     },
// ];
// describe("TreeMenuView.vue", () => {
//     let wrapper;
//     beforeEach(() => {
//         axios.get.mockResolvedValue({ data: { data } });
//         wrapper = shallowMount(TreeMenu);
//     });
//     afterEach(() => {
//         wrapper.destroy();
//     });
//     it("renders the component", () => {
//         expect(wrapper.exists()).toBe(true);
//     });
//     it("loads root items", async () => {
//         const rootNode = { level: 0, data: {} };
//         const resolve = jest.fn();
//         await wrapper.vm.loadNode(rootNode, resolve);
//         expect(axios.get).toHaveBeenCalledWith("/treeMenu");
//         expect(resolve).toHaveBeenCalledWith(data);
//     });
//     it("loads children items", async () => {
//         const node = { level: 1, data: { id: 1 } };
//         const resolve = jest.fn();
//         await wrapper.vm.loadNode(node, resolve);
//         expect(axios.get).toHaveBeenCalledWith("/treeMenu/1");
//         expect(resolve).toHaveBeenCalledWith(data[0].children);
//     });
//     it("searches items and disables lazy loading", async () => {
//         axios.get.mockResolvedValue({ data: { data: { menus: data } } });
//         wrapper.setData({ searchParam: "menu1" });
//         await wrapper.vm.handleSearch();
//         expect(wrapper.vm.$refs.tree.$data.store.lazy).toBe(false);
//         expect(axios.get).toHaveBeenCalledWith("/treeMenu/search/menu1");
//         expect(wrapper.vm.treeData).toEqual(data);
//     });
//     it("resets search and enables lazy loading", async () => {
//         wrapper.setData({ searchParam: "" });
//         await wrapper.vm.handleSearch();
//         expect(wrapper.vm.$refs.tree.$data.store.lazy).toBe(true);
//         expect(wrapper.vm.treeData).toEqual([]);
//     });
// });