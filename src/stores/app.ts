import {defineStore} from "pinia";
import {reactive, ref} from "vue";

/*
    WakatimeConfig
    You can automatically change this by using wakatimeAPI -> _doc(https://wakatime.com/developers)
    Or just simply dump the data at Settings->Account->Export
 */
import WakatimeLastWeekStats from '@/resources/wakatime_stats_last_week.json'
import WakatimeLastMonthStats from "@/resources/wakatime_stats_last_month.json"
import WakatimeTotalTimeStats from "@/resources/wakatime_stats_total_time.json"

export const useAppStore = defineStore('app', ()=>{

    const is_mobile = ref(false)
    const side_bar_visibility = ref(false)
    const theme_now = ref("")
    const header_state = reactive({
        visibility: false,
        last_Y: 1200
    })
    const articlePid = ref<undefined | string>(undefined)
    const tool_bar_visibility = ref(false)
    const menu_visibility = ref(false)

        // Mobile Handler Start
    function handleDeviceState() {
        is_mobile.value = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
    }
    function isMobile() {
        return is_mobile.value
    }
        // Mobile Handler End
        // SideBar Handler Start
    function handleSideBarVisibility() {
        side_bar_visibility.value = 960 + 320 < window.innerWidth
    }
    function sideBarVisible() {
        return side_bar_visibility.value
    }
        // SideBar Handler End
        // Theme Handler Start
    function getCurrentTheme() {
        return theme_now.value
    }
    function setTheme(theme: string) {
        theme_now.value = theme
    }
        // Theme Handler End

    function handleHeaderVisibility() {
        const currentY = window.scrollY
        header_state.visibility = (currentY != 0 && currentY - header_state.last_Y > 0)
        header_state.last_Y = currentY
    }
    function headerVisible() {
        return header_state.visibility
    }
    function getCurrentArticlePid() {
        return articlePid.value
    }
    function setArticlePid(pid : string) {
        articlePid.value = pid
    }
    function clearArticlePid() {
        articlePid.value = undefined
    }
    function getWakatimeStats() {
        return {
            'last_month': WakatimeLastMonthStats,
            'last_week': WakatimeLastWeekStats,
            'all_time' : WakatimeTotalTimeStats
        }
    }
    // ToolBar
    function handleToolBarVisibility() {

    }
    function toolBarVisible() {
        return tool_bar_visibility.value
    }

    // Menu

    function handleMenuVisibility() {

    }
    function menuVisible() {
        return menu_visibility.value
    }

    return {
        handleDeviceState, isMobile,
        handleSideBarVisibility, sideBarVisible,
        getCurrentTheme, setTheme,
        handleHeaderVisibility, headerVisible,
        getCurrentArticlePid, setArticlePid, clearArticlePid,
        getWakatimeStats
    }
})