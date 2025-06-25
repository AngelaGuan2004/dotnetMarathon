<template>
  <div id="Home">
    <div class="Carousel">
      <el-carousel :interval="4000" height="600px">
        <el-carousel-item v-for="CarouselPicture in CarouselPictures" :key="CarouselPicture.id">
          <a :href="CarouselPicture.herf" target="_blank">
            <img :src="require(`@/assets/images/${CarouselPicture.url}`)" alt="" class="CarouselPictures">
            <div class="CarouselTextOutside">
              <div class="CarouselText">
                <p style="color: white;">{{ CarouselPicture.text }}</p>
              </div>
            </div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="RecentlyStarted">
      <div class="RecentlyStartedHeader">
        <div class="RecentlyStartedTitle">
          <div>近期开赛</div>
          <div class="RecentlyStartedTitleLine"></div>
        </div>
        <span class="RecentlyStartedMore" @click="GoToEvent">查看更多></span>
      </div>
      <div class="RecentlyStartedBody">
        <el-timeline :reverse="false">
          <el-timeline-item v-for="(RecentlyStartedEvent, index) in RecentlyStartEvents" :key="index"
            :timestamp="RecentlyStartedEvent.date" :hide-timestamp="true"
            @click.native="GoToOneEvent(RecentlyStartedEvent.id)">
            <div class="RecentlyStartedTimestamp">{{ RecentlyStartedEvent.date }}</div>
            <div style="display: inline-block;">{{ RecentlyStartedEvent.name }}</div>
            <div class="extra-info">
              <span style="margin-right: 15px;">类型: {{ RecentlyStartedEvent.type }}</span>
              <span>规模: {{ RecentlyStartedEvent.scale }}</span>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="ShowBest">
      <div class="Record">
        <div class="RecordTitle">国内记录</div>
        <div class="RecordPeople">
          <div class="RecordMan">
            <div>
              <img src="@/assets/images/RecordMan.jpg" alt="">
            </div>
            <div class="RecordManTitle">
              <div style="font-size: 24px;font-weight: bold;">宁夏·何杰</div>
              <div class="RecordManTitleLine"></div>
              <div style="font-size: 22px;margin-top: 10px;line-height: 35px;">
                男子全程马拉松<br>
                2024-03-24
              </div>
              <div class="RecordManScore">
                2:06:57
              </div>
            </div>
          </div>
          <div class="RecordWoMan">
            <div>
              <img src="@/assets/images/RecordWoman.jpg" alt="">
            </div>
            <div class="RecordManTitle">
              <div style="font-size: 24px;font-weight: bold;">辽宁·孙英杰</div>
              <div class="RecordManTitleLine"></div>
              <div style="font-size: 22px;margin-top: 10px;line-height: 35px;">
                女子全程马拉松<br>
                2003-10-19
              </div>
              <div class="RecordManScore">
                2:19:39
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="BestScore Record">
        <div class="RecordTitle BestScoreTitle">国内最好成绩</div>
        <div class="RecordPeople">
          <div class="RecordMan">
            <div>
              <img src="@/assets/images/BestScoreMan.png" alt="">
            </div>
            <div class="RecordManTitle">
              <div style="font-size: 24px;font-weight: bold;">西藏·扎西次仁</div>
              <div class="RecordManTitleLine"></div>
              <div style="font-size: 22px;margin-top: 10px;line-height: 35px;">
                男子半程马拉松<br>
                2024-02-25
              </div>
              <div class="RecordManScore">
                1:01:57
              </div>
            </div>
          </div>
          <div class="RecordWoMan">
            <div>
              <img src="@/assets/images/BestScoreWoman.png" alt="">
            </div>
            <div class="RecordManTitle">
              <div style="font-size: 24px;font-weight: bold;">云南·张德顺</div>
              <div class="RecordManTitleLine"></div>
              <div style="font-size: 22px;margin-top: 10px;line-height: 35px;">
                女子半程马拉松<br>
                2024-02-02
              </div>
              <div class="RecordManScore">
                1:07:55
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllEvents } from '@/api/Event'
export default {
  name: 'Home',
  data() {
    return {
      CarouselPictures: [
        {
          id: "01",
          url: "CarouselOne.png",
          text: "刷新赛会纪录！2023中国10公里精英赛总决赛圆满收官",
          herf: 'https://www.runchina.org.cn/#/news/race-news/detail/XW202325011'
        },
        {
          id: "02",
          url: "CarouselTwo.jpg",
          text: "第五届中国马拉松博览会 暨2024福建省路跑产业博览会",
          herf: 'https://mp.weixin.qq.com/s/hvXYqcqVcMzNidg9kr247A'
        },
        {
          id: "03",
          url: "CarouselThree.jpg",
          text: "国内最好男女半马成绩出现！男子前三刷新赛会纪录！2024“仁马”新年首马，比快更快！",
          herf: 'https://mp.weixin.qq.com/s/JYn13xlvrXl3cDTbowOfXA'
        },
        {
          id: "04",
          url: "CarouselFour.png",
          text: `2024无锡马拉松|何杰2:06:57再度打破全国纪录，中国男子马拉松进入206时代`,
          href: 'https://mp.weixin.qq.com/s/E7-u5Qp3j0-ATkbetQzAJA'
        }
      ],
      events: [],
    }
  },
  created() {
    this.loadAllEvents()
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString); // 创建一个Date对象
      const year = date.getFullYear(); // 获取年份
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，月份从0开始计数，所以加1
      const day = date.getDate().toString().padStart(2, '0'); // 获取日期

      return `${year}-${month}-${day}`; // 返回格式化的日期字符串
    },
    loadAllEvents() {
      fetchAllEvents().then(response => {
        console.log(response);
        // 初始化一个空数组
        this.events = [];
        
        // 遍历 response.data 数组，逐个处理元素
        response.data.forEach(event => {
            this.events.push({
                id: event.id,
                date: this.formatDate(event.eventDate), // 修正字段名称
                name: event.name,
                type: event.category,
                scale: event.scale
            });
        });

        this.$router.push({ name: 'Home', params: { events: this.events } });
      }).catch(error => {
          // 错误处理
          this.$message.error('加载赛事失败，请稍后重试。');
          console.error('Failed to load events:', error);
      });

    },
    GoToEvent() {
      this.$router.push({ name: "EventList", params: { events: this.events } })
      this.$bus.$emit('updateActiveIndex', '2');
    },
    GoToOneEvent(id) {
      console.log('Clicked event ID:', id);  // 调试用
      this.$router.push({ name: "EventDetail", params: { event_id: id } });
    }
  },
  computed: {
    RecentlyStartEvents() {
      return this.events.slice(0, 8).sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }
}
</script>

<style scoped>
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/Base.css";
@import "@/assets/css/Home.css";
</style>