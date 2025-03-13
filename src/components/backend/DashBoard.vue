<template>
  <div class="dashboard">
    <!-- 统计数据卡片 -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="stats-icon users-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ formatNumber(statistics.totalUsers) }}</div>
          <div class="stats-label">总用户数</div>
          <div class="stats-change" :class="{ 'positive': statistics.userGrowth > 0, 'negative': statistics.userGrowth < 0 }">
            <i :class="statistics.userGrowth > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(statistics.userGrowth) }}% 过去30天
          </div>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon posts-icon">
          <i class="fas fa-comment-alt"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ formatNumber(statistics.totalPosts) }}</div>
          <div class="stats-label">总发文数</div>
          <div class="stats-change" :class="{ 'positive': statistics.postGrowth > 0, 'negative': statistics.postGrowth < 0 }">
            <i :class="statistics.postGrowth > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(statistics.postGrowth) }}% 过去30天
          </div>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon engagement-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ statistics.avgEngagement }}%</div>
          <div class="stats-label">平均互动率</div>
          <div class="stats-change" :class="{ 'positive': statistics.engagementGrowth > 0, 'negative': statistics.engagementGrowth < 0 }">
            <i :class="statistics.engagementGrowth > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(statistics.engagementGrowth) }}% 过去30天
          </div>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon active-icon">
          <i class="fas fa-bolt"></i>
        </div>
        <div class="stats-content">
          <div class="stats-value">{{ formatNumber(statistics.dailyActiveUsers) }}</div>
          <div class="stats-label">日活跃用户</div>
          <div class="stats-change" :class="{ 'positive': statistics.dauGrowth > 0, 'negative': statistics.dauGrowth < 0 }">
            <i :class="statistics.dauGrowth > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(statistics.dauGrowth) }}% 过去7天
          </div>
        </div>
      </div>
    </div>

    <!-- 图表部分 -->
    <div class="charts-section">
      <div class="chart-container user-growth-chart">
        <div class="chart-header">
          <h3>用户增长趋势</h3>
          <div class="chart-actions">
            <button class="time-filter" :class="{ active: userGrowthTimeframe === '7d' }" @click="userGrowthTimeframe = '7d'">7天</button>
            <button class="time-filter" :class="{ active: userGrowthTimeframe === '30d' }" @click="userGrowthTimeframe = '30d'">30天</button>
            <button class="time-filter" :class="{ active: userGrowthTimeframe === '90d' }" @click="userGrowthTimeframe = '90d'">90天</button>
          </div>
        </div>
        <div class="chart-content">
          <!-- 这里实际项目中应该引入图表组件，如 Chart.js 或 ECharts -->
          <div class="chart-placeholder">
            <div class="chart-line"></div>
            <div class="chart-marker" style="left: 10%; height: 30%"></div>
            <div class="chart-marker" style="left: 20%; height: 45%"></div>
            <div class="chart-marker" style="left: 30%; height: 40%"></div>
            <div class="chart-marker" style="left: 40%; height: 60%"></div>
            <div class="chart-marker" style="left: 50%; height: 55%"></div>
            <div class="chart-marker" style="left: 60%; height: 75%"></div>
            <div class="chart-marker" style="left: 70%; height: 65%"></div>
            <div class="chart-marker" style="left: 80%; height: 80%"></div>
            <div class="chart-marker" style="left: 90%; height: 85%"></div>
          </div>
        </div>
      </div>

      <div class="chart-container engagement-chart">
        <div class="chart-header">
          <h3>内容互动分析</h3>
          <div class="chart-actions">
            <button class="time-filter" :class="{ active: engagementChartType === 'likes' }" @click="engagementChartType = 'likes'">点赞</button>
            <button class="time-filter" :class="{ active: engagementChartType === 'retweets' }" @click="engagementChartType = 'retweets'">转发</button>
            <button class="time-filter" :class="{ active: engagementChartType === 'comments' }" @click="engagementChartType = 'comments'">评论</button>
          </div>
        </div>
        <div class="chart-content donut-chart">
          <div class="donut-placeholder">
            <div class="donut-segment segment1"></div>
            <div class="donut-segment segment2"></div>
            <div class="donut-segment segment3"></div>
            <div class="donut-hole"></div>
          </div>
          <div class="donut-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--admin-primary-blue)"></div>
              <div class="legend-text">图文内容 (45%)</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--admin-green)"></div>
              <div class="legend-text">纯文本 (30%)</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--admin-indigo)"></div>
              <div class="legend-text">视频内容 (25%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动和趋势部分 -->
    <div class="activity-section">
      <div class="recent-activity">
        <div class="section-header">
          <h3>最近活动</h3>
          <button class="view-all-btn">查看全部</button>
        </div>
        <div class="activity-list">
          <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="trending-topics">
        <div class="section-header">
          <h3>热门话题</h3>
          <button class="view-all-btn">查看全部</button>
        </div>
        <div class="trending-list">
          <div v-for="(trend, index) in trendingTopics" :key="index" class="trending-item">
            <div class="trending-rank">{{ index + 1 }}</div>
            <div class="trending-content">
              <div class="trending-tag">#{{ trend.tag }}</div>
              <div class="trending-count">{{ formatNumber(trend.count) }} 次提及</div>
            </div>
            <div class="trending-change" :class="{ 'trending-up': trend.change > 0, 'trending-down': trend.change < 0 }">
              <i :class="trend.change > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(trend.change) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DashboardView',

  setup() {
    // 统计数据
    const statistics = ref({
      totalUsers: 2845721,
      userGrowth: 5.8,
      totalPosts: 18964235,
      postGrowth: 12.3,
      avgEngagement: 3.7,
      engagementGrowth: -0.8,
      dailyActiveUsers: 892567,
      dauGrowth: 2.4
    });

    // 用户增长图表时间范围
    const userGrowthTimeframe = ref('30d');

    // 互动图表类型
    const engagementChartType = ref('likes');

    // 最近活动数据
    const recentActivities = ref([
      {
        type: 'post',
        icon: 'fas fa-comment-alt',
        title: '用户 @张三丰 发布了一条热门推文，获得超过10,000个点赞',
        time: '10分钟前'
      },
      {
        type: 'user',
        icon: 'fas fa-user',
        title: '一位名人用户完成了账号认证',
        time: '35分钟前'
      },
      {
        type: 'report',
        icon: 'fas fa-flag',
        title: '收到10条关于违规内容的举报',
        time: '1小时前'
      },
      {
        type: 'system',
        icon: 'fas fa-cog',
        title: '系统自动屏蔽了一条违规内容',
        time: '1.5小时前'
      },
      {
        type: 'post',
        icon: 'fas fa-comment-alt',
        title: '话题 #新年计划 正在迅速升温',
        time: '2小时前'
      }
    ]);

    // 热门话题数据
    const trendingTopics = ref([
      { tag: '新年计划', count: 58674, change: 12 },
      { tag: '科技大会', count: 42851, change: 5 },
      { tag: '环保行动', count: 36942, change: -2 },
      { tag: '健康生活', count: 29764, change: 8 },
      { tag: '旅行日记', count: 23451, change: 3 }
    ]);

    // 格式化数字
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    };

    return {
      statistics,
      userGrowthTimeframe,
      engagementChartType,
      recentActivities,
      trendingTopics,
      formatNumber
    };
  }
});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding: 10px;
}

