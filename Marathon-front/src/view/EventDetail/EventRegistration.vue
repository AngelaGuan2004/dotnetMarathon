<template>
  <div id="EventRegistration">
    <div style="margin-left: 6%;margin-top: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/EventList' }">赛历</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/EventDetail' }">赛事详情</el-breadcrumb-item>
        <el-breadcrumb-item>赛事报名</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="RegistrationContainer">
      <h2 style="margin-left: 25px;margin-bottom: 5%;">赛事报名</h2>
      <el-form :model="participant" label-width="175px" :rules="rules" ref="participantForm">
        <el-form-item label="选手姓名："><span>{{ participant.name }}</span></el-form-item>
        <el-form-item label="选手性别："><span>{{ participant.gender }}</span></el-form-item>
        <el-form-item label="选手年龄："><span> {{ participant.age }}</span></el-form-item>
        <el-form-item label="选手身份证号："><span>{{ participant.idCard }}</span> </el-form-item>
        <el-form-item label="地区："><span>{{ participant.region }}</span> </el-form-item>
        <el-form-item label="联系方式："><span>{{ participant.contact }}</span> </el-form-item>
        <el-form-item label="参赛身份：" prop="role">
          <el-select v-model="participant.role" placeholder="请选择参赛身份">
          <el-option label="配速员" value="pacer"></el-option>
          <el-option label="普通跑者" value="normal"></el-option>
          <el-option label="慈善跑者" value="charity"></el-option>
          <el-option label="急救跑者" value="aid"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div class="button-group">
        <button type="primary" @click="modifyInfo" style="margin-left: 8%;">修改信息</button>
        <button type="success" @click="submitRegistration" style="margin-right: 8%;">提交报名</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getParticipantInfo, registerParticipant } from '@/api/EventRegistration';
import { Message } from 'element-ui';
export default {
  name: 'EventRegistration',
  data() {
    return {
      participant: {
        name: '',
        gender: '',
        age: '',
        idCard: '',
        region: '',
        contact: '',
        role: ''
      },
      provinces: [
        '北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
        '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省',
        '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
        '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区'
      ],
      allCities: {
        北京市: ['北京'],
        天津市: ['天津'],
        上海市: ['上海'],
        重庆市: ['重庆'],
        河北省: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
        山西省: ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
        辽宁省: ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
        吉林省: ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
        黑龙江省: ['哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '大兴安岭'],
        江苏省: ['南京', '无锡', '徐州', '常州', '苏州', '南通', '连云港', '淮安', '盐城', '扬州', '镇江', '泰州', '宿迁'],
        浙江省: ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
        安徽省: ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
        福建省: ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
        江西省: ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
        山东省: ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
        河南省: ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '济源'],
        湖北省: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '潜江', '天门', '神农架'],
        湖南省: ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
        广东省: ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
        海南省: ['海口', '三亚', '三沙', '儋州'],
        四川省: ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
        贵州省: ['贵阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
        云南省: ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
        陕西省: ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
        甘肃省: ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
        青海省: ['西宁', '海东', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
        内蒙古自治区: ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
        广西壮族自治区: ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
        西藏自治区: ['拉萨', '日喀则', '昌都', '林芝', '山南', '那曲', '阿里'],
        宁夏回族自治区: ['银川', '石嘴山', '吴忠', '固原', '中卫'],
        新疆维吾尔自治区: ['乌鲁木齐', '克拉玛依', '吐鲁番', '哈密', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子', '阿拉尔', '图木舒克', '五家渠', '铁门关']
      },
      selectedProvince: '',
      selectedCity: '',
      rules: {
        role: [
          { required: true, message: '请选择参赛身份', trigger: 'change' }
        ],
      }
    };
  },
  computed: {
    cities() {
      return this.allCities[this.selectedProvince] || []
    },
  },
  created() {
    this.loadParticipantInfo();
  },
  methods: {
    async loadParticipantInfo() {
      const playerId = localStorage.getItem('UserId');
      try {
        const response = await getParticipantInfo(playerId);
        console.log('加载的选手信息:', response);
        if (response.data) {
          this.participant = {
            name: response.data.name,
            gender: response.data.gender,
            age: response.data.age,
            idCard: response.data.idNumber,
            region: response.data.region,
            contact: response.data.telephoneNumber
          };
          this.selectedProvince = this.participant.region; // 设置省份
        } else {
          throw new Error('未收到有效响应数据');
        }
      } catch (error) {
        console.error('加载选手信息失败:', error);
        this.$message.error('加载选手信息失败');
      }
    },
    modifyInfo() {
      this.$router.push({ name: 'UserInfo' })
      this.$bus.$emit('updateActiveIndex', '4');
    },
    async submitRegistration() {
      const valid = await new Promise((resolve) => {
        this.$refs.participantForm.validate((valid) => {
          resolve(valid);
        });
      });

      // 如果验证不通过，直接返回 false，阻止后续的代码执行
      if (!valid) {
        this.$message.warning('信息不完整，无法报名')
        return false;
      }

      const playerId = localStorage.getItem('UserId');
      const eventId = this.$route.params.event_id
      try {
        // 创建一个包含只需要提交的字段的对象
        const registrationData = {
          role: this.participant.role,
          playerId: playerId,
          eventId: eventId // 这里可以动态设置 event_Id
        };

        // 提交报名信息
        const res = await registerParticipant(registrationData);
        if (res === 2) {
          this.$message.warning('您已报名该赛事志愿者，无法报名选手')
        }
        else if (res === 3) {
          this.$message.warning('您已报名过该赛事')
        }
        else if (res) {
          this.$message.success('报名成功');
          this.$router.back();
        }
      } catch (error) {
        console.error('提交报名失败:', error);
        this.$message.error('报名失败');
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    let role = localStorage.getItem('UserRole') || 'Visitor';
    if (role === 'Athlete') {
      next(); // 允许进入  
    }
    else if (role === 'Visitor') {
      Message({
        type: 'warning',
        message: '请先登录'
      });
      setTimeout(() => {
        location.href = 'login.html';
      }, 1500)
    }
    else {
      Message({
        type: 'warning',
        message: '您不是选手，无法报名比赛'
      });
    }
  },
};
</script>

<style scoped>
@import "@/assets/css/Base.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import "@/assets/css/EventRegistration.css";
</style>