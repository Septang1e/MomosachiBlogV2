import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useAdminStore = defineStore('admin', ()=>{
    const adminInfo = ref({
        article_count : 0,
        tag_count: 0,
        category_count : 0,
        admin_name : 'Momosachi',
        startDate : '2024-6-6 07:32',
        // name -- url
        icp: ['蜀ICP备2024078934号-1', 'https://beian.miit.gov.cn/'],
        gov: ['川公网安备51010802032047号', 'https://beian.mps.gov.cn/#/query/webSearch?code=51010802032047'],
        social_media: {
            github: 'https://github.com/Septang1e',
            steam: {
                url: 'https://steamcommunity.com/profiles/76561198351161485/',
                friend_code: '390895757'
            }
        }
    })
    function getAdminInfo() {
        return adminInfo.value
    }

    return {
        getAdminInfo
    }
})