/* 统计卡片部分 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

@media (max-width: 1200px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
}

.stats-card {
  background-color: var(--admin-bg-panel);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: var(--admin-card-shadow);
}

.stats-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 24px;
  color: white;
}

.users-icon {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.posts-icon {
  background: linear-gradient(135deg, #1abc9c, #16a085);
}

.engagement-icon {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.active-icon {
  background: linear-gradient(135deg, #f39c12, #d35400);
}

.stats-content {
  flex: 1;
}

.stats-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--admin-text);
}

.stats-label {
  font-size: 14px;
  color: var(--admin-sub-text);
  margin-bottom: 8px;
}

.stats-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.positive {
  color: var(--admin-success);
}

.negative {
  color: var(--admin-danger);
}

/* 图表部分 */
.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
}

@media (max-width: 1024px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

.chart-container {
  background-color: var(--admin-bg-panel);
  border-radius: 10px;
  padding: 20px;
  box-shadow: var(--admin-card-shadow);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--admin-text);
}

.chart-actions {
  display: flex;
  gap: 10px;
}

.time-filter {
  background: transparent;
  border: 1px solid var(--admin-border-color);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  color: var(--admin-sub-text);
}

.time-filter.active {
  background-color: var(--admin-primary-blue);
  color: white;
  border-color: var(--admin-primary-blue);
}

.chart-content {
  height: 250px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

/* 图表占位符样式 - 在实际项目中替换为真实图表 */
.chart-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.chart-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--admin-border-color);
}

.chart-marker {
  width: 8%;
  background: linear-gradient(180deg, var(--admin-primary-blue) 0%, rgba(29, 161, 242, 0.3) 100%);
  border-radius: 4px 4px 0 0;
  margin: 0 1%;
  position: absolute;
  bottom: 0;
}

.donut-chart {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.donut-placeholder {
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
}

.donut-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip-path: polygon(50% 50%, 100% 0, 100% 100%, 50% 100%);
}

.segment1 {
  background-color: var(--admin-primary-blue);
  clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0);
  transform: rotate(0deg);
}

.segment2 {
  background-color: var(--admin-green);
  clip-path: polygon(50% 50%, 100% 0, 0 0);
  transform: rotate(160deg);
}

.segment3 {
  background-color: var(--admin-indigo);
  clip-path: polygon(50% 50%, 100% 0, 0 0);
  transform: rotate(270deg);
}

.donut-hole {
  position: absolute;
  width: 60%;
  height: 60%;
  background-color: var(--admin-bg-panel);
  border-radius: 50%;
  top: 20%;
  left: 20%;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.legend-text {
  font-size: 12px;
  color: var(--admin-sub-text);
}

/* 活动部分 */
.activity-section {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 20px;
}

@media (max-width: 1024px) {
  .activity-section {
    grid-template-columns: 1fr;
  }
}

.recent-activity, .trending-topics {
  background-color: var(--admin-bg-panel);
  border-radius: 10px;
  padding: 20px;
  box-shadow: var(--admin-card-shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--admin-text);
}

.view-all-btn {
  background: transparent;
  border: none;
  color: var(--admin-primary-blue);
  font-size: 14px;
  cursor: pointer;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--admin-border-color);
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 16px;
  color: white;
}

.activity-icon.post {
  background-color: var(--admin-primary-blue);
}

.activity-icon.user {
  background-color: var(--admin-green);
}

.activity-icon.report {
  background-color: var(--admin-red);
}

.activity-icon.system {
  background-color: var(--admin-yellow);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  color: var(--admin-text);
  margin-bottom: 5px;
}

.activity-time {
  font-size: 12px;
  color: var(--admin-sub-text);
}

.trending-list {
  display: flex;
  flex-direction: column;
}

.trending-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--admin-border-color);
}

.trending-item:last-child {
  border-bottom: none;
}

.trending-rank {
  width: 24px;
  height: 24px;
  background-color: var(--admin-tag-bg);
  color: var(--admin-tag-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 15px;
}

.trending-content {
  flex: 1;
}

.trending-tag {
  font-size: 14px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 2px;
}

.trending-count {
  font-size: 12px;
  color: var(--admin-sub-text);
}

.trending-change {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trending-up {
  color: var(--admin-success);
}

.trending-down {
  color: var(--admin-danger);
}
</style>